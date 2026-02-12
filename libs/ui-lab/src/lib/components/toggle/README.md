# Toggle

A two-state button that can be either on or off.

## Components

- `ScToggle` - Toggle button with pressed/unpressed state

## Usage

```html
<button sc-toggle [(pressed)]="bold" aria-label="Toggle bold">
  <svg><!-- icon --></svg>
</button>
```

## Variants

```html
<!-- Default -->
<button sc-toggle>Toggle</button>

<!-- Outline -->
<button sc-toggle variant="outline">Toggle</button>
```

## Sizes

```html
<button sc-toggle size="sm">Small</button>
<button sc-toggle size="default">Default</button>
<button sc-toggle size="lg">Large</button>
```

## With Text

```html
<button sc-toggle [(pressed)]="underline">
  <svg class="mr-2 size-4"><!-- icon --></svg>
  Underline
</button>
```

## Disabled

```html
<button sc-toggle [disabled]="true">Toggle</button>
```

## Inputs

| Input      | Type                        | Default     | Description                |
| ---------- | --------------------------- | ----------- | -------------------------- |
| `pressed`  | `boolean`                   | `false`     | The pressed state (model)  |
| `disabled` | `boolean`                   | `false`     | Whether toggle is disabled |
| `variant`  | `'default' \| 'outline'`    | `'default'` | Toggle variant             |
| `size`     | `'default' \| 'sm' \| 'lg'` | `'default'` | Toggle size                |
| `class`    | `string`                    | `''`        | Additional CSS classes     |

## Outputs

| Output          | Type      | Description                      |
| --------------- | --------- | -------------------------------- |
| `pressedChange` | `boolean` | Emits when pressed state changes |

## Accessibility

- Uses `aria-pressed` to communicate state
- `data-state` attribute: `on` or `off`
- Should include `aria-label` when using only icons
- Keyboard accessible (Enter/Space to toggle)
- Focus ring for keyboard navigation
