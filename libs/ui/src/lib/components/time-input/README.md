# Time Input

A time, typed part by part — hour, minute (second), AM/PM — in the order, the separators and the hour cycle of its locale. Each part is a spin button. A `[formField]`: a `Temporal.PlainTime`, or `null` until every part is filled.

## Usage

```html
<div scField>
  <label scLabel>Start time</label>
  <div scTimeInput [formField]="form.start"></div>
</div>
```

It writes its own parts — from `Intl.DateTimeFormat#formatToParts` — so there is nothing to put inside it. In a field, its label names it (`aria-labelledby`), its description describes each part.

## Keyboard

| Key                     | Does                                                            |
| ----------------------- | --------------------------------------------------------------- |
| Digits                  | Fill the part; it moves on once no digit can follow (`9`, `30`) |
| `a` / `p`               | AM / PM (or the first letter of the locale's)                   |
| Arrow Up / Down         | Step the part (wrapping); an empty part starts at now           |
| Home / End              | The part's lowest / highest                                     |
| Backspace / Delete      | Clear the part — on an empty one, go back                       |
| Arrow Left / Right, Tab | The part before / after                                         |

## API

### ScTimeInput — `div[scTimeInput]`, `#ti="scTimeInput"`

| Input                              | Type                                 | Default      |
| ---------------------------------- | ------------------------------------ | ------------ |
| `value`                            | `Temporal.PlainTime \| null` (model) | `null`       |
| `locale`                           | `string`                             | `LOCALE_ID`  |
| `hourCycle`                        | `'h12' \| 'h23' \| undefined`        | the locale's |
| `granularity`                      | `'hour' \| 'minute' \| 'second'`     | `'minute'`   |
| `step`                             | `{ hours?, minutes?, seconds? }`     | 1 each       |
| `minTime` / `maxTime`              | `Temporal.PlainTime \| undefined`    | —            |
| `disabled` / `invalid` / `touched` | `boolean`                            | `false`      |
| `id` / `aria-labelledby` / `class` | `string`                             | the field's  |

| Output  | When                                          |
| ------- | --------------------------------------------- |
| `touch` | Focus left it (Signal Forms marks it touched) |

| Member          | Description                                                 |
| --------------- | ----------------------------------------------------------- |
| `segments()`    | The parts in the locale's order, with the text between them |
| `twelveHours()` | 12 hours (with AM/PM), or 24                                |
| `outOfRange()`  | The value is outside `minTime` / `maxTime` (marked invalid) |

## Accessibility

- `role="group"`, named by the field's label; each part is a `spinbutton` named in the locale's words (`Intl.DisplayNames`: "hour", "minute", "AM/PM"), with `aria-valuenow` / `-min` / `-max` / `-valuetext`.
- Out of range, or invalid once touched: `aria-invalid` on every part.
- Disabled: the parts leave the tab order.
