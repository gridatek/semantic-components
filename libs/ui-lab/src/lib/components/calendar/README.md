# Calendar

A fully accessible date picker component with **Angular ARIA Grid** integration, supporting single, multiple, and range selection. Features three view modes (day/month/year) with complete keyboard navigation and focus management.

## Usage

```html
<sc-calendar [(selected)]="date" />
```

## Component

### ScCalendar

Date picker component with month navigation and date selection.

**Selector:** `sc-calendar`

**Inputs:**

| Input      | Type                               | Default     | Description               |
| ---------- | ---------------------------------- | ----------- | ------------------------- |
| `mode`     | `'single' \| 'multiple'\| 'range'` | `'single'`  | Selection mode            |
| `disabled` | `Date[]`                           | `[]`        | Array of dates to disable |
| `minDate`  | `Date \| undefined`                | `undefined` | Minimum selectable date   |
| `maxDate`  | `Date \| undefined`                | `undefined` | Maximum selectable date   |
| `class`    | `string`                           | `''`        | Additional CSS classes    |

**Two-way Bindings:**

| Binding         | Type                | Description                    |
| --------------- | ------------------- | ------------------------------ |
| `selected`      | `Date \| undefined` | Selected date (single mode)    |
| `selectedDates` | `Date[]`            | Selected dates (multiple mode) |
| `selectedRange` | `DateRange`         | Selected range (range mode)    |

**DateRange Interface:**

```typescript
interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}
```

## Examples

### Single Date Selection

```html
<sc-calendar [(selected)]="selectedDate" />
```

### Multiple Date Selection

```html
<sc-calendar mode="multiple" [(selectedDates)]="selectedDates" />
```

### Date Range Selection

```html
<sc-calendar mode="range" [(selectedRange)]="selectedRange" />
```

### With Disabled Dates

```typescript
disabledDates = [new Date(2024, 0, 1), new Date(2024, 0, 15)];
```

```html
<sc-calendar [(selected)]="date" [disabled]="disabledDates" />
```

### With Min/Max Date

```typescript
minDate = new Date(); // Today
maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
```

```html
<sc-calendar [(selected)]="date" [minDate]="minDate" [maxDate]="maxDate" />
```

## Features

### Selection Modes

- **Single Selection**: Select a single date
- **Multiple Selection**: Select multiple dates (click to toggle)
- **Range Selection**: Select a date range (two clicks)

### View Modes

- **Day View**: Traditional month calendar with individual days
- **Month View**: Grid of 12 months for quick month selection
- **Year View**: Grid of 12 years for quick year selection
- **Seamless Navigation**: Click header to switch between views

### Accessibility

- **Angular ARIA Grid**: Full integration with `@angular/aria/grid`
- **Semantic HTML**: All views use `<table>` elements
- **Keyboard Navigation**: Complete arrow key support with auto-scrolling
- **Screen Reader Support**: Proper ARIA roles, labels, and announcements
- **Focus Management**: Programmatic focus control when navigating

### Additional Features

- **Disabled Dates**: Disable specific dates from selection
- **Min/Max Constraints**: Limit selectable date range
- **Today Highlight**: Current date is visually highlighted
- **Outside Days**: Shows days from adjacent months (dimmed)
- **Auto-scroll**: Automatically navigate to adjacent months/years/decades at edges
- **Icon Support**: Uses Lucide icons for navigation buttons

## Keyboard Navigation

All views support full keyboard navigation powered by **Angular ARIA Grid**.

### Day View

- `←` `→` Navigate between days (auto-scrolls to prev/next month at edges)
- `↑` `↓` Navigate between weeks
- `Enter` / `Space` Select focused date
- Click header to switch to Month View

### Month View

- `←` `→` Navigate between months (auto-scrolls to prev/next year at edges)
- `↑` `↓` Navigate between rows of months
- `Enter` / `Space` Select month and return to Day View
- Click header to switch to Year View

### Year View

- `←` `→` Navigate between years (auto-scrolls to prev/next decade at edges)
- `↑` `↓` Navigate between rows of years
- `Enter` / `Space` Select year and go to Month View

### Navigation Features

- **Continuous Wrapping**: Arrow keys wrap around columns
- **Auto-scroll**: Automatically navigate to adjacent time periods at grid edges
- **Focus Retention**: Focus is maintained when switching views or time periods

## Accessibility

### Angular ARIA Grid Integration

The calendar uses **Angular ARIA Grid** (`@angular/aria/grid`) for standards-compliant accessibility:

- **Semantic HTML**: All views use `<table>`, `<tr>`, `<td>` elements
- **ARIA Directives**:
  - `ngGrid` on table elements
  - `ngGridRow` on table rows
  - `ngGridCell` on table cells with selection state
  - `ngGridCellWidget` on interactive buttons

### ARIA Attributes

Automatically managed:

- `role="application"` on calendar container
- `role="grid"` on all calendar tables
- `role="row"` on table rows
- `role="gridcell"` on table cells
- `aria-selected="true/false"` on selected cells
- `aria-disabled="true"` on disabled cells
- `aria-current="date"` on today's date/current month/current year
- `aria-label` on all interactive elements
- `aria-expanded` on header button

### Screen Reader Support

- Grid navigation announcements
- Selection state announcements
- Current date/month/year identification
- Descriptive labels for all cells

### Focus Management

- Visible focus ring on focused elements
- Programmatic focus control with `viewChildren(GridCellWidget)`
- Focus retention when navigating between views
- Focus moves to appropriate cell when scrolling time periods

### Standards Compliance

- ✅ **WCAG AA** compliant
- ✅ **ARIA 1.2** patterns
- ✅ Tested with screen readers (NVDA/JAWS)

## Component Architecture

The calendar is composed of focused, reusable components:

- **`calendar.ts`** - Main orchestrator component
  - Manages view mode switching (day/month/year)
  - Handles navigation between views
  - Coordinates date selection

- **`calendar-header.ts`** - Navigation header
  - Clickable month/year label for view switching
  - Previous/Next buttons with Lucide icons
  - Context-aware ARIA labels

- **`calendar-day-view.ts`** - Day grid component
  - 7×5-6 table with Angular ARIA Grid
  - Date selection logic (single/multiple/range)
  - Auto-scroll to prev/next month at edges

- **`calendar-month-view.ts`** - Month grid component
  - 3×4 table with Angular ARIA Grid
  - Month selection returns to day view
  - Auto-scroll to prev/next year at edges

- **`calendar-year-view.ts`** - Year grid component
  - 3×4 table with Angular ARIA Grid (12 years)
  - Year selection goes to month view
  - Auto-scroll to prev/next decade at edges

## Documentation

For detailed documentation about view modes, navigation patterns, and implementation details, see [CALENDAR-VIEWS.md](./CALENDAR-VIEWS.md).
