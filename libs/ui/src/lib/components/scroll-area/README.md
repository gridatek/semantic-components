# Scroll Area

A scrollable area with thin, styled scrollbars that appear on hover.

## Usage

```html
<div scScrollArea class="h-72 w-48 rounded-md border">
  <div class="p-4">
    <!-- Scrollable content -->
  </div>
</div>
```

## Inputs

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

## Features

- Thin, rounded scrollbars hidden by default and visible on hover
- Works in Chromium, Safari, and Firefox
- `overflow-auto` applied by default — scrollbars appear only when content overflows
- Keyboard and touch scrolling work natively
