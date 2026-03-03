# Half-Star Rating

This document explains the half-star rating implementation and how to render half-filled stars visually.

## Overview

The rating field supports half-star increments (0.5 steps) when `[allowHalf]="true"` is set on `scRatingField`. This enables:

- **Click detection** — clicking the left half of a star sets `value - 0.5`, clicking the right half sets the full value
- **Hover preview** — moving the cursor over the left/right halves of a star previews the corresponding half or full value
- **Keyboard navigation** — arrow keys increment/decrement by 0.5 instead of 1
- **Visual state** — each `scRatingItem` exposes a `data-state` attribute (`full`, `half`, or `empty`) and a `state()` signal accessible via `exportAs`

## The Problem

A single icon element cannot natively render a "half-filled" state. A naive approach like:

```html
<!-- This does NOT work for half stars -->
<svg siStarIcon
  [class.fill-yellow-400]="i <= rating()"
  [class.text-gray-300]="i > rating()"
></svg>
```

…will round down. A rating of `3.5` renders identically to `3.0` because `4 <= 3.5` is `false`.

## The Solution: Two Overlapping SVGs with `clip-path`

Each rating item uses two overlapping SVGs:

1. **Background star** — always visible in the empty color (e.g. `text-gray-300`)
2. **Foreground star** — absolutely positioned on top, filled with the active color (e.g. `fill-yellow-400`), and conditionally clipped

The foreground star:

- Is **hidden** when `state() === 'empty'`
- Is **fully visible** when `state() === 'full'`
- Is **clipped to the left half** via `clip-path: inset(0 50% 0 0)` when `state() === 'half'`

### Accessing `state()` in Templates

The `ScRatingFieldItem` directive exports itself via `exportAs: 'scRatingItem'`. Use a template reference variable to access the `state()` signal:

```html
<span scRatingItem [value]="i" #item="scRatingItem">
  <!-- item.state() returns 'full' | 'half' | 'empty' -->
</span>
```

## Full Example: Interactive Half-Star Rating

```typescript
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScRatingField,
  ScRatingItemGroup,
  ScRatingFieldItem,
} from '@semantic-components/ui-lab';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-half-rating-field-demo',
  imports: [ScRatingField, ScRatingItemGroup, ScRatingFieldItem, SiStarIcon],
  template: `
    <div scRatingField [(value)]="rating" [allowHalf]="true">
      <div scRatingItemGroup class="flex gap-0.5">
        @for (i of [1, 2, 3, 4, 5]; track i) {
          <span
            scRatingItem
            [value]="i"
            #item="scRatingItem"
            class="relative cursor-pointer transition-transform hover:scale-110"
          >
            <svg siStarIcon class="size-6 text-gray-300"></svg>
            <svg
              siStarIcon
              class="absolute inset-0 size-6 fill-yellow-400 text-yellow-400 transition-colors"
              [class.hidden]="item.state() === 'empty'"
              [style.clip-path]="
                item.state() === 'half' ? 'inset(0 50% 0 0)' : 'none'
              "
            ></svg>
          </span>
        }
      </div>
    </div>
    <p>Rating: {{ rating() }} / 5</p>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HalfRatingFieldDemo {
  readonly rating = signal(3.5);
}
```

## Full Example: Readonly Half-Star Display

For displaying a fixed half-star value (e.g. an average score):

```html
<div scRatingField [value]="3.5" [readonly]="true" [allowHalf]="true">
  <div scRatingItemGroup class="flex gap-0.5">
    @for (i of [1, 2, 3, 4, 5]; track i) {
      <span scRatingItem [value]="i" #item="scRatingItem" class="relative">
        <svg siStarIcon class="size-6 text-gray-300"></svg>
        <svg
          siStarIcon
          class="absolute inset-0 size-6 fill-yellow-400 text-yellow-400"
          [class.hidden]="item.state() === 'empty'"
          [style.clip-path]="
            item.state() === 'half' ? 'inset(0 50% 0 0)' : 'none'
          "
        ></svg>
      </span>
    }
  </div>
</div>
```

## How It Works

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
│  Background SVG   │  ← always gray (text-gray-300)
│  (text-gray-300)  │
├──────────────────┤
│  Foreground SVG   │  ← yellow overlay (fill-yellow-400)
│  (fill-yellow-400)│     clipped by clip-path when half
└──────────────────┘
```

For the half state, `clip-path: inset(0 50% 0 0)` clips the right half of the foreground SVG, revealing the gray background underneath:

```
┌─────────┬────────┐
│ yellow   │  gray  │  ← half state
│ (filled) │(empty) │
└─────────┴────────┘
  clip-path clips here
```

### Click Detection

When `allowHalf` is enabled, the click handler measures the cursor's X position relative to the element:

- **Left half** (x < width / 2) → sets `value - 0.5`
- **Right half** (x >= width / 2) → sets full `value`

The same logic applies to hover preview via the `mousemove` event.

### Keyboard Navigation

When `allowHalf` is enabled, arrow keys use a step of `0.5`:

| Key              | Action                     |
| ---------------- | -------------------------- |
| Arrow Right / Up | Increase by 0.5            |
| Arrow Left / Down| Decrease by 0.5            |
| Home             | Set to 0                   |
| End              | Set to max                 |
| Space / Enter    | Select focused item (full) |

### Accessibility

- Each item's `aria-checked` reflects whether it is fully or partially selected
- The `radiogroup` container exposes `aria-valuenow` with the exact numeric value (e.g. `3.5`)
- Screen readers announce the precise rating through `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`

## Key Takeaway

When using `[allowHalf]="true"`, always use the **two-SVG overlay pattern** with `#item="scRatingItem"` and `item.state()` to render half-filled stars. Do not rely on simple integer comparisons like `i <= rating()` — they cannot represent half values visually.
