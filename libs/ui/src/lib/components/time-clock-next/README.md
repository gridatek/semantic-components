# Time Clock Next

A time picked on a clock face — the hour, then the minute, then the second — by pointer (mouse, touch, pen: click or drag) or keyboard; each pick moves on to the next view, as in every picker. The numbers are the locale's; 12 hours with AM/PM, or 24 with 13–00 on an inner ring. A `[formField]`: `Temporal.PlainTime`, or `null`. Being built to replace the [Time Clock](../time-clock/README.md).

## Architecture

```
div[scTimeClockNext] ([(value)] / [formField], [(view)], hourCycle, granularity,
│                     minuteStep, secondStep, minTime, maxTime, disabled, readonly)
│  views() · names() · text() · partText(view) · period() · setHour/Minute/Second() · setPeriod() · moveOn()
├── div[scTimeClockNextHeader]  — the time, each part a button for its view; AM / PM in 12 hours
└── div[scTimeClockNextDial]    — the face: a slider — name it, by view
```

Both parts write their own content: nothing to put inside them.

## Usage

```html
<div scTimeClockNext #clock="scTimeClockNext" [formField]="form.at">
  <div scTimeClockNextHeader></div>
  <div scTimeClockNextDial [attr.aria-label]="clock.names()[clock.view()]"></div>
</div>
```

With a [Time Input](../time-input/README.md), give both the same value: type it, or pick it.

## Picking

Drag or click the hand; let go, and the dial moves on to the next view (`granularity` says which there are). The header's buttons go back to any view. An empty clock starts at now. Outside `minTime` / `maxTime` the numbers are dimmed and can't be picked; switching AM/PM keeps the hour, or takes the nearest that can be.

## Keyboard (on the dial)

| Key                           | Does                                                      |
| ----------------------------- | --------------------------------------------------------- |
| Arrow Up / Right, Down / Left | One hour, or one step of minutes or seconds (wrapping)    |
| Page Up / Down                | Hours by 2, minutes and seconds by 15 — as the Time Input |
| Home / End                    | The first / last value                                    |
| Enter                         | On to the next view                                       |

## API

### ScTimeClockNext — `div[scTimeClockNext]`, `#clock="scTimeClockNext"`

| Input                                           | Type                                        | Default      |
| ----------------------------------------------- | ------------------------------------------- | ------------ |
| `value`                                         | `Temporal.PlainTime \| null` (model)        | `null`       |
| `view`                                          | `'hours' \| 'minutes' \| 'seconds'` (model) | `'hours'`    |
| `hourCycle`                                     | `12 \| 24`                                  | the locale's |
| `granularity`                                   | `'hour' \| 'minute' \| 'second'`            | `'minute'`   |
| `minuteStep` / `secondStep`                     | `number`                                    | `1`          |
| `minTime` / `maxTime`                           | `Temporal.PlainTime`                        | —            |
| `disabled` / `readonly` / `invalid` / `touched` | `boolean`                                   | `false`      |

| Output  | When                                          |
| ------- | --------------------------------------------- |
| `touch` | Focus left it (Signal Forms marks it touched) |

### ScTimeClockNextHeader — `div[scTimeClockNextHeader]`

The time as the locale writes it, left to right in any page — each part a button for its view (`aria-pressed` while shown, named by `Intl.DisplayNames`); in 12 hours, AM and PM (the locale's words), a period with no hour that can be picked disabled.

### ScTimeClockNextDial — `div[scTimeClockNextDial]`

`role="slider"`: `aria-valuenow` the hour (0–23), minute or second, `aria-valuetext` the whole time as the locale writes it. The numbers are decorative; a number not picked has the face's background, so the hand passes under it. It never turns right to left (a clock is a clock).

## Look

The style's `timeClock` key: `face` (its size and colour), `number` and `numberInner` (the text sizes, the inner ring's smaller), `time` (the header's).
