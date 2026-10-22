# Time Clock

A time picked on a clock face — the hour, then the minute — by pointer (mouse, touch, pen: click or drag) or keyboard. The numbers are the locale's; 12 hours with AM/PM, or 24 with 13–00 on an inner ring, as the locale has it. A `[formField]`: `Temporal.PlainTime`, or `null`.

## Architecture

```
div[scTimeClock] ([(value)] / [formField], [(view)], locale, hourCycle,
│                 step, minTime, maxTime, autoAdvance, disabled)
│  text() · hourText() · minuteText() · period() · setHour() · setMinute() · setPeriod()
├── div[scTimeClockHeader]  — the hour and the minute (buttons: the view), AM / PM in 12 hours
└── div[scTimeClockDial]    — the face: a slider — name it, by view
```

Both parts write their own content: nothing to put inside them.

## Usage

```html
<div scTimeClock #clock="scTimeClock" [formField]="form.at">
  <div scTimeClockHeader></div>
  <div scTimeClockDial [attr.aria-label]="clock.view() === 'hours' ? 'Hours' : 'Minutes'"></div>
</div>
```

With a [time input](../../../../../ui/src/lib/components/time-input/README.md), give both the same value: type it, or pick it.

## Keyboard (on the dial)

| Key               | Does                                    |
| ----------------- | --------------------------------------- |
| Arrow Up / Right  | +1 hour, or + `step` minutes (wrapping) |
| Arrow Down / Left | −1 hour, or − `step` minutes            |
| Page Up / Down    | ±1 hour, or ±5 minutes                  |
| Home / End        | 0 / 23 — or the first / last minute     |
| Enter             | On to the minutes                       |

An empty clock starts from now.

## API

### ScTimeClock — `div[scTimeClock]`, `#clock="scTimeClock"`

| Input                              | Type                                        | Default      |
| ---------------------------------- | ------------------------------------------- | ------------ |
| `value`                            | `Temporal.PlainTime \| null` (model)        | `null`       |
| `view`                             | `'hours' \| 'minutes'` (model)              | `'hours'`    |
| `locale`                           | `string`                                    | `LOCALE_ID`  |
| `hourCycle`                        | `'h12' \| 'h23' \| undefined`               | the locale's |
| `step`                             | `number` (minutes)                          | `1`          |
| `minTime` / `maxTime`              | `Temporal.PlainTime \| undefined`           | —            |
| `autoAdvance`                      | `boolean` — on to the minutes after an hour | `true`       |
| `disabled` / `invalid` / `touched` | `boolean`                                   | `false`      |

| Output  | When                                          |
| ------- | --------------------------------------------- |
| `touch` | Focus left it (Signal Forms marks it touched) |

### ScTimeClockHeader — `div[scTimeClockHeader]`

The hour and the minute as the locale writes them, each a button for its view (`aria-pressed` while shown, named by `Intl.DisplayNames`); in 12 hours, AM and PM (the locale's words) — a period with no hour that can be picked is disabled; switching keeps the hour, or takes the nearest that can be picked.

### ScTimeClockDial — `div[scTimeClockDial]`

`role="slider"`: `aria-valuenow` the hour (0–23) or the minute, `aria-valuetext` the whole time as the locale writes it ("10:30 AM"). The numbers are decorative; outside `minTime` / `maxTime` they are dimmed and can't be picked. Released after an hour was picked: on to the minutes.
