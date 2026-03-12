# Range Slider

A dual-thumb range slider for selecting a numeric range between a minimum and maximum value.

## Usage

```html
<div scRangeSlider [(minValue)]="minValue" [(maxValue)]="maxValue" [min]="0" [max]="1000" [step]="10">
  <input scRangeSliderMin aria-label="Minimum price" />
  <input scRangeSliderMax aria-label="Maximum price" />
</div>
```

## Public API

### `ScRangeSlider`

Directive that manages state and renders the track via CSS gradients on the native input's track pseudo-elements.

**Selector:** `div[scRangeSlider]`

| Input/Output | Type             | Default | Description                 |
| ------------ | ---------------- | ------- | --------------------------- |
| `minValue`   | `model<number>`  | `0`     | Two-way bound minimum value |
| `maxValue`   | `model<number>`  | `100`   | Two-way bound maximum value |
| `min`        | `input<number>`  | `0`     | Minimum allowed value       |
| `max`        | `input<number>`  | `100`   | Maximum allowed value       |
| `step`       | `input<number>`  | `1`     | Step increment              |
| `disabled`   | `input<boolean>` | `false` | Disables both inputs        |

### `ScRangeSliderMin`

Directive for the minimum value range input.

**Selector:** `input[scRangeSliderMin]`

Automatically clamps its value so it cannot exceed `maxValue`.

### `ScRangeSliderMax`

Directive for the maximum value range input.

**Selector:** `input[scRangeSliderMax]`

Automatically clamps its value so it cannot go below `minValue`.

## Overlap handling

When both thumbs are dragged to the same position the slider automatically keeps them usable:

- **Track click**: when equidistant from both thumbs, the max thumb is preferred so the range can expand outward. The min thumb is only chosen when the click is at or below the current collapsed value.
- **z-index swap**: the min thumb normally stacks above the max thumb (`z-10`). When both thumbs overlap in the lower half of the range, the min thumb drops to `z-0` so the max thumb becomes grabbable. In the upper half the min thumb stays on top so it can be dragged left.

## Accessibility

- Thumb inputs are native `<input type="range">` elements — provide `aria-label` attributes to describe each input.
