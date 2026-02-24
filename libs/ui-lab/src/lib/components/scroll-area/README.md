# Scroll Area

Applies styled native scrollbar styling that matches shadcn aesthetics (thin, rounded, border-colored thumb).

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

- Native scrollbar styled to match shadcn design (thin, rounded, `bg-border` colored thumb)
- Works in Chromium, Safari, and Firefox
- `overflow-auto` applied by default — scrollbars appear only when content overflows
- Keyboard and touch scrolling work natively
