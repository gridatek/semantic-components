# Spinner

Something loading, on your icon's `svg`: a status (`role="status"`), named by your `aria-label` — read out, as shadcn's: the spinner takes back the `aria-hidden` its icon sets (its host bindings run after the icon's, which never change). Its size is a `size-*` class; nothing changes from style to style, so it has no preset key.

## Components

- `ScSpinner` - A directive that adds spin animation and accessibility attributes to an SVG

## Usage

```html
<svg scSpinner si-loader-2-icon></svg>
```

## With Colors

```html
<svg scSpinner aria-label="Loading" si-loader-2-icon class="text-primary"></svg> <svg scSpinner aria-label="Loading" si-loader-2-icon class="text-blue-500"></svg>
```

## Custom Size

```html
<svg scSpinner si-loader-2-icon class="size-8"></svg>
```

## In Buttons

```html
<button disabled>
  <svg scSpinner si-loader-2-icon></svg>
  Loading...
</button>
```

## Inputs

| Input   | Type     | Default     | Description            |
| ------- | -------- | ----------- | ---------------------- |
| `class` | `string` | `''`        | Additional CSS classes |
| `label` | `string` | `'Loading'` | Accessible aria-label  |
