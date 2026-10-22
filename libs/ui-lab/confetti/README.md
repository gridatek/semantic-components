# Confetti

A burst, two cannons or fireworks, in the theme's colours — on a click, or from code. Decorative only, and none for reduced motion. Its own entry point: it draws with [canvas-confetti](https://github.com/catdad/canvas-confetti), an optional peer of the lab, loaded on the first burst only.

## Installation

```sh
npm install canvas-confetti
```

## Usage

From its own entry point:

```ts
import { ScConfetti, ScConfettiTrigger } from '@semantic-components/ui-lab/confetti';
```

On a click — a burst from the element:

```html
<button scButton scConfettiTrigger>Celebrate</button>
<button scButton scConfettiTrigger confettiEffect="sides">Launch</button>
<button scButton confettiEffect="fireworks" [scConfettiTrigger]="{ duration: 3000 }">Fireworks</button>
```

From code:

```ts
private readonly confetti = inject(ScConfetti);

async save() {
  await this.api.save();
  await this.confetti.sides();
}
```

## `ScConfetti`

| Method                | Does                                             |
| --------------------- | ------------------------------------------------ |
| `burst(options?)`     | A burst — from the bottom middle, or `origin`.   |
| `sides(options?)`     | Two cannons, from the edges of the screen.       |
| `fireworks(options?)` | Bursts here and there, for `duration` (3000 ms). |
| `reset()`             | Clears what is falling.                          |

Each settles when the confetti has fallen.

## Options

| Option     | Does                                                                                               |
| ---------- | -------------------------------------------------------------------------------------------------- |
| `count`    | How many pieces.                                                                                   |
| `spread`   | How wide, in degrees.                                                                              |
| `angle`    | Which way, in degrees: 90 is up.                                                                   |
| `velocity` | How fast they start.                                                                               |
| `origin`   | Where from: `{ x, y }` (0–1 of the screen), or an element — its centre.                            |
| `colors`   | Any CSS colours; the theme's by default (`--primary`, `--chart-1` … `--chart-5`, read when fired). |
| `shapes`   | `square`, `circle`, `star`.                                                                        |
| `size`     | 1 is the usual.                                                                                    |
| `gravity`  | 1 is the usual.                                                                                    |
| `duration` | Fireworks only, in milliseconds.                                                                   |

## `[scConfettiTrigger]`

On any element: a click sets it off. Its value is the options; `confettiEffect` is `burst` (default — from the element), `sides` or `fireworks`. Behaviour only: the element keeps its own look.

## Accessibility

- One full-screen canvas, `aria-hidden`, `pointer-events: none` — never read, never in the way.
- None at all under `prefers-reduced-motion`.
- Decorative: say what is celebrated in words too ("Welcome aboard!"), in a status of yours.

## Not here

Emoji and text shapes, confetti inside a container, a continuous rain, sound.
