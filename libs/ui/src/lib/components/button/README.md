# Button

Displays a button or a component that looks like a button.

## Usage

```html
<button sc-button>Click me</button>
```

## Directive

### ScButton

Button directive that can be applied to `button` or `a` elements.

**Selector:** `button[sc-button], a[sc-button]`

**Inputs:**

| Input      | Type                              | Default     | Description                                                  |
| ---------- | --------------------------------- | ----------- | ------------------------------------------------------------ |
| `variant`  | `ButtonVariant`                   | `'default'` | Visual style variant                                         |
| `size`     | `ButtonSize`                      | `'default'` | Size of the button                                           |
| `type`     | `'button' \| 'submit' \| 'reset'` | `'button'`  | Button type attribute (only applied to `<button>` elements)  |
| `href`     | `string`                          | `'#'`       | Href attribute (only applied to `<a>` elements, overridable) |
| `disabled` | `boolean`                         | `false`     | Disables the button (sets `aria-disabled`)                   |
| `class`    | `string`                          | `''`        | Additional CSS classes                                       |

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

### As Link

`ScButton` automatically sets `href="#"` on `<a>` elements. Override with `[href]` for real navigation:

```html
<!-- Default href="#" -->
<a sc-button>Link Button</a>
<a sc-button variant="outline">Outline Link</a>

<!-- Custom href -->
<a sc-button href="/somewhere">Navigate</a>
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
- **Size Options**: 4 sizes including icon-only
- **Icon Support**: Automatic sizing for nested SVG icons
- **Link Support**: Works on both `button` and `a` elements
- **Disabled State**: Built-in disabled styling

## Accessibility

- Uses native `button` or `a` elements
- Supports native `disabled` attribute
- Focus ring for keyboard navigation
- Proper contrast ratios for all variants
