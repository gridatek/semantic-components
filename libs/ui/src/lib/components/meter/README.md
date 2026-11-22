# Meter

A measurement within a known range — storage used, a quota, a score: a bar filled to it, and the value screen readers hear (`role="meter"`). After ui-sdk's Meter. For a task getting done, a [Progress](../progress/README.md).

## Architecture

```
div[scMeter] ([value], min, max, format, valueLabel)  — exportAs scMeter: text(), percent(), clamped()
├── [scMeterLabel]                 — its name (aria-labelledby)
├── [scMeterValue]                 — the value written, or your text; aria-hidden
└── div[scMeterTrack]              — the bar
    └── div[scMeterIndicator]      — filled to the value, from the line's start
```

## Usage

```html
<div scMeter [value]="68">
  <span scMeterLabel>Storage used</span>
  <span scMeterValue></span>
  <div scMeterTrack><div scMeterIndicator></div></div>
</div>
```

Without a label, name it with `aria-label`.

## The value

- It follows yours: no output, no busy state (a meter always has a value).
- `min` and `max` (0, 100) set where it sits; out of them, it's held to the range for the bar, the percent and `aria-valuenow` — a format that isn't a percent writes it as given.
- `format`: `Intl.NumberFormat` options — a percent style (the default) writes where it sits in the range, any other the value itself (`{ style: 'unit', unit: 'gigabyte' }`, a currency, a decimal) — or a function of the value (`(seats) => \`${seats} of 25 seats\``). In the app's language: `LOCALE_ID` (provide it for a section).
- `valueLabel(value, { formatted, percent, min, max })`: what screen readers hear, when the value written isn't enough.
- The root sets `--sc-meter-value`: the percent (`40%`).

## Look

The style's progress bar (`progress`: track, label, value); the fill is `bg-primary`, from the start of the line (the right, right to left).

## Not here

Low / high / optimum levels (colour it from the value yourself), a circle.
