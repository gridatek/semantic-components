# Time Picker

A component for selecting time values with support for 12/24 hour formats.

## Usage

```html
<div scTimePicker format="12h" [(value)]="time">
  <input scTimePickerInput scTimePickerHoursInput />
  <span scTimePickerSeparator>:</span>
  <input scTimePickerInput scTimePickerMinutesInput />
  <div scTimePickerPeriod>
    <button scTimePickerPeriodAM>AM</button>
    <button scTimePickerPeriodPM>PM</button>
  </div>
</div>
```

## Components

### ScTimePicker

Root container that manages time state.

**Selector:** `[scTimePicker]`

**Inputs:**

| Input         | Type             | Default | Description        |
| ------------- | ---------------- | ------- | ------------------ |
| `format`      | `'12h' \| '24h'` | `'12h'` | Time format        |
| `showSeconds` | `boolean`        | `false` | Show seconds input |
| `disabled`    | `boolean`        | `false` | Disable inputs     |
| `class`       | `string`         | `''`    | Additional CSS     |

**Two-way Bindings:**

| Binding | Type                  | Description   |
| ------- | --------------------- | ------------- |
| `value` | `ScTimeValue \| null` | Selected time |

**Computed:**

| Signal          | Type     | Description           |
| --------------- | -------- | --------------------- |
| `formattedTime` | `string` | Formatted time string |

**Methods:**

| Method                | Description     |
| --------------------- | --------------- |
| `setHours(hours)`     | Set hours value |
| `setMinutes(minutes)` | Set minutes     |
| `setSeconds(seconds)` | Set seconds     |
| `setPeriod(period)`   | Set AM/PM       |

### ScTimePickerInput

Base input directive that provides shared styling and disabled state.

**Selector:** `input[scTimePickerInput]`

**Inputs:**

| Input   | Type     | Required | Description    |
| ------- | -------- | -------- | -------------- |
| `class` | `string` | No       | Additional CSS |

### ScTimePickerHoursInput

Hours input directive. Must be combined with `scTimePickerInput`.

**Selector:** `input[scTimePickerHoursInput]`

**Features:**

- Arrow up/down to increment/decrement hours
- Auto-selects on focus
- Numeric input only
- Value clamping (1–12 for 12h, 0–23 for 24h)

### ScTimePickerMinutesInput

Minutes input directive. Must be combined with `scTimePickerInput`.

**Selector:** `input[scTimePickerMinutesInput]`

**Features:**

- Arrow up/down to increment/decrement minutes
- Auto-selects on focus
- Numeric input only
- Value clamping (0–59)

### ScTimePickerSecondsInput

Seconds input directive. Must be combined with `scTimePickerInput`.

**Selector:** `input[scTimePickerSecondsInput]`

**Features:**

- Arrow up/down to increment/decrement seconds
- Auto-selects on focus
- Numeric input only
- Value clamping (0–59)

### ScTimePickerSeparator

Visual separator (colon) between inputs.

**Selector:** `[scTimePickerSeparator]`

### ScTimePickerPeriod

AM/PM toggle container. Consumers provide buttons via content projection.

**Selector:** `[scTimePickerPeriod]`

### ScTimePickerPeriodAM

AM toggle button directive. Must be a child of `ScTimePickerPeriod`.

**Selector:** `button[scTimePickerPeriodAM]`

### ScTimePickerPeriodPM

PM toggle button directive. Must be a child of `ScTimePickerPeriod`.

**Selector:** `button[scTimePickerPeriodPM]`

### ScTimePickerClock

Visual clock interface for selection.

**Selector:** `[scTimePickerClock]`

**Inputs:**

| Input   | Type                   | Default   | Description    |
| ------- | ---------------------- | --------- | -------------- |
| `mode`  | `'hours' \| 'minutes'` | `'hours'` | Selection mode |
| `class` | `string`               | `''`      | Additional CSS |

## Types

```typescript
type ScTimeFormat = '12h' | '24h';
type ScTimePeriod = 'AM' | 'PM';

interface ScTimeValue {
  hours: number;
  minutes: number;
  seconds?: number;
  period?: ScTimePeriod;
}
```

## Examples

### 12 Hour Format

```html
<div scTimePicker format="12h" [(value)]="time">
  <input scTimePickerInput scTimePickerHoursInput />
  <span scTimePickerSeparator>:</span>
  <input scTimePickerInput scTimePickerMinutesInput />
  <div scTimePickerPeriod>
    <button scTimePickerPeriodAM>AM</button>
    <button scTimePickerPeriodPM>PM</button>
  </div>
</div>
```

### 24 Hour Format

```html
<div scTimePicker format="24h" [(value)]="time">
  <input scTimePickerInput scTimePickerHoursInput />
  <span scTimePickerSeparator>:</span>
  <input scTimePickerInput scTimePickerMinutesInput />
</div>
```

### With Seconds

```html
<div scTimePicker format="24h" [showSeconds]="true" [(value)]="time">
  <input scTimePickerInput scTimePickerHoursInput />
  <span scTimePickerSeparator>:</span>
  <input scTimePickerInput scTimePickerMinutesInput />
  <span scTimePickerSeparator>:</span>
  <input scTimePickerInput scTimePickerSecondsInput />
</div>
```

### Clock Interface

```html
<div scTimePicker format="12h" [(value)]="time">
  <div scTimePickerClock mode="hours"></div>
</div>
```

### Disabled

```html
<div scTimePicker [disabled]="true" [(value)]="time">
  <input scTimePickerInput scTimePickerHoursInput />
  <span scTimePickerSeparator>:</span>
  <input scTimePickerInput scTimePickerMinutesInput />
</div>
```

### Setting Initial Value

```typescript
time = signal<ScTimeValue>({
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
