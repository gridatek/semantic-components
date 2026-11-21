# Date Time Input

A date and a time typed part by part — day, month, year, hour, minute (second), AM/PM — in the order, the separators and on the clock of its locale ("11/02/2026, 2:30 PM", "02.11.2026, 14:30"). In a form, a `Temporal.PlainDateTime`; in a [Date Time Picker](../date-time-picker/README.md), the field.

On the same parts as the [Date Input](../date-input/README.md) and the [Time Input](../time-input/README.md): a shared engine (`ScSegmentedInput`) and segment (`scDateTimeSegment`) — the same keys, the same look (the style's `segmentedInput`).

## Usage

```html
<div scField>
  <label scLabel>Departure</label>
  <div scDateTimeInput [formField]="form.departure"></div>
  <p scFieldDescription>The airport's local time.</p>
</div>
```

## The value

`Temporal.PlainDateTime | null`, through `[formField]` or `[(value)]`: `null` until every part is filled, and again when one is emptied. No time zone: a local date and time. The day stays within its month; a year of one or two digits, when left, is this century's. A whole value pasted — `2026-11-02T14:30`, or its numbers in the locale's order (`11/02/2026 2:30 pm`) — fills every part.

## Keyboard

As the Date and Time Inputs: digits fill a part and move on; `a` / `p` set AM / PM; Arrow Up / Down step (all but the year wrap; an empty part starts at now); Page Up / Down: the year by 5, the month by 3, the day by 7, hours by 2, minutes and seconds by 15; Home / End; Backspace a digit back, then the part emptied, then the part before; Delete; Arrow Left / Right as they show; a separator (`/ . : ,`) or Tab, the next part.

## API

### ScDateTimeInput — `div[scDateTimeInput]`, `#dt="scDateTimeInput"`

| Input                                                        | Type                                       | Default       |
| ------------------------------------------------------------ | ------------------------------------------ | ------------- |
| `value`                                                      | `Temporal.PlainDateTime \| null` (model)   | `null`        |
| `hourCycle`                                                  | `12 \| 24`                                 | the locale's  |
| `granularity`                                                | `'hour' \| 'minute' \| 'second'`           | `'minute'`    |
| `leadingZeros`                                               | `boolean`: the hour always in 2 digits     | `false`       |
| `minDateTime` / `maxDateTime`                                | `Temporal.PlainDateTime`: outside, invalid | —             |
| `unavailable`                                                | `(date: Temporal.PlainDate) => boolean`    | `() => false` |
| `disabled` / `readonly` / `required` / `invalid` / `touched` | `boolean` (bound by `[formField]`)         | `false`       |
| `id` / `aria-labelledby` / `class`                           | `string`                                   | the field's   |

| Output  | When                                          |
| ------- | --------------------------------------------- |
| `touch` | Focus left it (Signal Forms marks it touched) |

| Member                 | Description                                                 |
| ---------------------- | ----------------------------------------------------------- |
| `clear()`              | Empties every part                                          |
| `focus(options, part)` | Focus on a part — the first by default                      |
| `segments()`           | The parts in the locale's order, with the text between them |
| `parts()`              | The parts typed so far                                      |
| `outOfRange()`         | Outside the limits, or on an unavailable day                |

`data-empty`, `data-invalid`, `data-disabled`, `data-readonly` on the group; `data-type` and `data-empty` on each part (`scDateTimeSegment`, written by the input — not one to place or style yourself).

## Accessibility

- `role="group"`, named by the field's label; each part an input with `role="spinbutton"`, named in the locale's words (`Intl.DisplayNames`), with its value, range and text (the month by its name); the text between the parts is hidden.
- Out of range, on an unavailable day, or invalid once left: `aria-invalid` on every part.
- Its direction is its locale's (right to left in Arabic), the clock's digits left to right; the arrows follow the parts as they show.

## Left out

Time zones (`ZonedDateTime`); native form submission (`name`, `form`: Signal Forms only); placeholders such as "mm/dd/yyyy" (words to translate).
