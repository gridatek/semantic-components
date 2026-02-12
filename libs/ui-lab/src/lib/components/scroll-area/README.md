# Scroll Area

Augments native scroll functionality for custom, cross-browser styling with a custom scrollbar.

## Components

- `ScScrollArea` - Container that hides native scrollbar
- `ScScrollBar` - Custom scrollbar with track and thumb

## Usage

### Vertical Scroll

```html
<div sc-scroll-area class="h-72 w-48 rounded-md border">
  <div class="p-4">
    <!-- Scrollable content -->
  </div>
  <div sc-scroll-bar orientation="vertical"></div>
</div>
```

### Horizontal Scroll

```html
<div sc-scroll-area class="w-96 whitespace-nowrap rounded-md border">
  <div class="flex w-max space-x-4 p-4">
    <!-- Horizontally scrollable content -->
  </div>
  <div sc-scroll-bar orientation="horizontal"></div>
</div>
```

### Both Scrollbars

```html
<div sc-scroll-area class="h-72 w-72 rounded-md border">
  <div class="p-4" style="width: 500px;">
    <!-- Content wider and taller than container -->
  </div>
  <div sc-scroll-bar orientation="vertical"></div>
  <div sc-scroll-bar orientation="horizontal"></div>
</div>
```

## Inputs

### ScScrollArea

| Input           | Type     | Default | Description                      |
| --------------- | -------- | ------- | -------------------------------- |
| `class`         | `string` | `''`    | Additional CSS classes           |
| `viewportClass` | `string` | `''`    | Classes for the viewport element |

### ScScrollBar

| Input         | Type                         | Default      | Description            |
| ------------- | ---------------------------- | ------------ | ---------------------- |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Scrollbar orientation  |
| `class`       | `string`                     | `''`         | Additional CSS classes |

## Features

- Custom styled scrollbar that matches your design system
- Supports vertical, horizontal, or both scrollbars
- Drag-to-scroll on the thumb
- Click-to-scroll on the track
- Auto-hides when content fits
- Syncs with native scroll events
- Responsive to content size changes

## Accessibility

- Native scroll behavior is preserved
- Keyboard navigation works as expected
- Touch scrolling works on mobile devices
