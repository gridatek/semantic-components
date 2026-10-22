# Date Input

A date, typed — two ways:

- **`ScDateInput`** (`input[scDateInput]`): a text input — the locale's numeric order or ISO, read on Enter or leaving.
- **`ScSegmentedDateInput`** (`div[scSegmentedDateInput]`): part by part — month, day, year — each a spin button.

Both are a `[formField]` with a `Temporal.PlainDate | null` value. In a [date picker](../date-picker/README.md) either one is the picker's value — a range's end with `part="start"` / `part="end"` — and takes the picker's locale and limits; put `[formField]` on the picker.

## Usage

```html
<div scField>
  <label scLabel>Start date</label>
  <input scDateInput placeholder="MM/DD/YYYY" [formField]="form.start" />
</div>

<div scField>
  <label scLabel>Start date</label>
  <div scSegmentedDateInput [formField]="form.start"></div>
</div>
```

## ScDateInput — `input[scDateInput]`, `#di="scDateInput"`

Read on Enter and on leaving: the locale's numeric order (`10/14/2026`, `14/10/2026`, `14.10.2026`) or ISO (`2026-10-14`); a two-digit year is 20xx. Text that is not a day that can be picked — not a date, outside the limits, unavailable, a range's end on the wrong side — stays, marked `aria-invalid`, until it is edited; the value as it was. Emptied: `null`. Shows the value in the locale's numeric form. Takes its id and description from `scField`.

## ScSegmentedDateInput — `div[scSegmentedDateInput]`, `#di="scSegmentedDateInput"`

It writes its own parts — from `Intl.DateTimeFormat#formatToParts`, in the locale's order and with its separators — so there is nothing to put inside it. `null` until every part is filled. A day outside the limits is written and marked `aria-invalid`.

| Key                     | Does                                                                    |
| ----------------------- | ----------------------------------------------------------------------- |
| Digits                  | Fill the part; it moves on once no digit can follow (`4`, `12`, `2026`) |
| Arrow Up / Down         | Step the part (wrapping); an empty part starts at today                 |
| Home / End              | The part's lowest / highest (the day's: the month's last)               |
| Backspace / Delete      | Clear the part — on an empty one, go back                               |
| Arrow Left / Right, Tab | The part before / after                                                 |

Leaving the year with two digits typed makes it this century's (`27` → 2027). The day stays within its month: May 31 becomes April 30.

`role="group"`, named by the field's label (`aria-labelledby`; an `aria-label` of its own wins); each part is a `spinbutton` named in the locale's words (`Intl.DisplayNames`: "month", "day", "year"), with `aria-valuenow` / `-min` / `-max` and `aria-valuetext` (the month's name).

## Inputs (both)

| Input                              | Type                                    | Default                    |
| ---------------------------------- | --------------------------------------- | -------------------------- |
| `value`                            | `Temporal.PlainDate \| null` (model)    | `null`                     |
| `locale`                           | `string \| undefined`                   | the picker's, or the app's |
| `minDate` / `maxDate`              | `Temporal.PlainDate \| undefined`       | — (in a picker: its own)   |
| `unavailable`                      | `(date: Temporal.PlainDate) => boolean` | `() => false`              |
| `part`                             | `'start' \| 'end' \| undefined`         | — (in a picker's range)    |
| `disabled` / `invalid` / `touched` | `boolean`                               | `false`                    |
| `id` / `class`                     | `string`                                | the field's id             |

| Output  | When                                                            |
| ------- | --------------------------------------------------------------- |
| `touch` | Left (Signal Forms marks it touched; in a picker, the picker's) |

| Member   | Description                                         |
| -------- | --------------------------------------------------- |
| `date()` | Its day: its value, or the picker's (a range's end) |
