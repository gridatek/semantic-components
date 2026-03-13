# Range Slider

A dual-thumb range slider for selecting a numeric range between a minimum and maximum value. Each thumb implements `FormValueControl<number>`, so `[formField]` works on each thumb individually.

## Usage

```html
<div scRangeSlider [step]="10">
  <input scRangeSliderMin [min]="0" [max]="1000" [(value)]="minValue" aria-label="Minimum price" />
  <input scRangeSliderMax [min]="0" [max]="1000" [(value)]="maxValue" aria-label="Maximum price" />
</div>
```

### With Signal Forms

```html
<div scRangeSlider [step]="50">
  <input scRangeSliderMin [formField]="priceForm.minPrice" aria-label="Minimum price" />
  <input scRangeSliderMax [formField]="priceForm.maxPrice" aria-label="Maximum price" />
</div>
```

```typescript
readonly priceForm = form(this.formModel, (path) => {
  min(path.minPrice, 0);
  max(path.minPrice, 1000);
  min(path.maxPrice, 0);
  max(path.maxPrice, 1000);
});
```

## Public API

### `ScRangeSlider`

Container directive that manages the track CSS gradients and click-to-snap behavior. Reads `min`/`max` from its child thumbs.

**Selector:** `div[scRangeSlider]`

| Input/Output | Type             | Default | Description                                     |
| ------------ | ---------------- | ------- | ----------------------------------------------- |
| `step`       | `input<number>`  | `1`     | Step increment                                  |
| `disabled`   | `input<boolean>` | `false` | Disables both inputs                            |
| `min`        | `computed`       | `0`     | Read from min thumb's `resolvedMin` (read-only) |
| `max`        | `computed`       | `100`   | Read from max thumb's `resolvedMax` (read-only) |

### `ScRangeSliderMin`

Directive for the minimum value range input. Implements `FormValueControl<number>`.

**Selector:** `input[scRangeSliderMin]`

| Input/Output | Type                         | Default     | Description                   |
| ------------ | ---------------------------- | ----------- | ----------------------------- |
| `value`      | `model<number>`              | `0`         | Two-way bound minimum value   |
| `min`        | `input<number \| undefined>` | `undefined` | Minimum allowed value (→ 0)   |
| `max`        | `input<number \| undefined>` | `undefined` | Maximum allowed value (→ 100) |

Automatically clamps its value so it cannot exceed the max thumb's value.

### `ScRangeSliderMax`

Directive for the maximum value range input. Implements `FormValueControl<number>`.

**Selector:** `input[scRangeSliderMax]`

| Input/Output | Type                         | Default     | Description                   |
| ------------ | ---------------------------- | ----------- | ----------------------------- |
| `value`      | `model<number>`              | `100`       | Two-way bound maximum value   |
| `min`        | `input<number \| undefined>` | `undefined` | Minimum allowed value (→ 0)   |
| `max`        | `input<number \| undefined>` | `undefined` | Maximum allowed value (→ 100) |

Automatically clamps its value so it cannot go below the min thumb's value.

## Overlap handling

When both thumbs are dragged to the same position the slider automatically keeps them usable:

- **Track click**: when equidistant from both thumbs, the max thumb is preferred so the range can expand outward. The min thumb is only chosen when the click is at or below the current collapsed value.
- **z-index swap**: the min thumb normally stacks above the max thumb (`z-10`). When both thumbs overlap in the lower half of the range, the min thumb drops to `z-0` so the max thumb becomes grabbable. In the upper half the min thumb stays on top so it can be dragged left.

## Accessibility

- Thumb inputs are native `<input type="range">` elements — provide `aria-label` attributes to describe each input.
