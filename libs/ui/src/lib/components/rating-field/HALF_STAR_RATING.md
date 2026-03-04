# Half-Star Rating

This document explains the half-star rating implementation and how half-filled stars are rendered visually.

## Overview

The rating field supports half-star increments (0.5 steps) when `[allowHalf]="true"` is set on `scRatingField`. This enables:

- **Click detection** — clicking the left half of a star sets `value - 0.5`, clicking the right half sets the full value
- **Hover preview** — moving the cursor over the left/right halves of a star previews the corresponding half or full value
- **Keyboard navigation** — arrow keys increment/decrement by 0.5 instead of 1
- **Visual state** — each `scRatingItem` exposes a `data-state` attribute (`full`, `half`, or `empty`) and a `state()` signal accessible via `exportAs`

## Usage

For half-star support, provide **two** `scRatingIcon` SVGs inside each `scRatingItem`. The `ScRatingIcon` directive automatically assigns the first as the background and the second as the foreground with `clip-path` handling:

```html
<div scRatingField [(value)]="rating" [allowHalf]="true">
  <div scRatingItemGroup>
    @for (i of [1, 2, 3, 4, 5]; track i) {
    <span scRatingItem [value]="i">
      <svg siStarIcon scRatingIcon></svg>
      <svg siStarIcon scRatingIcon></svg>
    </span>
    }
  </div>
</div>
```

## How It Works

### The Problem

A single icon element cannot natively render a "half-filled" state. A rating of `3.5` needs to show the 4th star as half-filled.

### The Solution: Two Overlapping SVGs with `clip-path`

When two `scRatingIcon` directives are placed inside a single `scRatingItem`, the component automatically assigns roles:

1. **Background icon** (`role: 'background'`) — always visible in the inactive color
2. **Foreground icon** (`role: 'foreground'`) — absolutely positioned on top, filled with the active color, and conditionally clipped

The foreground icon:

- Is **hidden** when `state() === 'empty'`
- Is **fully visible** when `state() === 'full'`
- Is **clipped to the left half** via `clip-path: inset(0 50% 0 0)` when `state() === 'half'`

### Visual Rendering

```
Rating: 3.5 / 5

  ★  ★  ★  ◐  ☆
  1  2  3  4  5
       full half empty
```

Each star item consists of two layers:

```
┌──────────────────┐
│  Background SVG   │  ← always inactive color
├──────────────────┤
│  Foreground SVG   │  ← active color overlay
│                   │     clipped by clip-path when half
└──────────────────┘
```

For the half state, `clip-path: inset(0 50% 0 0)` clips the right half of the foreground SVG, revealing the background underneath:

```
┌─────────┬────────┐
│ active   │inactive│  ← half state
│ (filled) │(empty) │
└─────────┴────────┘
  clip-path clips here
```

### CSS Variables

Colors are controlled via CSS variables on `ScRatingField`:

| Variable                     | Default                   | Description            |
| ---------------------------- | ------------------------- | ---------------------- |
| `--sc-rating-active-color`   | `var(--color-yellow-400)` | Color for filled icons |
| `--sc-rating-inactive-color` | `var(--color-gray-300)`   | Color for empty icons  |

### Click Detection

When `allowHalf` is enabled, the click handler measures the cursor's X position relative to the element:

- **Left half** (x < width / 2) → sets `value - 0.5`
- **Right half** (x >= width / 2) → sets full `value`

The same logic applies to hover preview via the `mousemove` event.

### Keyboard Navigation

When `allowHalf` is enabled, arrow keys use a step of `0.5`:

| Key               | Action                     |
| ----------------- | -------------------------- |
| Arrow Right / Up  | Increase by 0.5            |
| Arrow Left / Down | Decrease by 0.5            |
| Home              | Set to 0                   |
| End               | Set to max                 |
| Space / Enter     | Select focused item (full) |

### Accessibility

- Each item's `aria-checked` reflects whether it is fully or partially selected
- The `radiogroup` container exposes `aria-valuenow` with the exact numeric value (e.g. `3.5`)
- Screen readers announce the precise rating through `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`

## Key Takeaway

When using `[allowHalf]="true"`, always provide **two** `scRatingIcon` SVGs inside each `scRatingItem`. The directive handles the background/foreground roles, clipping, and color styling automatically.
