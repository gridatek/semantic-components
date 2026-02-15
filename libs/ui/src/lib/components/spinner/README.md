# Spinner

A loading indicator directive applied to an SVG icon.

## Components

- `ScSpinner` - A directive that adds spin animation and accessibility attributes to an SVG

## Usage

```html
<svg sc-spinner si-loader-2-icon></svg>
```

## With Colors

```html
<svg sc-spinner si-loader-2-icon class="text-primary"></svg> <svg sc-spinner si-loader-2-icon class="text-blue-500"></svg>
```

## Custom Size

```html
<svg sc-spinner si-loader-2-icon class="size-8"></svg>
```

## In Buttons

```html
<button disabled>
  <svg sc-spinner si-loader-2-icon></svg>
  Loading...
</button>
```

## Inputs

| Input   | Type     | Default     | Description            |
| ------- | -------- | ----------- | ---------------------- |
| `class` | `string` | `''`        | Additional CSS classes |
| `label` | `string` | `'Loading'` | Accessible aria-label  |
