# Date Picker

A composable date picker built from directives. The consumer writes all markup and composes existing popover + calendar directives directly.

## Usage

```html
<div scDatePicker [(value)]="selectedDate" #dp="scDatePicker">
  <div scPopoverProvider [origin]="trigger.overlayOrigin" align="start">
    <button scDatePickerTrigger #trigger="scDatePickerTrigger">
      <svg siCalendarIcon class="mr-2 size-4"></svg>
      <span [class]="dp.displayText() ? '' : 'text-muted-foreground'">{{ dp.displayText() || dp.placeholder() }}</span>
    </button>
    <ng-template scPopoverPortal>
      <div scPopover class="w-auto p-0">
        <div scCalendar [value]="dp.value()" (valueChange)="dp.onValueChange($event)" #cal="scCalendar">
          <div scCalendarHeader>
            <button scCalendarPrevious>
              <svg siChevronLeftIcon class="size-4"></svg>
              <span class="sr-only">@switch (cal.viewMode()) { @case ('day') { Go to previous month } @case ('month') { Go to previous year } @case ('year') { Go to previous decade } }</span>
            </button>
            <button scCalendarHeading>{{ cal.heading() }}</button>
            <button scCalendarNext>
              <svg siChevronRightIcon class="size-4"></svg>
              <span class="sr-only">@switch (cal.viewMode()) { @case ('day') { Go to next month } @case ('month') { Go to next year } @case ('year') { Go to next decade } }</span>
            </button>
          </div>
        </div>
      </div>
    </ng-template>
  </div>
</div>
```

## Directives

### ScDatePicker

Root directive that manages value, display text, and auto-close logic.

**Selector:** `div[scDatePicker]`
**Export:** `scDatePicker`

**Inputs:**

| Input         | Type                               | Default         | Description      |
| ------------- | ---------------------------------- | --------------- | ---------------- |
| `mode`        | `'single' \| 'multiple'\| 'range'` | `'single'`      | Selection mode   |
| `placeholder` | `string`                           | `'Pick a date'` | Placeholder text |
| `class`       | `string`                           | `''`            | CSS classes      |

**Two-way Bindings:**

| Binding | Type              | Description    |
| ------- | ----------------- | -------------- |
| `value` | `ScCalendarValue` | Selected value |

**Public API:**

| Member                    | Type                           | Description                                         |
| ------------------------- | ------------------------------ | --------------------------------------------------- |
| `displayText()`           | `Signal<string>`               | Formatted display text based on mode and value      |
| `placeholder()`           | `InputSignal<string>`          | The placeholder input                               |
| `value()`                 | `ModelSignal<ScCalendarValue>` | The current value                                   |
| `mode()`                  | `InputSignal<ScCalendarMode>`  | The current mode                                    |
| `onValueChange(newValue)` | `(v: ScCalendarValue) => void` | Sets value and auto-closes popover when appropriate |

### ScDatePickerTrigger

Trigger button with input-like styling and popover toggle behavior.

**Selector:** `button[scDatePickerTrigger]`
**Export:** `scDatePickerTrigger`

**Inputs:**

| Input   | Type     | Default | Description |
| ------- | -------- | ------- | ----------- |
| `class` | `string` | `''`    | CSS classes |

**Public API:**

| Member          | Type               | Description                                    |
| --------------- | ------------------ | ---------------------------------------------- |
| `overlayOrigin` | `CdkOverlayOrigin` | Pass to `ScPopoverProvider`'s `[origin]` input |

## Examples

### Date Range Picker

```html
<div scDatePicker mode="range" [(value)]="range" placeholder="Pick a date range" #dp="scDatePicker">...</div>
```

### Multiple Dates

```html
<div scDatePicker mode="multiple" [(value)]="dates" placeholder="Select dates" #dp="scDatePicker">...</div>
```

### With Date Constraints

Pass `[minDate]` and `[maxDate]` directly on the `scCalendar` directive:

```html
<div scCalendar [value]="dp.value()" [minDate]="minDate" [maxDate]="maxDate" (valueChange)="dp.onValueChange($event)">...</div>
```

## Features

- **Fully composable**: Consumer writes all markup and can customize any part
- **Popover integration**: Uses existing ScPopoverProvider + ScPopoverPortal
- **Calendar integration**: Uses existing ScCalendar directives
- **Auto-close**: Closes on date selection (single/range complete)
- **Display format**: Shows selected date(s) via `displayText()` computed
- **Selection modes**: Single, multiple, and range selection

## Accessibility

- `aria-haspopup="dialog"` and `aria-expanded` on trigger button
- Inherits accessibility features from Popover and Calendar
- Keyboard navigation within calendar
- Focus management between trigger and calendar
