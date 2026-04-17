import Papa from 'papaparse';
import type { ParsedDataset } from '../../types';

export interface CSVParseResult {
  success: boolean;
  data?: ParsedDataset;
  error?: string;
}

export function inferColumnType(values: (string | number | null)[]): "string" | "number" | "date" | "boolean" | "unknown" {
  const nonNullValues = values.filter(v => v !== null && v !== undefined && v !== '');
  
  if (nonNullValues.length === 0) return "unknown";
  
  // Check if all values are boolean-like
  const booleanValues = nonNullValues.filter(v => 
    typeof v === 'string' && ['true', 'false', 'yes', 'no', '1', '0'].includes(v.toLowerCase())
  );
  if (booleanValues.length === nonNullValues.length) return "boolean";
  
  // Check if all values are dates (check before numbers to catch MM/DD/YYYY)
  const dateValues = nonNullValues.filter(v => {
    if (typeof v !== 'string') return false;
    // Check for MM/DD/YYYY format specifically
    if (v.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
      const date = new Date(v);
      return !isNaN(date.getTime());
    }
    // Check for other date formats
    const date = new Date(v);
    return !isNaN(date.getTime()) && v.match(/\d{4}|\d{1,2}\/\d{1,2}|\d{1,2}-\d{1,2}/);
  });
  if (dateValues.length === nonNullValues.length) return "date";
  
  // Check if all values are numbers (but not dates)
  const numericValues = nonNullValues.filter(v => {
    const num = typeof v === 'string' ? parseFloat(v) : v;
    return !isNaN(num as number) && isFinite(num as number);
  });
  if (numericValues.length === nonNullValues.length) return "number";
  
  return "string";
}

export function parseCSVFile(file: File): Promise<CSVParseResult> {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => header.trim(),
      transform: (value: string) => {
        const trimmed = value.trim();
        if (trimmed === '') return null;
        
        // Check if it's a MM/DD/YYYY date format - preserve as string
        if (trimmed.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
          return trimmed;
        }
        
        // Try to convert to number if it looks like one
        const num = parseFloat(trimmed);
        if (!isNaN(num) && isFinite(num) && trimmed.match(/^-?\d*\.?\d+$/)) {
          return num;
        }
        
        return trimmed;
      },
      complete: (results) => {
        try {
          if (results.errors.length > 0) {
            resolve({
              success: false,
              error: `CSV parsing error: ${results.errors[0].message}`
            });
            return;
          }

          const rows = results.data as Record<string, string | number | null>[];
          const headers = Object.keys(rows[0] || {});
          
          if (headers.length === 0) {
            resolve({
              success: false,
              error: 'No columns found in CSV file'
            });
            return;
          }

          // Infer column types
          const inferredTypes: Record<string, "string" | "number" | "date" | "boolean" | "unknown"> = {};
          
          headers.forEach(header => {
            const columnValues = rows.map(row => row[header]);
            inferredTypes[header] = inferColumnType(columnValues);
          });

          const dataset: ParsedDataset = {
            headers,
            rows,
            inferredTypes,
            sourceFileName: file.name
          };

          resolve({
            success: true,
            data: dataset
          });
        } catch (error) {
          resolve({
            success: false,
            error: `Error processing CSV: ${error instanceof Error ? error.message : 'Unknown error'}`
          });
        }
      },
      error: (error) => {
        resolve({
          success: false,
          error: `Failed to parse CSV: ${error.message}`
        });
      }
    });
  });
}
