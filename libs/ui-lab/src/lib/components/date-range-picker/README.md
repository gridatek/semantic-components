# Date Range Picker

A composable date range picker built from directive primitives. Uses `ScPopoverProvider` for dropdown behavior (focus trap, keyboard, animations, overlay positioning).

## Components

- `ScDateRangePicker` — Orchestrator directive (`div[scDateRangePicker]`)
- `ScDateRangePickerTrigger` — Trigger button (`button[scDateRangePickerTrigger]`)
- `ScDateRangePickerFooter` — Footer with Cancel/Apply buttons (`div[scDateRangePickerFooter]`)
- `ScDateRangePickerPresets` — Presets sidebar container (`div[scDateRangePickerPresets]`)
- `ScDateRangePickerPreset` — Individual preset button (`button[scDateRangePickerPreset]`)

## Usage

### Basic

```html
<div scDateRangePicker [(value)]="range" #drp="scDateRangePicker">
  <div scPopoverProvider [origin]="trigger.overlayOrigin" align="start">
    <button scDateRangePickerTrigger #trigger="scDateRangePickerTrigger">
      <svg siCalendarIcon class="mr-2 size-4"></svg>
      <span [class]="drp.displayText() ? '' : 'text-muted-foreground'">{{ drp.displayText() || drp.placeholder() }}</span>
    </button>
    <ng-template scPopoverPortal>
      <div scPopover class="w-auto p-0">
        <div class="p-3">
          <div scCalendar mode="range" [numberOfMonths]="2" [value]="drp.value()" (valueChange)="drp.onValueChange($event)" #cal="scCalendar">
            <div scCalendarHeader>
              <button scCalendarPrevious>...</button>
              <button scCalendarHeading>{{ cal.heading() }}</button>
              <button scCalendarNext>...</button>
            </div>
          </div>
          <div scDateRangePickerFooter></div>
        </div>
      </div>
    </ng-template>
  </div>
</div>
```

### With Presets

```html
<div scPopover class="w-auto p-0">
  <div class="flex">
    <div scDateRangePickerPresets>
      @for (preset of presets; track preset.label) {
      <button scDateRangePickerPreset [value]="preset.value">{{ preset.label }}</button>
      }
    </div>
    <div class="p-3">
      <div scCalendar mode="range" [numberOfMonths]="2" ...>...</div>
      <div scDateRangePickerFooter></div>
    </div>
  </div>
</div>
```

```typescript
import { createScDateRangePresets } from '@semantic-components/ui-lab';

presets = createScDateRangePresets();
```

## API

### ScDateRangePicker

| Input         | Type     | Default               | Description            |
| ------------- | -------- | --------------------- | ---------------------- |
| `class`       | `string` | `''`                  | Additional CSS classes |
| `placeholder` | `string` | `'Select date range'` | Placeholder text       |
| `dateFormat`  | `string` | `'short'`             | Date display format    |

| Signal/Output | Type          | Description                 |
| ------------- | ------------- | --------------------------- |
| `value`       | `ScDateRange` | Two-way model binding       |
| `apply`       | `ScDateRange` | Emits when Apply is clicked |

| Property        | Type                  | Description                     |
| --------------- | --------------------- | ------------------------------- |
| `displayText()` | `Signal<string>`      | Formatted range for the trigger |
| `placeholder()` | `InputSignal<string>` | Placeholder input value         |

| Method                 | Description                |
| ---------------------- | -------------------------- |
| `onValueChange(value)` | Update value from calendar |
| `onCancel()`           | Restore pending, close     |
| `onApply()`            | Commit value, close        |
| `formatDate(date)`     | Format a single date       |

### ScDateRangePickerTrigger

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

Exposes `overlayOrigin` for popover positioning. Host directive: `CdkOverlayOrigin`.

### ScDateRangePickerPreset

| Input   | Type          | Required | Description            |
| ------- | ------------- | -------- | ---------------------- |
| `value` | `ScDateRange` | Yes      | Preset range value     |
| `class` | `string`      | No       | Additional CSS classes |

Auto-highlights when active (matches current picker value).

## Multi-Month Calendar

Use `[numberOfMonths]="2"` on `ScCalendar` to render two month grids side by side:

```html
<div scCalendar mode="range" [numberOfMonths]="2" ...></div>
```

The calendar header controls the first month; the second month automatically follows.

## Date Formats

| Format  | Example            |
| ------- | ------------------ |
| `short` | `Jan 15, 2024`     |
| `long`  | `January 15, 2024` |
| `iso`   | `2024-01-15`       |

## Accessibility

- Trigger: `aria-expanded`, `aria-haspopup="dialog"`
- Popover: `role="dialog"`, focus trap via `cdkTrapFocus`
- Escape key closes the popover
- Focus restored to trigger on close
- Calendar: full keyboard navigation via Angular ARIA Grid
