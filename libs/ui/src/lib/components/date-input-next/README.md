# Date Input Next

A date typed part by part — day, month, year — in the order of its locale. Each part is an input: a number pad on a phone, digits that move on by themselves, arrows that step. In a form, a `Temporal.PlainDate`; in a [Date Picker](../date-picker/README.md), the picker's day.

After ui-sdk's Date Input, as the [Time Input](../time-input/README.md). Being built next to the [Date Input](../date-input/README.md) (a text input and a segmented one), which it will replace.

## Usage

```html
<div scField>
  <label scLabel>Birthday</label>
  <div scDateInputNext [formField]="form.birthday"></div>
  <p scFieldDescription>We send a card on the day.</p>
</div>
```

It writes its own parts from the locale (`Intl.DateTimeFormat#formatToParts`): their order and the text between them — so there is nothing to put inside it. In a field, its label names it, its description describes each part, its errors are the field's.

## The value

`Temporal.PlainDate | null`, through `[formField]` or `[(value)]`: `null` until every part is filled, and again when one is emptied (the other parts are kept). The day stays within its month (January 31, then February: the 28th). A year of one or two digits, when left, is this century's (`27` → 2027). A whole date pasted — `2026-11-02`, or its numbers in the locale's order — fills every part.

In a date picker it is the picker's day — a range's end with `part="start"` / `part="end"` — and takes the picker's limits; put `[formField]` on the picker.

## Keyboard

| Key                | Does                                                                       |
| ------------------ | -------------------------------------------------------------------------- |
| Digits             | Fill the part; on to the next once no digit can follow (`4`, `12`, `2026`) |
| Arrow Up / Down    | One up or down — the day and month wrap; an empty part starts at today     |
| Page Up / Down     | The year by 5, the month by 3, the day by 7                                |
| Home / End         | The part's lowest / highest (the day's: the month's last)                  |
| Backspace          | A digit back, then the part emptied, then the part before                  |
| Delete             | Empties the part                                                           |
| Arrow Left / Right | The part to the left / right, as they show                                 |
| `/` `.` `-`, Tab   | The next part (Tab: then out)                                              |

Digits and separators are read from the input events (`beforeinput`), not the keys: a phone's keyboard sends no key names. Arabic and Persian digits are read too.

## API

### ScDateInputNext — `div[scDateInputNext]`, `#d="scDateInputNext"`

| Input                                                        | Type                                    | Default                  |
| ------------------------------------------------------------ | --------------------------------------- | ------------------------ |
| `value`                                                      | `Temporal.PlainDate \| null` (model)    | `null`                   |
| `minDate` / `maxDate`                                        | `Temporal.PlainDate`: outside, invalid  | — (in a picker: its own) |
| `unavailable`                                                | `(date: Temporal.PlainDate) => boolean` | `() => false`            |
| `part`                                                       | `'start' \| 'end'`                      | — (in a picker's range)  |
| `disabled` / `readonly` / `required` / `invalid` / `touched` | `boolean` (bound by `[formField]`)      | `false`                  |
| `id` / `aria-labelledby` / `class`                           | `string`                                | the field's              |

| Output  | When                                                            |
| ------- | --------------------------------------------------------------- |
| `touch` | Left (Signal Forms marks it touched; in a picker, the picker's) |

| Member                 | Description                                                 |
| ---------------------- | ----------------------------------------------------------- |
| `clear()`              | Empties every part                                          |
| `focus(options, part)` | Focus on a part — the first by default                      |
| `segments()`           | The parts in the locale's order, with the text between them |
| `date()`               | Its day: its value, or the picker's (a range's end)         |
| `outOfRange()`         | Not a day that can be picked (marked invalid)               |

`data-empty`, `data-invalid`, `data-disabled`, `data-readonly` on the group; `data-type` (`day`, `month`, `year`) and `data-empty` on each part.

### ScDateInputNextSegment — `input[scDateInputNextSegment]`

A part — day, month or year: an input (`role="spinbutton"`) named, ranged and described from its date input, which keeps the state and reads what is typed. The date input's own part, not one to place: `div[scDateInputNext]` writes one per part, because the parts — their order, the text between them — come from the locale. So it can't be styled from your markup either: its look is the style's (`segmentedInput.segment`).

## Look

The style's `segmentedInput` key, as the Time Input's: `root`, the style's input drawn round the parts, and `segment`, the corners of a focused part's highlight. Each part is as wide as what it shows; an empty one shows `––` (the year `––––`).

## Accessibility

- `role="group"`, named by the field's label; each part an input with `role="spinbutton"`, named in the locale's words (`Intl.DisplayNames`: "day", "month", "year"), with `aria-valuenow` / `-min` / `-max` / `-valuetext` (the month by its name); the text between the parts is hidden.
- Out of range, unavailable, or invalid once left: `aria-invalid` on every part.
- Its direction is its locale's — right to left in Arabic, left to right in English, whatever the page; the arrows follow the parts as they show.

## Left out

Native form submission (`name`, `form`: Signal Forms only); an "Empty" announcement and placeholders such as "mm/dd/yyyy" (words to translate — the library writes no text); a time in the same field (`scDateTimeInput`, next).
