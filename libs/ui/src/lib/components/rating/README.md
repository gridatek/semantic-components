# Rating Field Component

A composable rating field component for Angular applications, built with a three-tier directive architecture for maximum flexibility and accessibility.

## Architecture

The component consists of four directives:

1. **ScRatingField** - Parent directive managing value state and configuration
2. **ScRatingFieldGroup** - Container directive managing hover state and keyboard navigation
3. **ScRatingFieldItem** - Individual rating item directive
4. **ScRatingFieldIcon** - Icon directive that handles active/inactive styling automatically

## Basic Usage

```html
<div scRatingField [(value)]="rating">
  <div scRatingFieldGroup>
    @for (i of [1, 2, 3, 4, 5]; track i) {
    <span scRatingFieldItem [value]="i">
      <svg siStarIcon scRatingFieldIcon></svg>
    </span>
    }
  </div>
</div>
```

## Features

- **Two-way binding** - Use `[(value)]` for reactive value updates
- **Hover preview** - Visual feedback shows rating before selection
- **Half-star support** - Enable `[allowHalf]="true"` for 0.5 increments
- **Custom icons** - Use any icon (stars, hearts, etc.)
- **Custom colors** - Override `--sc-rating-active-color` and `--sc-rating-inactive-color` CSS variables
- **Keyboard navigation** - Full arrow key, Home, End support
- **Accessibility** - WCAG AA compliant with proper ARIA attributes
- **Readonly/Disabled states** - Control interactivity
- **Clear capability** - Click same value to reset (configurable)

## API

### ScRatingField

| Input            | Type      | Default | Description                                 |
| ---------------- | --------- | ------- | ------------------------------------------- |
| `value`          | `number`  | `0`     | Current rating value (use with `[(value)]`) |
| `allowHalf`      | `boolean` | `false` | Enable half-star ratings                    |
| `allowClear`     | `boolean` | `true`  | Allow clearing by clicking same value       |
| `readonly`       | `boolean` | `false` | Make the rating read-only                   |
| `disabled`       | `boolean` | `false` | Disable the rating                          |
| `label`          | `string`  | `''`    | Accessible label for the rating             |
| `ariaLabelledby` | `string`  | `''`    | ID of element labeling the rating           |

**Note:** The `max` value is automatically calculated from the highest `value` among all rating items.

### CSS Variables

| Variable                     | Default                   | Description            |
| ---------------------------- | ------------------------- | ---------------------- |
| `--sc-rating-active-color`   | `var(--color-yellow-400)` | Color for filled icons |
| `--sc-rating-inactive-color` | `var(--color-gray-300)`   | Color for empty icons  |

### ScRatingFieldGroup

Container directive that manages hover state and keyboard navigation. No inputs required.

### ScRatingFieldItem

| Input   | Type     | Required | Description                           |
| ------- | -------- | -------- | ------------------------------------- |
| `value` | `number` | Yes      | The rating value this item represents |

### ScRatingFieldIcon

Icon directive applied to SVGs inside `scRatingFieldItem`. Automatically handles active/inactive styling based on the item's state. Default size is `size-6`, overridable via the `class` input.

## Examples

### Half-Star Rating

```html
<div scRatingField [(value)]="rating" [allowHalf]="true">
  <div scRatingFieldGroup>
    @for (i of [1, 2, 3, 4, 5]; track i) {
    <span scRatingFieldItem [value]="i">
      <svg siStarIcon scRatingFieldIcon></svg>
      <svg siStarIcon scRatingFieldIcon></svg>
    </span>
    }
  </div>
</div>
```

### Custom Icons with Custom Color (Hearts)

```html
<div scRatingField [(value)]="rating" [style.--sc-rating-active-color]="'var(--color-red-500)'">
  <div scRatingFieldGroup>
    @for (i of [1, 2, 3, 4, 5]; track i) {
    <span scRatingFieldItem [value]="i">
      <svg siHeartIcon scRatingFieldIcon></svg>
    </span>
    }
  </div>
</div>
```

### Custom Size

```html
<div scRatingField [(value)]="rating">
  <div scRatingFieldGroup>
    @for (i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; track i) {
    <span scRatingFieldItem [value]="i">
      <svg siStarIcon scRatingFieldIcon class="size-5"></svg>
    </span>
    }
  </div>
</div>
```

### Readonly Display

```html
<div scRatingField [value]="4.5" [readonly]="true">
  <div scRatingFieldGroup>
    @for (i of [1, 2, 3, 4, 5]; track i) {
    <span scRatingFieldItem [value]="i">
      <svg siStarIcon scRatingFieldIcon></svg>
    </span>
    }
  </div>
</div>
```

## Accessibility

The component implements WCAG AA accessibility standards:

- **ARIA roles**: `group` for container, `radiogroup` for items container, `radio` for items
- **ARIA attributes**: `aria-label`, `aria-labelledby`, `aria-checked`, `aria-valuenow/min/max`
- **Keyboard navigation**: Arrow keys, Home, End, Space, Enter
- **Focus management**: Roving tabindex pattern for optimal keyboard navigation
- **Screen reader support**: Announces current value and changes

## Keyboard Shortcuts

- **Arrow Right/Up**: Increase rating by step (1 or 0.5)
- **Arrow Left/Down**: Decrease rating by step
- **Home**: Set to minimum (0)
- **End**: Set to maximum
- **Space/Enter**: Select focused item

## Styling

Items expose a `data-state` attribute with values:

- `full` - Item is fully selected
- `half` - Item is half selected (when `allowHalf` is enabled)
- `empty` - Item is not selected
