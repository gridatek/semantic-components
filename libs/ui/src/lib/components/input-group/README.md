# Input Group

A composable input group for combining inputs with addons, buttons, and text.

## Components

- `ScInputGroup` - Root container with border, focus, and invalid state styling
- `ScInputGroupAddon` - Addon container with alignment variants
- `ScInputGroupButton` - Button with size variants, ghost variant by default
- `ScInputGroupText` - Text/icon wrapper with muted foreground styling
- `ScInputGroupInput` - Input that strips borders for seamless group integration
- `ScInputGroupTextarea` - Textarea that strips borders for seamless group integration

## Usage

```html
<div scInputGroup>
  <div scInputGroupAddon>
    <span scInputGroupText>
      <svg si-mail-icon></svg>
    </span>
  </div>
  <input scInputGroupInput placeholder="Email address" />
</div>
```

## With Button

```html
<div scInputGroup>
  <div scInputGroupAddon>
    <span scInputGroupText>
      <svg si-search-icon></svg>
    </span>
  </div>
  <input scInputGroupInput placeholder="Search..." />
  <div scInputGroupAddon align="inline-end">
    <button scInputGroupButton size="icon-xs">
      <svg si-x-icon></svg>
    </button>
  </div>
</div>
```

## Inputs

### ScInputGroupAddon

| Input   | Type                                                             | Default          | Description            |
| ------- | ---------------------------------------------------------------- | ---------------- | ---------------------- |
| `align` | `'inline-start' \| 'inline-end' \| 'block-start' \| 'block-end'` | `'inline-start'` | Addon alignment        |
| `class` | `string`                                                         | `''`             | Additional CSS classes |

### ScInputGroupButton

| Input     | Type                                       | Default   | Description            |
| --------- | ------------------------------------------ | --------- | ---------------------- |
| `variant` | `'default' \| 'ghost' \| 'outline' \| ...` | `'ghost'` | Button variant         |
| `size`    | `'xs' \| 'sm' \| 'icon-xs' \| 'icon-sm'`   | `'xs'`    | Button size            |
| `class`   | `string`                                   | `''`      | Additional CSS classes |
