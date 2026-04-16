# Highcharts Builder Exporter - Windsurf Build Spec

## Purpose
Build a web-based tool that lets a user:
1. Upload or attach a CSV file
2. Map CSV columns to chart fields
3. Choose from common Highcharts chart configurations
4. Choose Highstock chart configurations when time-series or market-style charts are needed
5. Apply reusable style guides such as colors, fonts, spacing, and chart component styles
6. Preview the chart live
7. Export the finished chart as PNG, JPEG, SVG, and optionally PDF
8. Save reusable chart presets and style themes

This project should be built in stages so each stage is functional before the next begins.

---

## Product Goal
Create a lightweight chart builder focused on speed, consistency, and brand control.

The primary use case is:
- non-technical or semi-technical users need to turn CSV data into polished Highcharts visuals
- teams need repeatable chart styles aligned to brand guidelines
- charts should be exportable for reports, decks, websites, and social graphics
- users sometimes need financial or time-series interactions such as zooming, navigator, range selector, and multiple aligned series, so the app must support Highstock as a first-class mode

---

## What Else Is Needed Beyond the Basic Idea
In addition to CSV upload and chart export, the product will need:

### 1. Data Mapping Layer
Users need a way to tell the app:
- which column is the x-axis
- which column(s) are y values
- which column is a date
- which column is a category
- which columns should become multiple series
- which columns are optional metadata such as tooltip text, annotations, or grouping fields

### 2. Data Validation and Cleaning
The app should detect and handle:
- empty rows
- non-numeric values in numeric series
- malformed dates
- duplicate headers
- missing required columns
- very large CSV files
- inconsistent decimal or thousands separators if needed later

### 3. Chart Configuration Presets
Users need quick starting presets such as:
- line
- area
- column
- bar
- pie
- scatter
- stacked column
- grouped column
- dual-axis chart
- Highstock line
- Highstock area
- OHLC
- candlestick
- volume with price
- compare multiple time-series

### 4. Style Guide / Theme System
You need a reusable theming system for:
- font families
- title and subtitle styles
- axis label styles
- legend styles
- tooltip styles
- background colors
- series color palettes
- line widths
- gridline styles
- spacing and margins
- data label appearance
- export size defaults

### 5. Export Pipeline
You need a reliable export flow for:
- PNG
- JPEG
- SVG
- PDF if feasible
- export size presets like social, presentation, article embed, and print

### 6. Preview and Edit UX
The app needs:
- live preview
- control panel
- chart type switcher
- style selector
- data mapping step
- error handling messages
- reset and undo friendly interactions

### 7. Preset Persistence
Users will eventually want:
- saved chart templates
- saved style themes
- saved export presets
- saved project files referencing both data and config

### 8. Highstock-Specific Handling
Because Highstock is now required, the app also needs:
- datetime parsing rules
- date granularity handling
- support for irregular time intervals
- support for navigator and scrollbar
- support for range selector
- support for multiple panes later if needed
- support for OHLC / candlestick data mapping
- support for linked volume series
- timezone handling strategy
- performance handling for larger time-series datasets

---

## Recommended Stack
Use:
- React
- TypeScript
- Vite
- Tailwind CSS
- Highcharts
- Highcharts React integration
- Highcharts Stock package
- Zustand for app state
- Papa Parse for CSV parsing
- Zod for validation
- Day.js or date-fns for date parsing and formatting
- FileSaver or native browser download APIs if needed

Optional later:
- Supabase for persistence
- React Hook Form for complex mapping forms
- Dexie for local browser project storage

---

## Architectural Principles
1. Keep data parsing separate from chart rendering.
2. Keep UI form state separate from generated Highcharts options.
3. Store style theme objects separately from chart-type presets.
4. Build one transformation layer that converts:
   - parsed CSV data
   - user mappings
   - selected chart preset
   - selected theme
   into final Highcharts or Highstock options.
5. Treat generated chart options as inspectable JSON for debugging and future export/import.
6. Build Highcharts mode and Highstock mode as siblings, not as totally separate apps.

---

## Product Modes
The application should have two primary builder modes:

### Standard Chart Mode
Supports:
- line
- spline
- area
- column
- bar
- pie
- scatter
- stacked/grouped variants
- dual-axis combinations later

### Stock Chart Mode
Supports:
- stock line
- stock area
- stock column
- OHLC
- candlestick
- price + volume combos
- date-range interactions
- navigator
- range selector
- compare mode later

The UI should let the user choose mode early, but the app may suggest Highstock automatically if the x-axis column is a date and the user wants stock interactions.

---

## Recommended User Flow
1. Upload CSV
2. Preview parsed table
3. Detect column types
4. Choose builder mode:
   - Standard Chart
   - Stock Chart
5. Select chart preset
6. Map columns
7. Apply style guide / theme
8. Fine-tune labels, axes, tooltip, legend, spacing, export size
9. Preview chart
10. Export image
11. Save preset or project

---

## Functional Requirements

### CSV Upload
- accept .csv file upload
- drag-and-drop support
- parse headers automatically
- show a sample row preview
- allow delimiter selection later if auto-detect fails
- validate file size and basic shape

### Column Type Detection
Infer and display likely types:
- string
- number
- date
- boolean
- nullable

Allow user override of detected types.

### Mapping UI
Allow the user to map:
- x-axis column
- y-axis column(s)
- series grouping column
- label column
- color grouping column
- tooltip metadata columns
- date column
- open/high/low/close columns for stock charts
- volume column for linked stock charts

### Chart Presets
Initial presets:
- line
- area
- column
- bar
- pie
- scatter
- stacked column
- grouped column
- stock line
- stock area
- OHLC
- candlestick
- candlestick + volume

### Theme / Style Guide Controls
Support:
- theme selector dropdown
- custom font family
- title font size
- subtitle font size
- axis label size
- legend position
- palette picker
- background color
- plot border / gridline controls
- tooltip style
- data label toggle
- series line width
- chart spacing
- export dimensions

### Preview
- live chart render
- loading and validation states
- display data issues clearly
- fallback preview if chart config is invalid

### Export
- export PNG
- export JPEG
- export SVG
- optional PDF later
- export dimensions presets:
  - article
  - slide
  - square social
  - widescreen social
  - print

### Save / Load
At minimum for early stages:
- export generated config JSON
- import generated config JSON

Later:
- save named templates
- save themes
- save full projects

---

## Non-Functional Requirements
- fast enough for typical CSV files under 10,000 rows
- graceful handling of large time-series files
- clear validation feedback
- no silent failures
- responsive UI
- accessible controls and labels
- deterministic chart output from identical inputs

---

## Data Models

### Parsed Dataset
```ts
type ParsedDataset = {
  headers: string[];
  rows: Record<string, string | number | null>[];
  inferredTypes: Record<string, "string" | "number" | "date" | "boolean" | "unknown">;
  sourceFileName: string;
};
```

### Chart Mode
```ts
type ChartMode = "standard" | "stock";
```

### Series Mapping
```ts
type SeriesMapping = {
  xField?: string;
  yFields?: string[];
  groupField?: string;
  labelField?: string;
  tooltipFields?: string[];
  dateField?: string;
  openField?: string;
  highField?: string;
  lowField?: string;
  closeField?: string;
  volumeField?: string;
};
```

### Preset Definition
```ts
type ChartPreset =
  | "line"
  | "area"
  | "column"
  | "bar"
  | "pie"
  | "scatter"
  | "stackedColumn"
  | "groupedColumn"
  | "stockLine"
  | "stockArea"
  | "ohlc"
  | "candlestick"
  | "candlestickVolume";
```

### Theme Definition
```ts
type ChartTheme = {
  id: string;
  name: string;
  fontFamily: string;
  backgroundColor: string;
  titleStyle: Record<string, unknown>;
  subtitleStyle: Record<string, unknown>;
  axisLabelStyle: Record<string, unknown>;
  legendStyle: Record<string, unknown>;
  tooltipStyle: Record<string, unknown>;
  palette: string[];
  gridLineColor?: string;
  lineWidthDefaults?: {
    line?: number;
    area?: number;
    stock?: number;
  };
  exportDefaults?: {
    width: number;
    height: number;
    scale?: number;
  };
};
```

### Builder State
```ts
type BuilderState = {
  mode: ChartMode;
  dataset?: ParsedDataset;
  mapping: SeriesMapping;
  preset?: ChartPreset;
  themeId?: string;
  generatedOptions?: Record<string, unknown>;
};
```

---

## Suggested Folder Structure
```txt
src/
  app/
  components/
    builder/
    forms/
    preview/
    export/
    theme/
  features/
    csv/
    mapping/
    presets/
    themes/
    highcharts/
    highstock/
    export/
  lib/
    csv/
    validation/
    transformers/
    dates/
  store/
  types/
  data/
    presetLibrary.ts
    themeLibrary.ts
```

---

## Core Modules To Build

### 1. CSV Parser Module
Responsibilities:
- upload and parse CSV
- infer column types
- normalize rows
- surface parse errors

### 2. Mapping Engine
Responsibilities:
- convert selected columns into chart-ready structures
- handle category and datetime x-axes
- create multiple series from grouped data
- build OHLC arrays for stock charts

### 3. Preset Engine
Responsibilities:
- define what settings each chart preset needs
- provide sensible defaults
- expose editable options

### 4. Theme Engine
Responsibilities:
- apply style guide defaults
- merge theme settings into final chart config
- support theme preview and theme save/load later

### 5. Options Generator
Responsibilities:
- produce valid Highcharts or Highstock options
- map UI state into final config
- support export-safe config generation

### 6. Export Module
Responsibilities:
- export chart as image
- manage dimension presets
- ensure export output matches preview as closely as possible

---

## Stage Plan

## Stage 1 - Foundation
Goal:
Set up the app shell and live Highcharts rendering.

Deliverables:
- React + TypeScript + Vite app scaffold
- Tailwind setup
- Highcharts and Highstock integration
- base layout with left control panel and right preview
- sample hardcoded chart preview
- mode toggle for Standard vs Stock

Acceptance criteria:
- app runs locally
- a sample standard chart renders
- a sample stock chart renders
- mode toggle switches between chart engines cleanly

---

## Stage 2 - CSV Upload and Parsing
Goal:
Ingest CSV data and inspect it.

Deliverables:
- CSV upload component
- drag-and-drop support
- parsed table preview
- inferred column type detection
- validation errors for malformed files

Acceptance criteria:
- user can upload a CSV
- headers and rows display correctly
- inferred types appear per column
- invalid CSV shows useful errors

---

## Stage 3 - Mapping UI
Goal:
Allow users to map data into chart structures.

Deliverables:
- x-axis selector
- y-axis selector(s)
- grouping selector
- date column selector
- stock OHLC field selectors
- volume selector
- mapping summary panel

Acceptance criteria:
- standard chart mappings generate valid preview data
- stock mappings generate valid preview data
- invalid mappings show clear messages

---

## Stage 4 - Chart Presets
Goal:
Provide quick-start chart types.

Deliverables:
- preset library
- preset selector
- dynamic form fields based on preset
- standard presets and stock presets

Acceptance criteria:
- changing preset updates preview
- preset defaults are sensible
- unsupported mapping combinations are blocked cleanly

---

## Stage 5 - Theme / Style Guide System
Goal:
Allow consistent styling across charts.

Deliverables:
- theme library with 3 to 5 starter themes
- controls for fonts, colors, legend, tooltip, spacing
- theme merge system
- custom theme editing UI

Acceptance criteria:
- selecting a theme updates chart appearance
- custom palette changes are reflected live
- title, axis, legend, and tooltip styling can be customized

---

## Stage 6 - Export
Goal:
Allow reliable image export.

Deliverables:
- export buttons for PNG, JPEG, SVG
- export size presets
- filename control
- optional transparent background for PNG later

Acceptance criteria:
- user can export preview as image
- exported image matches preview closely
- export sizes are consistent

---

## Stage 7 - Save / Load Configurations
Goal:
Support repeatable workflows.

Deliverables:
- save current chart config as JSON
- load JSON config
- save theme JSON
- reload prior builder state

Acceptance criteria:
- a saved config can reproduce the same chart
- theme JSON can be reused across charts

---

## Stage 8 - Advanced Stock Features
Goal:
Deepen Highstock support.

Deliverables:
- range selector presets
- navigator toggle
- compare mode
- multiple panes later
- linked volume chart
- timezone configuration
- large dataset performance checks

Acceptance criteria:
- stock charts feel purpose-built
- price/volume combos work
- time-range controls behave correctly

---

## Stage 9 - Optional Backend Persistence
Goal:
Support accounts, saved templates, and team style systems.

Possible backend:
- Supabase

Deliverables:
- auth
- saved projects
- shared themes
- team template library

Acceptance criteria:
- user can save and reopen projects across sessions
- teams can share themes and templates

---

## UX Notes
The layout should feel like:
- left sidebar for setup and controls
- central or right preview area
- optional bottom JSON inspector later

Important UX rules:
- always show what step the user is on
- prevent dead ends
- do not expose raw Highcharts complexity too early
- allow an advanced panel for power users later

---

## Validation Rules
The app should prevent:
- pie charts with multiple y series unless intentionally supported
- stock charts without a valid date axis
- OHLC charts without required open/high/low/close columns
- export before a valid chart exists
- theme settings that produce unreadable combinations where possible

---

## Styling Strategy Recommendation
Use a hybrid approach:
1. Store reusable theme tokens in JSON
2. Generate Highcharts option fragments from those tokens
3. Use styled mode only if needed for advanced brand enforcement

Reason:
- JSON themes are easier to save, share, and version
- pure CSS themes can become harder to serialize and manage in a builder app
- some teams may still want styled mode later for strict editorial or enterprise use cases

---

## Key Risks
1. CSV variability may be messy
2. Date parsing can break stock charts if not handled carefully
3. Export fidelity may differ by browser
4. Highcharts option complexity can overwhelm the UI if not abstracted well
5. Theme systems can become too open-ended without structure

---

## Recommendations Before Building
Before implementation, define:
- the initial list of supported chart types
- your required export formats
- your style token model
- whether themes are local-only or saved/shared
- whether this is internal-only or customer-facing
- whether the first version must support mobile or only desktop
- file size limits for CSV uploads
- whether generated Highcharts JSON should be visible and editable

---

## Suggested Immediate Decisions
Decide these first:
1. Internal tool or client-facing product?
2. Local browser app first, or persistence from day one?
3. JSON theme system only, or JSON plus CSS theme support?
4. Must-have stock chart types in v1:
   - stock line
   - stock area
   - candlestick
   - OHLC
   - candlestick + volume
5. Must-have export formats in v1:
   - PNG
   - SVG
   - JPEG

---

## Windsurf Build Instructions
When implementing this project:
- build one stage at a time
- do not skip ahead unless the previous stage is working
- keep all logic strongly typed
- keep config generation modular
- avoid tightly coupling form controls to Highcharts option structures
- create reusable utility functions for mapping and theme merging
- prefer small testable functions over monolithic components
- document assumptions in code comments where date parsing or export behavior is tricky
- keep the architecture ready for both Highcharts and Highstock without duplication

---

## First Build Task For Windsurf
Start with Stage 1.

Specifically:
1. Scaffold a React + TypeScript + Vite project
2. Add Tailwind
3. Add Highcharts, Highcharts React integration, and Highcharts Stock support
4. Build a two-panel layout:
   - left controls
   - right preview
5. Add a simple mode toggle:
   - Standard
   - Stock
6. Render one sample standard chart and one sample stock chart
7. Organize files using the recommended folder structure
8. Commit code in a way that keeps stage boundaries clear

Do not implement CSV upload yet until Stage 1 is complete and working.

---

## Nice-to-Have Later
- drag-and-drop series reordering
- chart annotations
- custom tooltip template builder
- accessibility preview checks
- design token import from a brand JSON file
- image aspect ratio lock
- local autosave
- dark mode builder UI
- embedded sharing link
- direct export to presentation-friendly dimensions
- support for multiple datasets in one project

---

## Final Note
This tool should prioritize clarity and repeatability over exposing every possible Highcharts option in version one.

The right first version is:
- easy to use
- consistent in output
- flexible enough for common use cases
- architected well enough to grow into advanced charting and stock chart workflows later
