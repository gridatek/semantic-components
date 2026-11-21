# Time Input

A time typed part by part — hour, minute, second, AM/PM — on the clock and in the order of its locale. Each part is an input: a number pad on a phone, digits that move on by themselves, arrows that step. In a form, a `Temporal.PlainTime`.

After ui-sdk's Time Input and React Aria's TimeField.

## Usage

```html
<div scField>
  <label scLabel>Meeting time</label>
  <div scTimeInput [formField]="form.time"></div>
  <p scFieldDescription>In your local time.</p>
</div>
```

It writes its own parts from the locale (`Intl.DateTimeFormat#formatToParts`): their order, the text between them, its clock — so there is nothing to put inside it. In a field, its label names it, its description describes each part, its errors are the field's.

## The value

`Temporal.PlainTime | null`, through `[formField]` or `[(value)]`: `null` until every part is filled, and again when one is emptied (the other parts are kept). Whatever clock shows, the value is the day's time. A whole time pasted — `14:30`, `2:30 PM` — fills every part.

## Keyboard

| Key                      | Does                                                               |
| ------------------------ | ------------------------------------------------------------------ |
| Digits                   | Fill the part; on to the next once no digit can follow (`9`, `30`) |
| `a` / `p`                | AM / PM (or the first letter of the locale's)                      |
| Arrow Up / Down          | One up or down, wrapping; an empty part starts at now              |
| Page Up / Down           | Hours by 2, minutes and seconds by 15, on their multiples          |
| Home / End               | The part's lowest / highest                                        |
| Backspace                | A digit back, then the part emptied, then the part before          |
| Delete                   | Empties the part                                                   |
| Arrow Left / Right       | The part to the left / right, as they show (right to left too)     |
| `:` (any separator), Tab | The next part (Tab: then out)                                      |

Digits, letters and separators are read from the input events (`beforeinput`), not the keys: a phone's keyboard sends no key names. Arabic and Persian digits are read too.

## API

### ScTimeInput — `div[scTimeInput]`, `#t="scTimeInput"`

| Input                                                        | Type                                   | Default      |
| ------------------------------------------------------------ | -------------------------------------- | ------------ |
| `value`                                                      | `Temporal.PlainTime \| null` (model)   | `null`       |
| `hourCycle`                                                  | `12 \| 24`                             | the locale's |
| `granularity`                                                | `'hour' \| 'minute' \| 'second'`       | `'minute'`   |
| `leadingZeros`                                               | `boolean`: the hour always in 2 digits | `false`      |
| `minTime` / `maxTime`                                        | `Temporal.PlainTime`: outside, invalid | —            |
| `disabled` / `readonly` / `required` / `invalid` / `touched` | `boolean` (bound by `[formField]`)     | `false`      |
| `id` / `aria-labelledby` / `class`                           | `string`                               | the field's  |

| Output  | When                                          |
| ------- | --------------------------------------------- |
| `touch` | Focus left it (Signal Forms marks it touched) |

| Member                 | Description                                                 |
| ---------------------- | ----------------------------------------------------------- |
| `clear()`              | Empties every part                                          |
| `focus(options, part)` | Focus on a part — the first by default                      |
| `segments()`           | The parts in the locale's order, with the text between them |
| `twelveHours()`        | A 12-hour clock (with AM/PM), or 24                         |
| `outOfRange()`         | The value is outside `minTime` / `maxTime` (marked invalid) |

### ScDateTimeSegment — `input[scDateTimeSegment]`, `#p="scDateTimeSegment"`

A part — hour, minute, second or AM/PM: an input (`role="spinbutton"`) named, ranged and described from its time input, which keeps the state and reads what is typed. The time input's own part, not one to place: `div[scTimeInput]` writes one per part, because the parts — their order, the text between them, AM/PM or not — come from the locale. So it can't be styled from your markup either: its look is the style's (`segmentedInput.segment`).

`data-empty`, `data-invalid`, `data-disabled`, `data-readonly` on the group; `data-type` (`hour`, `minute`, `second`, `dayPeriod`) and `data-empty` on each part.

## Look

The style's `segmentedInput` key: `root`, the style's input drawn round the parts (focus, disabled and invalid read from the group), and `segment`, the corners of a focused part's highlight. Each part is as wide as what it shows.

## Accessibility

- `role="group"`, named by the field's label; each part an input with `role="spinbutton"`, named in the locale's words (`Intl.DisplayNames`: "hour", "minute", "AM/PM"), with `aria-valuenow` / `-min` / `-max` / `-valuetext`; the text between the parts is hidden.
- Out of range, or invalid once left: `aria-invalid` on every part.
- Disabled: the parts are disabled, out of the tab order. Read-only: they can be focused and read.
- Right to left: the clock's digits stay left to right; AM/PM sits where the locale puts it.

## Left out

Time zones (a `PlainTime` has none); a per-part `step` (Page Up / Down); native form submission (`name`, `form`: Signal Forms only); an "Empty" announcement (an English word — the library writes no text); drawing the parts yourself (the look is the style's).
