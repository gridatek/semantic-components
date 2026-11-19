# Number Ticker

A number that moves to its new value: counting there (`count`), or each digit rolling like an odometer (`roll`). Written by `Intl.NumberFormat` in the app's language (`LOCALE_ID`). On any element, an SVG `<text>` too — a chart's total, counting as its series draws in. No animation library: frame by frame, with CSS's easing.

## Features

- **Two effects** — `count` (the default) counts through the numbers on the way; `roll` moves each digit to its new place, the separators and the text around it staying still
- **Any format** — `format` takes `Intl.NumberFormatOptions`: currency, percent, compact, a unit, decimals; the numbers on the way keep the value's decimals
- **The reader's language** — `LOCALE_ID`, the app's or one provided for a section: German separators, Arabic-Indic digits…
- **Right to left** — the number keeps its digit order (a number reads left to right in any page); the text around it (a currency, a sign) is placed by the page's direction
- **When seen** — `start="visible"` waits until it is first scrolled into view
- **In a chart** — on an SVG `<text>` it counts (no rolling there); `delay`, `duration` and `easing` as the chart's series
- **Server-safe** — it starts in the browser, once the app is stable; the server writes the starting number (`from`)

## Usage

```html
<span scNumberTicker [value]="revenue()" [format]="{ style: 'currency', currency: 'USD' }"></span>

<span scNumberTicker effect="roll" class="text-5xl font-bold" [value]="price()"></span>

<!-- In a chart's center: counting as the donut sweeps in. -->
<text scNumberTicker text-anchor="middle" [value]="total" start="visible" easing="ease" [delay]="400" [duration]="1500"></text>
```

It writes the number; you style it (size, weight, colour).

## API

### ScNumberTicker — `[scNumberTicker]`

`exportAs: 'scNumberTicker'`.

| Input      | Type                       | Default      | Description                                                      |
| ---------- | -------------------------- | ------------ | ---------------------------------------------------------------- |
| `value`    | `number`                   | —            | The number (required): a new one is moved to                     |
| `effect`   | `'count' \| 'roll'`        | `'count'`    | Counting to it, or each digit rolling (on HTML only)             |
| `format`   | `Intl.NumberFormatOptions` | `{}`         | How it is written — currency, percent, compact, a unit, decimals |
| `duration` | `number`                   | `1000`       | How long a change takes, in ms                                   |
| `delay`    | `number`                   | `0`          | The wait before it moves, in ms                                  |
| `easing`   | `ScEasing`                 | `'ease-out'` | How it moves: CSS's timing names                                 |
| `from`     | `number`                   | `0`          | Where the first move starts from                                 |
| `start`    | `'now' \| 'visible'`       | `'now'`      | When the first move starts: at once, or when it is first seen    |
| `class`    | `string`                   | `''`         | Merged over its own classes                                      |

## Accessibility

- Screen readers get the value, never the numbers on the way: a hidden text with it, the moving digits hidden from them (`aria-hidden`). On an SVG text: `role="img"`, named by the value.
- A change isn't announced: put the ticker in a live region (an `aria-live` parent) if its new value must be heard.
- With reduced motion (`prefers-reduced-motion`), the new value is there at once; the digits don't roll.
