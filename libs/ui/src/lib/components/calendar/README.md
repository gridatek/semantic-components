# Calendar

A fully accessible date picker component with **Angular ARIA Grid** integration, supporting single, multiple, and range selection. Features three view modes (day/month/year) with complete keyboard navigation, focus management, and i18n support.

## Usage

```html
<div scCalendar [(value)]="date"></div>
```

## Component

### ScCalendar

Date picker component with month navigation and date selection.

**Selector:** `div[scCalendar]`

**Inputs:**

| Input            | Type                                | Default               | Description                                  |
| ---------------- | ----------------------------------- | --------------------- | -------------------------------------------- |
| `mode`           | `'single' \| 'multiple' \| 'range'` | `'single'`            | Selection mode                               |
| `disabled`       | `Temporal.PlainDate[]`              | `[]`                  | Array of dates to disable                    |
| `minDate`        | `Temporal.PlainDate \| undefined`   | `undefined`           | Minimum selectable date                      |
| `maxDate`        | `Temporal.PlainDate \| undefined`   | `undefined`           | Maximum selectable date                      |
| `class`          | `string`                            | `''`                  | Additional CSS classes                       |
| `viewMode`       | `'day' \| 'month' \| 'year'`        | `'day'`               | Initial view mode                            |
| `ariaLabel`      | `string`                            | `'Calendar'`          | `aria-label` for the calendar container      |
| `dayViewLabel`   | `string`                            | `'Select date'`       | `aria-label` for the day grid                |
| `monthViewLabel` | `string`                            | `'Select month'`      | `aria-label` for the month grid              |
| `yearViewLabel`  | `string`                            | `'Select year'`       | `aria-label` for the year grid               |
| `startOfWeek`    | `number`                            | `0`                   | First day of week (0=Sun, 1=Mon, ..., 6=Sat) |
| `weekDays`       | `string[]`                          | `['Su', 'Mo', ...]`   | Week day header labels                       |
| `monthLabels`    | `string[]`                          | `['Jan', 'Feb', ...]` | Month labels for month view                  |

**Two-way Bindings:**

| Binding | Type              | Description                                                |
| ------- | ----------------- | ---------------------------------------------------------- |
| `value` | `ScCalendarValue` | Selected value (single date, date array, or range by mode) |

**ScCalendarValue Type:**

```typescript
type ScCalendarValue = Temporal.PlainDate | Temporal.PlainDate[] | ScDateRange | undefined;

interface ScDateRange {
  from: Temporal.PlainDate | undefined;
  to: Temporal.PlainDate | undefined;
}
```

**Public Methods:**

| Method                | Description                    |
| --------------------- | ------------------------------ |
| `handleHeaderClick()` | Cycle view: day → month → year |
| `handlePrevious()`    | Navigate to previous period    |
| `handleNext()`        | Navigate to next period        |
| `goToToday()`         | Jump to today and select it    |
| `clear()`             | Clear the selection            |

**Public Signals:**

| Signal     | Type                 | Description                             |
| ---------- | -------------------- | --------------------------------------- |
| `heading`  | `string`             | Computed heading label for current view |
| `viewDate` | `Temporal.PlainDate` | Current view date                       |
| `viewMode` | `ScCalendarViewMode` | Current view mode                       |

## Examples

### Single Date Selection

```html
<div scCalendar [(value)]="selectedDate" #cal="scCalendar"></div>
```

### Multiple Date Selection

```html
<div scCalendar mode="multiple" [(value)]="selectedDates"></div>
```

### Date Range Selection

```html
<div scCalendar mode="range" [(value)]="selectedRange"></div>
```

### With Disabled Dates

```typescript
disabledDates = [Temporal.PlainDate.from('2026-01-01'), Temporal.PlainDate.from('2026-01-15')];
```

```html
<div scCalendar [(value)]="date" [disabled]="disabledDates"></div>
```

### With Min/Max Date

```typescript
minDate = Temporal.Now.plainDateISO();
maxDate = Temporal.Now.plainDateISO().add({ days: 30 });
```

```html
<div scCalendar [(value)]="date" [minDate]="minDate" [maxDate]="maxDate"></div>
```

### i18n / Localization

The calendar heading and day `aria-label`s use Angular's `LOCALE_ID` automatically. For custom labels:

```html
<div scCalendar [startOfWeek]="1" [weekDays]="['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']" [monthLabels]="['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']" [ariaLabel]="'Calendrier'" [dayViewLabel]="'Sélectionner la date'" [monthViewLabel]="'Sélectionner le mois'" [yearViewLabel]="'Sélectionner l\'année'"></div>
```

> **Note:** `weekDays` and `startOfWeek` are independent — ensure the label order matches the start day.

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
- **Locale-aware**: Heading and day `aria-label`s respect `LOCALE_ID`
- **Customizable ARIA labels**: All grid labels are configurable inputs

### Additional Features

- **Disabled Dates**: Disable specific dates from selection
- **Min/Max Constraints**: Limit selectable date range
- **Today Highlight**: Current date is visually highlighted
- **Outside Days**: Shows days from adjacent months (dimmed)
- **Auto-scroll**: Automatically navigate to adjacent months/years/decades at edges
- **Start of Week**: Configurable first day of week

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
- `aria-label` on all interactive elements (locale-aware for dates)

### Standards Compliance

- WCAG AA compliant
- ARIA 1.2 patterns

## Component Architecture

The calendar is composed of focused, reusable components:

- **`calendar.ts`** - Main orchestrator component
  - Manages view mode switching (day/month/year)
  - Handles navigation between views
  - Coordinates date selection
  - Passes i18n inputs to child views

- **`calendar-day-view.ts`** - Day grid component
  - 7-column table with Angular ARIA Grid
  - Date selection logic (single/multiple/range)
  - Auto-scroll to prev/next month at edges
  - Locale-aware day `aria-label`s via `LOCALE_ID`

- **`calendar-month-view.ts`** - Month grid component
  - 3x4 table with Angular ARIA Grid
  - Month selection returns to day view
  - Auto-scroll to prev/next year at edges

- **`calendar-year-view.ts`** - Year grid component
  - 3x4 table with Angular ARIA Grid (12 years)
  - Year selection goes to month view
  - Auto-scroll to prev/next decade at edges

## Documentation

For detailed documentation about view modes, navigation patterns, and implementation details, see [CALENDAR-VIEWS.md](./CALENDAR-VIEWS.md).
