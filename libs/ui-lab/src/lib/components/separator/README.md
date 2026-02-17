# Separator

Visually or semantically separates content.

## Components

- `ScSeparator` - A visual divider with horizontal or vertical orientation

## Usage

### Horizontal Separator (default)

```html
<div scSeparator></div>
```

### Vertical Separator

```html
<div class="flex h-5 items-center space-x-4">
  <div>Item 1</div>
  <div scSeparator orientation="vertical"></div>
  <div>Item 2</div>
  <div scSeparator orientation="vertical"></div>
  <div>Item 3</div>
</div>
```

## Inputs

| Input         | Type                         | Default        | Description            |
| ------------- | ---------------------------- | -------------- | ---------------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Separator orientation  |
| `decorative`  | `boolean`                    | `false`        | If true, purely visual |
| `class`       | `string`                     | `''`           | Additional CSS classes |

## Styling

The separator uses the `bg-border` color by default. Override with custom classes:

```html
<div scSeparator class="bg-red-500"></div>
```

Custom thickness:

```html
<!-- Thicker horizontal separator -->
<div scSeparator class="h-0.5"></div>

<!-- Thicker vertical separator -->
<div scSeparator orientation="vertical" class="w-0.5"></div>
```

## Accessibility

- Uses `role="separator"` for semantic meaning
- `aria-orientation` attribute indicates the orientation
- Set `decorative` to `true` if the separator is purely visual
