# Button

Displays a button or a component that looks like a button.

## Usage

```html
<button sc-button>Click me</button>
```

## Directive

### ScButton

Button directive applied to `button` elements.

**Selector:** `button[sc-button]`

**Inputs:**

| Input      | Type                              | Default     | Description            |
| ---------- | --------------------------------- | ----------- | ---------------------- |
| `variant`  | `ButtonVariant`                   | `'default'` | Visual style variant   |
| `size`     | `ButtonSize`                      | `'default'` | Size of the button     |
| `type`     | `'button' \| 'submit' \| 'reset'` | `'button'`  | Button type attribute  |
| `disabled` | `boolean`                         | `false`     | Disables the button    |
| `class`    | `string`                          | `''`        | Additional CSS classes |

**ButtonVariant:**

- `default` - Primary button style
- `destructive` - Destructive/danger action
- `outline` - Bordered button
- `secondary` - Secondary action
- `ghost` - Minimal styling
- `link` - Looks like a link

**ButtonSize:**

- `default` - Standard size (h-8)
- `xs` - Extra small size (h-6)
- `sm` - Small size (h-7)
- `lg` - Large size (h-9)
- `icon` - Square icon button (size-8)
- `icon-xs` - Extra small icon button (size-6)
- `icon-sm` - Small icon button (size-7)
- `icon-lg` - Large icon button (size-9)

## Examples

### Variants

```html
<button sc-button>Default</button>
<button sc-button variant="secondary">Secondary</button>
<button sc-button variant="destructive">Destructive</button>
<button sc-button variant="outline">Outline</button>
<button sc-button variant="ghost">Ghost</button>
<button sc-button variant="link">Link</button>
```

### Sizes

```html
<button sc-button size="lg">Large</button>
<button sc-button size="default">Default</button>
<button sc-button size="sm">Small</button>
<button sc-button size="icon">
  <svg><!-- icon --></svg>
</button>
```

### With Icons

```html
<button sc-button>
  <svg><!-- icon --></svg>
  Upload
</button>

<button sc-button variant="outline">
  Settings
  <svg><!-- icon --></svg>
</button>
```

### Disabled

```html
<button sc-button disabled>Disabled</button>
```

### Form Submit

By default, `sc-button` sets `type="button"` to prevent accidental form submissions. Use `type="submit"` explicitly for submit buttons:

```html
<form>
  <button sc-button variant="outline">Cancel</button>
  <!-- type="button" by default, won't submit -->

  <button sc-button type="submit">Save</button>
  <!-- explicit type="submit" -->
</form>
```

### Loading State

```html
<button sc-button disabled>
  <svg sc-spinner si-loader-2-icon></svg>
  Please wait
</button>
```

## Features

- **Multiple Variants**: 6 visual variants for different use cases
- **Size Options**: 8 sizes including icon-only variants
- **Icon Support**: Automatic sizing for nested SVG icons
- **Disabled State**: Built-in disabled styling with `aria-disabled`

## Accessibility

- Uses native `button` element
- Supports native `disabled` attribute
- Sets `aria-disabled` for assistive technology
- Focus ring for keyboard navigation
- Proper contrast ratios for all variants
