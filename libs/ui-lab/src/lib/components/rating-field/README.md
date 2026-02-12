# Rating Field Component

A composable rating field component for Angular applications, built with a three-tier directive architecture for maximum flexibility and accessibility.

## Architecture

The component consists of three directives:

1. **ScRatingField** - Parent directive managing value state and configuration
2. **ScRatingItemGroup** - Container directive managing hover state and keyboard navigation
3. **ScRatingItem** - Individual rating item directive

## Basic Usage

```html
<div sc-rating-field [(value)]="rating">
  <div sc-rating-item-group>
    @for (i of [1, 2, 3, 4, 5]; track i) {
    <span sc-rating-item [value]="i">
      <svg si-star-icon class="size-5"></svg>
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

### ScRatingItemGroup

Container directive that manages hover state and keyboard navigation. No inputs required.

### ScRatingItem

| Input   | Type     | Required | Description                           |
| ------- | -------- | -------- | ------------------------------------- |
| `value` | `number` | Yes      | The rating value this item represents |

## Examples

### Half-Star Rating

```html
<div sc-rating-field [(value)]="rating" [allowHalf]="true">
  <div sc-rating-item-group>
    @for (i of [1, 2, 3, 4, 5]; track i) {
    <span sc-rating-item [value]="i">
      <svg si-star-icon class="size-6"></svg>
    </span>
    }
  </div>
</div>
```

### Custom Icons (Hearts)

```html
<div sc-rating-field [(value)]="rating">
  <div sc-rating-item-group>
    @for (i of [1, 2, 3, 4, 5]; track i) {
    <span sc-rating-item [value]="i">
      <svg si-heart-icon class="size-5"></svg>
    </span>
    }
  </div>
</div>
```

### Readonly Display

```html
<div sc-rating-field [value]="4.5" [readonly]="true">
  <div sc-rating-item-group>
    @for (i of [1, 2, 3, 4, 5]; track i) {
    <span sc-rating-item [value]="i">
      <svg si-star-icon class="size-5"></svg>
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

Use CSS to style based on state:

```css
[sc-rating-item][data-state='full'] svg {
  fill: gold;
  color: gold;
}

[sc-rating-item][data-state='half'] svg {
  fill: url(#half-gradient);
}

[sc-rating-item][data-state='empty'] svg {
  fill: none;
  color: gray;
}
```
