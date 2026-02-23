# Range Slider

A composable range slider component for selecting a numeric range between a minimum and maximum value.

## Usage

```html
<div scRangeSlider [(minValue)]="minValue" [(maxValue)]="maxValue" [min]="0" [max]="1000" [step]="10">
  <input scRangeSliderMinThumb aria-label="Minimum price" />
  <input scRangeSliderMaxThumb aria-label="Maximum price" />
</div>
```

## Public API

### `ScRangeSlider`

Main component that manages state and renders the track internally.

**Selector:** `div[scRangeSlider]`

| Input/Output | Type             | Default | Description                 |
| ------------ | ---------------- | ------- | --------------------------- |
| `minValue`   | `model<number>`  | `0`     | Two-way bound minimum value |
| `maxValue`   | `model<number>`  | `100`   | Two-way bound maximum value |
| `min`        | `input<number>`  | `0`     | Minimum allowed value       |
| `max`        | `input<number>`  | `100`   | Maximum allowed value       |
| `step`       | `input<number>`  | `1`     | Step increment              |
| `disabled`   | `input<boolean>` | `false` | Disables both thumbs        |

### `ScRangeSliderMinThumb`

Directive for the minimum value thumb input.

**Selector:** `input[scRangeSliderMinThumb]`

Automatically clamps its value so it cannot exceed `maxValue`.

### `ScRangeSliderMaxThumb`

Directive for the maximum value thumb input.

**Selector:** `input[scRangeSliderMaxThumb]`

Automatically clamps its value so it cannot go below `minValue`.

## Internal Directives

The following directives are rendered internally by `ScRangeSlider` and are not part of the public API:

- **`ScRangeSliderTrack`** — The background track (`aria-hidden`).
- **`ScRangeSliderFilledTrack`** — The filled portion between the two thumbs (`aria-hidden`).

## Accessibility

- Both track elements use `aria-hidden="true"` since they are purely decorative.
- Thumb inputs are native `<input type="range">` elements — provide `aria-label` attributes to describe each thumb.
