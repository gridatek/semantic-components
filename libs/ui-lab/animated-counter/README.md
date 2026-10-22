# Animated Counter

A number that moves to its new value — counting there, or each digit rolling — written in the reader's language. Its own entry point: it counts with the [motion](https://motion.dev) library, an optional peer of the lab, needed only where the counter is used.

## Installation

```sh
npm install motion
```

## Usage

From its own entry point, so motion is only loaded where it is used:

```ts
import { ScAnimatedCounter } from '@semantic-components/ui-lab/animated-counter';
```

```html
<span scAnimatedCounter [value]="revenue()" [format]="{ style: 'currency', currency: 'EUR' }"></span>
```

## Inputs

| Input      | Default                 | Does                                                                                                                                   |
| ---------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `value`    | —                       | The number. Each change moves from the one shown.                                                                                      |
| `format`   | `{}`                    | `Intl.NumberFormatOptions`: currency, percent, compact, a unit, decimals, sign.                                                        |
| `locale`   | the app's (`LOCALE_ID`) | The language it is written in.                                                                                                         |
| `effect`   | `count`                 | `count`: the number counts there, easing out (motion). `roll`: each digit rolls to its place (CSS); separators and symbols stay still. |
| `duration` | `1000`                  | How long a change takes, in milliseconds.                                                                                              |
| `from`     | `0`                     | Where the first move starts from.                                                                                                      |
| `start`    | `now`                   | When the first move starts: `now`, or `visible` — when it is first scrolled into view.                                                 |

On the way, the number keeps the value's decimals: counting to 100 shows 37, never 37.284.

## Accessibility

- Screen readers get the value, written in full (a visually hidden copy); the moving digits are hidden from them — never a number on the way.
- Under `prefers-reduced-motion`, the value is there at once.
- `tabular-nums`: its width holds still while it counts.

## Not here

Custom easing curves, moving between formats, digits added or removed sliding in, counting time (the countdown).
