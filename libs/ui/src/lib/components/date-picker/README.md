# Date Picker

A date picker component with calendar popup for selecting dates.

## Usage

```html
<sc-date-picker [(selected)]="date" />
```

## Component

### ScDatePicker

Date picker combining a trigger button with a calendar popover.

**Selector:** `sc-date-picker`

**Inputs:**

| Input         | Type                               | Default         | Description               |
| ------------- | ---------------------------------- | --------------- | ------------------------- |
| `mode`        | `'single' \| 'multiple'\| 'range'` | `'single'`      | Selection mode            |
| `placeholder` | `string`                           | `'Pick a date'` | Placeholder text          |
| `disabled`    | `Date[]`                           | `[]`            | Array of dates to disable |
| `minDate`     | `Date \| undefined`                | `undefined`     | Minimum selectable date   |
| `maxDate`     | `Date \| undefined`                | `undefined`     | Maximum selectable date   |
| `side`        | `PopoverSide`                      | `'bottom'`      | Popover position side     |
| `align`       | `PopoverAlign`                     | `'start'`       | Popover alignment         |
| `class`       | `string`                           | `''`            | Additional CSS classes    |

**Two-way Bindings:**

| Binding         | Type                | Description                    |
| --------------- | ------------------- | ------------------------------ |
| `selected`      | `Date \| undefined` | Selected date (single mode)    |
| `selectedDates` | `Date[]`            | Selected dates (multiple mode) |
| `selectedRange` | `DateRange`         | Selected range (range mode)    |
| `open`          | `boolean`           | Popover open state             |

## Examples

### Default

```html
<sc-date-picker [(selected)]="date" />
```

### With Custom Placeholder

```html
<sc-date-picker [(selected)]="date" placeholder="Select your birthday" />
```

### Date Range Picker

```html
<sc-date-picker mode="range" [(selectedRange)]="range" placeholder="Pick a date range" />
```

### Multiple Dates

```html
<sc-date-picker mode="multiple" [(selectedDates)]="dates" placeholder="Select dates" />
```

### With Date Constraints

```typescript
minDate = new Date(); // Today
maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
```

```html
<sc-date-picker [(selected)]="date" [minDate]="minDate" [maxDate]="maxDate" />
```

### Form Example

```html
<div class="space-y-2">
  <label class="text-sm font-medium">Date of Birth</label>
  <sc-date-picker [(selected)]="dob" placeholder="Select date of birth" [maxDate]="today" />
</div>
```

## Features

- **Popover Integration**: Uses the Popover component for dropdown
- **Calendar Integration**: Uses the Calendar component for date selection
- **Auto-close**: Closes on date selection (single/range complete)
- **Display Format**: Shows selected date(s) in the trigger button
- **Selection Modes**: Single, multiple, and range selection
- **Date Constraints**: Min/max dates and disabled dates

## Accessibility

- Inherits accessibility features from Popover and Calendar
- Keyboard navigation within calendar
- Focus management between trigger and calendar
- `aria-haspopup` and `aria-expanded` on trigger button
