# Range Slider

An input where the user selects a range with minimum and maximum values from within a given range using dual thumbs.

## Components

- `ScRangeSlider` - Dual-thumb range slider for selecting min and max values

## Usage

```html
<div sc-range-slider [(minValue)]="minPrice" [(maxValue)]="maxPrice"></div>
```

## With Min/Max Bounds

```html
<div sc-range-slider [(minValue)]="minPrice" [(maxValue)]="maxPrice" [min]="0" [max]="1000"></div>
```

## With Step

```html
<div sc-range-slider [(minValue)]="minTemp" [(maxValue)]="maxTemp" [min]="0" [max]="40" [step]="1"></div>
```

## With Labels

```html
<div sc-range-slider [(minValue)]="minPrice" [(maxValue)]="maxPrice" [min]="0" [max]="1000" [minLabel]="'Minimum price'" [maxLabel]="'Maximum price'"></div>
```

## Disabled

```html
<div sc-range-slider [minValue]="25" [maxValue]="75" [disabled]="true"></div>
```

## Display Range

```html
<div class="space-y-2">
  <div class="flex justify-between text-sm">
    <span>Price Range</span>
    <span>\${{ minPrice() }} - \${{ maxPrice() }}</span>
  </div>
  <div sc-range-slider [(minValue)]="minPrice" [(maxValue)]="maxPrice" [min]="0" [max]="1000"></div>
</div>
```

## Inputs

| Input                 | Type                  | Default     | Description                       |
| --------------------- | --------------------- | ----------- | --------------------------------- |
| `minValue`            | `number`              | `0`         | Current minimum value (model)     |
| `maxValue`            | `number`              | `100`       | Current maximum value (model)     |
| `min`                 | `number`              | `0`         | Minimum bound                     |
| `max`                 | `number`              | `100`       | Maximum bound                     |
| `step`                | `number`              | `1`         | Step increment                    |
| `disabled`            | `boolean`             | `false`     | Whether slider is disabled        |
| `minLabel`            | `string \| undefined` | `undefined` | ARIA label for minimum thumb      |
| `maxLabel`            | `string \| undefined` | `undefined` | ARIA label for maximum thumb      |
| `min-aria-labelledby` | `string \| undefined` | `undefined` | ARIA labelledby for minimum thumb |
| `max-aria-labelledby` | `string \| undefined` | `undefined` | ARIA labelledby for maximum thumb |
| `class`               | `string`              | `''`        | Additional CSS classes            |

## Outputs

| Output           | Type     | Description                      |
| ---------------- | -------- | -------------------------------- |
| `minValueChange` | `number` | Emits when minimum value changes |
| `maxValueChange` | `number` | Emits when maximum value changes |

## Keyboard Navigation

### Minimum Thumb

| Key        | Action                           |
| ---------- | -------------------------------- |
| ArrowRight | Increase by step (max: maxValue) |
| ArrowUp    | Increase by step (max: maxValue) |
| ArrowLeft  | Decrease by step                 |
| ArrowDown  | Decrease by step                 |
| Home       | Set to minimum bound             |
| End        | Set to maximum value (maxValue)  |
| PageUp     | Increase by step × 10            |
| PageDown   | Decrease by step × 10            |

### Maximum Thumb

| Key        | Action                           |
| ---------- | -------------------------------- |
| ArrowRight | Increase by step                 |
| ArrowUp    | Increase by step                 |
| ArrowLeft  | Decrease by step (min: minValue) |
| ArrowDown  | Decrease by step (min: minValue) |
| Home       | Set to minimum value (minValue)  |
| End        | Set to maximum bound             |
| PageUp     | Increase by step × 10            |
| PageDown   | Decrease by step × 10            |

## Behavior

- The minimum thumb cannot move beyond the maximum thumb
- The maximum thumb cannot move below the minimum thumb
- Both thumbs can be controlled independently via mouse, touch, or keyboard
- Clicking and dragging works for both thumbs

## Accessibility

- Each thumb uses `role="slider"`
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow` attributes on both thumbs
- `aria-label` support via `minLabel` and `maxLabel` inputs
- `aria-labelledby` support via `min-aria-labelledby` and `max-aria-labelledby` inputs
- `aria-disabled` when disabled
- Full keyboard navigation support for both thumbs
- Focus ring for keyboard users
- Screen readers announce each thumb's current value and label
