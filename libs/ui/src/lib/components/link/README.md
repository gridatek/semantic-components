# Link

A styled anchor element that shares button variants for consistent styling.

## Usage

```html
<a sc-link href="/dashboard">Go to Dashboard</a>
```

## Directive

### ScLink

Link directive applied to `a` elements. Reuses `buttonVariants` from the Button component for consistent styling.

**Selector:** `a[sc-link]`

**Inputs:**

| Input      | Type            | Default     | Description            |
| ---------- | --------------- | ----------- | ---------------------- |
| `variant`  | `ButtonVariant` | `'default'` | Visual style variant   |
| `size`     | `ButtonSize`    | `'default'` | Size of the link       |
| `href`     | `string`        | `'#'`       | Href attribute         |
| `disabled` | `boolean`       | `false`     | Disables the link      |
| `class`    | `string`        | `''`        | Additional CSS classes |

See the [Button README](../button/README.md) for available `ButtonVariant` and `ButtonSize` values.

## Examples

### Basic

```html
<a sc-link href="/home">Home</a>
```

### Variants

```html
<a sc-link href="/action">Default</a>
<a sc-link variant="outline" href="/settings">Outline</a>
<a sc-link variant="ghost" href="/about">Ghost</a>
<a sc-link variant="link" href="/docs">Link</a>
```

### Disabled

```html
<a sc-link disabled>Disabled Link</a>
```

## Features

- **Shared Variants**: Uses the same variant and size system as Button
- **Disabled State**: Sets `aria-disabled` and `tabindex="-1"` when disabled
- **Default Href**: Defaults to `#` if no href is provided

## Accessibility

- Uses native `a` element
- Sets `aria-disabled` when disabled
- Sets `tabindex="-1"` when disabled to remove from tab order
- Focus ring for keyboard navigation
