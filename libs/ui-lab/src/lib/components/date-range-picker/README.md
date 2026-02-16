# Date Range Picker

Select a range of dates with presets, min/max constraints, and various display formats.

## Components

- `ScDateRangePicker` - Date range picker with calendar dropdown

## Usage

### Basic Usage

```html
<sc-date-range-picker [(value)]="dateRange" placeholder="Select date range" />
```

### With Presets

```html
<sc-date-range-picker [(value)]="dateRange" [presets]="presets" placeholder="Select date range" />
```

```typescript
import { createDateRangePresets } from './date-range-picker';

presets = createDateRangePresets();
```

### With Min/Max Dates

```html
<sc-date-range-picker [minDate]="minDate" [maxDate]="maxDate" placeholder="Select date range" />
```

## API

### ScDateRangePicker

| Input           | Type                | Default               | Description             |
| --------------- | ------------------- | --------------------- | ----------------------- |
| `class`         | `string`            | `''`                  | Additional CSS classes  |
| `placeholder`   | `string`            | `'Select date range'` | Placeholder text        |
| `disabled`      | `boolean`           | `false`               | Disable the picker      |
| `minDate`       | `Date \| undefined` | `undefined`           | Minimum selectable date |
| `maxDate`       | `Date \| undefined` | `undefined`           | Maximum selectable date |
| `disabledDates` | `Date[]`            | `[]`                  | Specific disabled dates |
| `presets`       | `DateRangePreset[]` | `[]`                  | Quick selection presets |
| `showTwoMonths` | `boolean`           | `false`               | Show two calendars      |
| `showClear`     | `boolean`           | `true`                | Show clear button       |
| `dateFormat`    | `string`            | `'short'`             | Date display format     |

| Output        | Type        | Description                 |
| ------------- | ----------- | --------------------------- |
| `value`       | `DateRange` | Two-way binding for range   |
| `valueChange` | `DateRange` | Emits when range changes    |
| `apply`       | `DateRange` | Emits when Apply is clicked |

| Method       | Returns     | Description       |
| ------------ | ----------- | ----------------- |
| `focus()`    | `void`      | Focus the trigger |
| `getRange()` | `DateRange` | Get current range |

## DateRange Interface

```typescript
interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}
```

## DateRangePreset Interface

```typescript
interface DateRangePreset {
  label: string;
  value: DateRange;
}
```

## Date Formats

| Format  | Example Output     | Description       |
| ------- | ------------------ | ----------------- |
| `short` | `Jan 15, 2024`     | Abbreviated month |
| `long`  | `January 15, 2024` | Full month name   |
| `iso`   | `2024-01-15`       | ISO 8601 format   |

## Helper Function

```typescript
import { createDateRangePresets } from './date-range-picker';

// Creates common presets:
// - Today
// - Yesterday
// - Last 7 days
// - Last 14 days
// - Last 30 days
// - This month
// - Last month
const presets = createDateRangePresets();
```

## Examples

### Analytics Dashboard

```html
<div class="flex justify-between">
  <h2>Analytics</h2>
  <sc-date-range-picker [(value)]="dateRange" [presets]="presets" (apply)="fetchData()" />
</div>
```

### Custom Presets

```typescript
const customPresets: DateRangePreset[] = [
  {
    label: 'This Week',
    value: {
      from: getStartOfWeek(),
      to: new Date(),
    },
  },
  {
    label: 'This Quarter',
    value: {
      from: getStartOfQuarter(),
      to: new Date(),
    },
  },
];
```

### Booking System

```html
<sc-date-range-picker [(value)]="bookingDates" [minDate]="today" [disabledDates]="bookedDates" placeholder="Select check-in and check-out" />
```

## Accessibility

- Trigger has `aria-expanded` and `aria-haspopup="dialog"`
- Dropdown has `role="dialog"` and `aria-modal="true"`
- Calendar is keyboard navigable
- Clear button has descriptive `aria-label`
