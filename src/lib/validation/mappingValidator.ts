import type { SeriesMapping, ChartMode, ChartPreset } from '../../types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateMapping(
  mapping: SeriesMapping,
  mode: ChartMode,
  preset?: ChartPreset
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Common validation for all charts
  if (!mapping.yFields || mapping.yFields.length === 0) {
    errors.push('At least one Y-axis field is required');
  }

  // Mode-specific validation
  if (mode === 'stock') {
    // Stock chart validation
    if (!mapping.dateField) {
      errors.push('Date field is required for stock charts');
    }

    // OHLC validation
    if (preset === 'ohlc' || preset === 'candlestick' || preset === 'candlestickVolume') {
      const missingOhlcFields = [];
      
      if (!mapping.openField) missingOhlcFields.push('Open');
      if (!mapping.highField) missingOhlcFields.push('High');
      if (!mapping.lowField) missingOhlcFields.push('Low');
      if (!mapping.closeField) missingOhlcFields.push('Close');
      
      if (missingOhlcFields.length > 0) {
        errors.push(`OHLC charts require all price fields: ${missingOhlcFields.join(', ')}`);
      }
    }

    // Volume validation
    if (preset === 'candlestickVolume' && !mapping.volumeField) {
      warnings.push('Volume field recommended for volume charts');
    }
  } else {
    // Standard chart validation
    if (!mapping.xField) {
      warnings.push('X-axis field recommended for standard charts');
    }

    // Pie chart validation
    if (preset === 'pie') {
      if (mapping.yFields && mapping.yFields.length > 1) {
        warnings.push('Pie charts work best with a single value series');
      }
      if (!mapping.labelField && !mapping.xField) {
        warnings.push('Pie charts benefit from label or category fields');
      }
    }
  }

  // Multi-series validation
  if (mapping.yFields && mapping.yFields.length > 1) {
    const duplicateFields = mapping.yFields.filter((field, index) => 
      mapping.yFields!.indexOf(field) !== index
    );
    if (duplicateFields.length > 0) {
      errors.push('Duplicate Y-axis fields are not allowed');
    }
  }

  // Field conflict validation
  const allMappedFields = [
    mapping.xField,
    mapping.dateField,
    mapping.groupField,
    mapping.labelField,
    mapping.openField,
    mapping.highField,
    mapping.lowField,
    mapping.closeField,
    mapping.volumeField,
    ...(mapping.yFields || [])
  ].filter(Boolean);

  const uniqueFields = new Set(allMappedFields);
  if (allMappedFields.length !== uniqueFields.size) {
    warnings.push('Some fields are mapped to multiple roles');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

export function getMappingCompleteness(mapping: SeriesMapping, mode: ChartMode): number {
  const requiredFields = mode === 'stock' ? ['dateField', 'yFields'] : ['yFields'];
  const optionalFields = mode === 'stock' 
    ? ['xField', 'groupField', 'labelField', 'openField', 'highField', 'lowField', 'closeField', 'volumeField']
    : ['xField', 'groupField', 'labelField'];

  let completed = 0;
  let total = requiredFields.length + optionalFields.length;

  // Check required fields
  for (const field of requiredFields) {
    if (field === 'yFields') {
      if (mapping.yFields && mapping.yFields.length > 0) completed++;
    } else if (mapping[field as keyof SeriesMapping]) {
      completed++;
    }
  }

  // Check optional fields
  for (const field of optionalFields) {
    if (mapping[field as keyof SeriesMapping]) {
      completed++;
    }
  }

  return Math.round((completed / total) * 100);
}
