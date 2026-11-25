# Date Range Input

A range of days typed in one box: your two [Date Inputs](../date-input/README.md), start and end, named by you. In a form, `{ from, to }`; in a [Date Range Picker](../date-picker/README.md), the picker's field.

## Usage

```html
<div scField>
  <label scLabel>Stay</label>
  <div scDateRangeInput [formField]="form.stay">
    <div scDateInput part="start" aria-label="Check-in"></div>
    <span aria-hidden="true">–</span>
    <div scDateInput part="end" aria-label="Check-out"></div>
  </div>
</div>
```

The names of the ends and what goes between them are yours (the library writes no text). The ends lose their own box: the range draws the style's `segmentedInput` box round both.

## The value

`ScCalendarRange | null` — `{ from, to }`, the Calendar's range — through `[formField]` or `[(value)]`. Each end writes its side once whole. A day outside `minDate` / `maxDate`, an `unavailable` one, or an end on the wrong side is marked invalid (`data-invalid` on the range and the end). Whether both ends are required is your schema's to say (`validate`).

In a Date Range Picker (`scDatePicker mode="range"`), the value and the limits are the picker's: put the range in the picker's input group, `[formField]` on the picker.

## Keyboard

The Date Input's, all the way through: Tab, or a typed separator, goes from the start's last part to the end's first; Backspace on the end's first empty part goes back into the start; Arrow Left / Right go across both ends, as they show. Leaving the range — not going from one end to the other — marks it touched.

## API

### ScDateRangeInput — `div[scDateRangeInput]`, `#r="scDateRangeInput"`

| Input                                                        | Type                                    | Default                   |
| ------------------------------------------------------------ | --------------------------------------- | ------------------------- |
| `value`                                                      | `ScCalendarRange \| null` (model)       | `null` (in a picker: its) |
| `minDate` / `maxDate`                                        | `Temporal.PlainDate`: both ends         | —                         |
| `unavailable`                                                | `(date: Temporal.PlainDate) => boolean` | `() => false`             |
| `disabled` / `readonly` / `required` / `invalid` / `touched` | `boolean` (bound by `[formField]`)      | `false`                   |
| `id` / `aria-labelledby` / `class`                           | `string`                                | the field's               |

| Output  | When                                             |
| ------- | ------------------------------------------------ |
| `touch` | Focus left the range (in a picker, the picker's) |

| Member          | Description                                             |
| --------------- | ------------------------------------------------------- |
| `clear()`       | Empties both ends                                       |
| `focus()`       | Focus on the start's first part                         |
| `current()`     | The range now: its own, or its picker's                 |
| `canPick(date)` | Within the limits (its own, or its picker's), available |
| `outOfRange()`  | An end can't be picked, or they're the wrong way round  |

Disabled, read-only and required reach both ends. The ends find it through `SC_DATE_INPUT_HOST`, the token the Date Picker provides too: an end works the same in either.

## Left out

Date-time ranges; presets (the Date Range Picker's).
