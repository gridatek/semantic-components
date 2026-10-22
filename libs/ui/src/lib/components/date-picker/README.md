# Date Picker

A day, a range or several days, picked in a calendar in a popover — or typed. Its value is the calendar's; `text()` is that value written in the app's language with `Intl` (a range as one span, several days as a list). A `[formField]`. It closes when a pick is done, and focus goes back to its trigger.

## Architecture

```
div[scDatePicker] (mode, [(value)] / [formField], format, locale,
│                      minDate, maxDate, unavailable, disabled)
│  text() · hasValue() · showInvalid() · pick(value) · canPick(date)
├── input[scDatePickerInput]        — typed: the locale's numeric order, or ISO (single mode)
└── div[scPopoverProvider]
    ├── button[scDatePickerTrigger] — your icon and words
    └── ng-template[scPopoverPortal]
        └── div[scPopover]
            └── div[scCalendar] initialFocus [mode]="dp.mode()" [value]="dp.value()" (valueChange)="dp.pick($event)"
```

The calendar is the [calendar](../calendar/README.md), written in full: its header, footer, months and constraints are yours. Give `minDate`, `maxDate` and `unavailable` to both: the picker uses them to check typed days.

## Usage

```html
<div scDatePicker #dp="scDatePicker" [(value)]="date">
  <div scPopoverProvider [origin]="trigger.overlayOrigin" align="start">
    <button scDatePickerTrigger #trigger="scDatePickerTrigger">
      <svg siCalendarIcon></svg>
      <span>{{ dp.text() || 'Pick a date' }}</span>
    </button>
    <ng-template scPopoverPortal>
      <div scPopover class="w-auto p-0" aria-label="Choose a date">
        <div scCalendar #cal="scCalendar" initialFocus aria-label="Choose a date" [mode]="dp.mode()" [value]="dp.value()" (valueChange)="dp.pick($event)">
          <div scCalendarHeader>
            <button scCalendarPrevious><svg siChevronLeftIcon></svg><span class="sr-only">Previous month</span></button>
            <button scCalendarHeading>{{ cal.heading() }}</button>
            <button scCalendarNext><svg siChevronRightIcon></svg><span class="sr-only">Next month</span></button>
          </div>
        </div>
      </div>
    </ng-template>
  </div>
</div>
```

Typed, in a field — the input and the trigger in an input group; there the trigger is an icon button (`variant` ghost, `buttonSize` icon-xs):

```html
<div scField>
  <label scLabel>Start date</label>
  <div scDatePicker #dp="scDatePicker" [formField]="form.start">
    <div scPopoverProvider [origin]="trigger.overlayOrigin" align="end">
      <div scInputGroup>
        <input scDatePickerInput placeholder="MM/DD/YYYY" />
        <div scInputGroupAddon align="inline-end">
          <button scDatePickerTrigger #trigger="scDatePickerTrigger">
            <svg siCalendarIcon></svg>
            <span class="sr-only">Choose a date</span>
          </button>
        </div>
      </div>
      <ng-template scPopoverPortal>…the calendar…</ng-template>
    </div>
  </div>
  <p scFieldDescription>Month, day, year.</p>
</div>
```

## API

### ScDatePicker — `div[scDatePicker]`, `#dp="scDatePicker"`

| Input                              | Type                                    | Default                   |
| ---------------------------------- | --------------------------------------- | ------------------------- |
| `value`                            | `ScCalendarValue` (model)               | `null`                    |
| `mode`                             | `'single' \| 'multiple' \| 'range'`     | `'single'`                |
| `format`                           | `Intl.DateTimeFormatOptions`            | `{ dateStyle: 'medium' }` |
| `locale`                           | `string`                                | `LOCALE_ID`               |
| `minDate` / `maxDate`              | `Temporal.PlainDate \| undefined`       | —                         |
| `unavailable`                      | `(date: Temporal.PlainDate) => boolean` | `() => false`             |
| `disabled` / `invalid` / `touched` | `boolean`                               | `false`                   |
| `class`                            | `string`                                | `''`                      |

| Output  | When                                                                              |
| ------- | --------------------------------------------------------------------------------- |
| `touch` | The calendar closed, or the input was left (Signal Forms marks the field touched) |

| Member          | Description                                                                                |
| --------------- | ------------------------------------------------------------------------------------------ |
| `text()`        | The value as written: a day, a range (`formatRange`), a list (`Intl.ListFormat`) — or `''` |
| `hasValue()`    | `text()` is not empty                                                                      |
| `showInvalid()` | Typed text that is not a day, or invalid once touched                                      |
| `pick(value)`   | The calendar's `(valueChange)`: kept; closed for a day or a whole range                    |
| `canPick(date)` | Within `minDate` / `maxDate`, not `unavailable`                                            |

### ScDatePickerTrigger — `button[scDatePickerTrigger]`

Looks like a select trigger (`size`: default, sm) — in an input group, an icon button (`variant`, `buttonSize`). Opens and closes the popover. `aria-haspopup="dialog"`, `aria-expanded`, `aria-invalid`; `data-placeholder` while there is no value.

### ScDatePickerInput — `input[scDatePickerInput]`

Single mode. Read on Enter and on leaving: the locale's numeric order (`10/14/2026`, `14/10/2026`, `14.10.2026`) or ISO (`2026-10-14`); a two-digit year is 20xx. Text that is not a day that can be picked stays, marked `aria-invalid`, until it is edited. Shows the value in the locale's numeric form. Takes its id and description from `scField`.

## Accessibility

- The trigger says it opens a dialog and whether it is open; the popover and the calendar are named by you.
- `initialFocus` on the calendar puts focus on the selected day (or today) when it opens.
- Closing with a pick or Escape puts focus back on the trigger; a click outside leaves focus where it landed (on the trigger, if it landed on nothing focusable).
- An icon-only trigger needs an `sr-only` name.
