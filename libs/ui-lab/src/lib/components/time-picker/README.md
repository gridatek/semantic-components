# Time Picker

A component for selecting time values with support for 12/24 hour formats.

## Usage

```html
<div sc-time-picker format="12h" [(value)]="time">
  <input sc-time-picker-input type="hours" label="Hours" />
  <span sc-time-picker-separator>:</span>
  <input sc-time-picker-input type="minutes" label="Minutes" />
  <div sc-time-picker-period></div>
</div>
```

## Components

### ScTimePicker

Root container that manages time state.

**Selector:** `[sc-time-picker]`

**Inputs:**

| Input         | Type             | Default | Description        |
| ------------- | ---------------- | ------- | ------------------ |
| `format`      | `'12h' \| '24h'` | `'12h'` | Time format        |
| `showSeconds` | `boolean`        | `false` | Show seconds input |
| `disabled`    | `boolean`        | `false` | Disable inputs     |
| `class`       | `string`         | `''`    | Additional CSS     |

**Two-way Bindings:**

| Binding | Type                | Description   |
| ------- | ------------------- | ------------- |
| `value` | `TimeValue \| null` | Selected time |

**Methods:**

| Method                | Description     |
| --------------------- | --------------- |
| `setHours(hours)`     | Set hours value |
| `setMinutes(minutes)` | Set minutes     |
| `setSeconds(seconds)` | Set seconds     |
| `setPeriod(period)`   | Set AM/PM       |
| `getFormattedTime()`  | Get string time |

### ScTimePickerInput

Numeric input for hours, minutes, or seconds.

**Selector:** `input[sc-time-picker-input]`

**Inputs:**

| Input   | Type                                | Required | Description    |
| ------- | ----------------------------------- | -------- | -------------- |
| `type`  | `'hours' \| 'minutes' \| 'seconds'` | Yes      | Input type     |
| `label` | `string`                            | No       | Aria label     |
| `class` | `string`                            | No       | Additional CSS |

**Features:**

- Arrow up/down to increment/decrement
- Auto-selects on focus
- Numeric input only
- Value clamping

### ScTimePickerSeparator

Visual separator (colon) between inputs.

**Selector:** `[sc-time-picker-separator]`

### ScTimePickerPeriod

AM/PM toggle buttons.

**Selector:** `[sc-time-picker-period]`

### ScTimePickerClock

Visual clock interface for selection.

**Selector:** `[sc-time-picker-clock]`

**Inputs:**

| Input   | Type                   | Default   | Description    |
| ------- | ---------------------- | --------- | -------------- |
| `mode`  | `'hours' \| 'minutes'` | `'hours'` | Selection mode |
| `class` | `string`               | `''`      | Additional CSS |

## Types

```typescript
type TimeFormat = '12h' | '24h';
type TimePeriod = 'AM' | 'PM';

interface TimeValue {
  hours: number;
  minutes: number;
  seconds?: number;
  period?: TimePeriod;
}
```

## Examples

### 12 Hour Format

```html
<div sc-time-picker format="12h" [(value)]="time">
  <input sc-time-picker-input type="hours" />
  <span sc-time-picker-separator>:</span>
  <input sc-time-picker-input type="minutes" />
  <div sc-time-picker-period></div>
</div>
```

### 24 Hour Format

```html
<div sc-time-picker format="24h" [(value)]="time">
  <input sc-time-picker-input type="hours" />
  <span sc-time-picker-separator>:</span>
  <input sc-time-picker-input type="minutes" />
</div>
```

### With Seconds

```html
<div sc-time-picker format="24h" [showSeconds]="true" [(value)]="time">
  <input sc-time-picker-input type="hours" />
  <span sc-time-picker-separator>:</span>
  <input sc-time-picker-input type="minutes" />
  <span sc-time-picker-separator>:</span>
  <input sc-time-picker-input type="seconds" />
</div>
```

### Clock Interface

```html
<div sc-time-picker format="12h" [(value)]="time">
  <div sc-time-picker-clock mode="hours"></div>
</div>
```

### Disabled

```html
<div sc-time-picker [disabled]="true" [(value)]="time">
  <input sc-time-picker-input type="hours" />
  <span sc-time-picker-separator>:</span>
  <input sc-time-picker-input type="minutes" />
</div>
```

### Setting Initial Value

```typescript
time = signal<TimeValue>({
  hours: 9,
  minutes: 30,
  period: 'AM',
});
```

## Features

- **12/24 Hour Formats**: Support for both time formats
- **Seconds Support**: Optional seconds input
- **AM/PM Toggle**: Built-in period selector
- **Clock Interface**: Visual clock for selection
- **Keyboard Navigation**: Arrow keys to adjust values
- **Input Validation**: Numeric-only, auto-clamping
- **Two-way Binding**: Sync time state with `[(value)]`

## Accessibility

- Proper ARIA labels on inputs
- Keyboard navigation (arrows to increment/decrement)
- Numeric inputmode for mobile keyboards
- Focus management with auto-select
- Group role on period toggle
