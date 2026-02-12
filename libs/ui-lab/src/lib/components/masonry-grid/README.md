# Masonry Grid

A Pinterest-style layout component that arranges items in columns with varying heights.

## Installation

Import the components from the masonry-grid module:

```typescript
import { ScMasonryGrid, ScMasonryItem } from '@/ui/masonry-grid';
```

## Usage

### Basic Usage

```html
<sc-masonry-grid [columns]="4" [gap]="16">
  @for (item of items; track item.id) {
  <sc-masonry-item>
    <div class="card">
      <!-- Your content -->
    </div>
  </sc-masonry-item>
  }
</sc-masonry-grid>
```

### Image Gallery

```html
<sc-masonry-grid [columns]="3" [gap]="12">
  @for (image of images; track image.id) {
  <sc-masonry-item>
    <img [src]="image.url" [alt]="image.title" class="w-full rounded-lg" />
  </sc-masonry-item>
  }
</sc-masonry-grid>
```

### Custom Breakpoints

```html
<sc-masonry-grid
  [columns]="4"
  [gap]="16"
  [breakpoints]="[
    { minWidth: 0, columns: 1 },
    { minWidth: 640, columns: 2 },
    { minWidth: 1024, columns: 4 }
  ]"
>
  <!-- items -->
</sc-masonry-grid>
```

### Absolute Positioning Mode

```html
<sc-masonry-grid [columns]="3" [gap]="16" layoutMode="absolute">
  <!-- items -->
</sc-masonry-grid>
```

### Programmatic Relayout

```typescript
import { viewChild } from '@angular/core';
import { ScMasonryGrid } from '@/ui/masonry-grid';

readonly masonryGrid = viewChild(ScMasonryGrid);

onContentChange(): void {
  // Trigger manual relayout after content changes
  this.masonryGrid()?.relayout();
}
```

## API Reference

### ScMasonryGrid

The main container component for the masonry layout.

#### Inputs

| Input         | Type                      | Default               | Description                 |
| ------------- | ------------------------- | --------------------- | --------------------------- |
| `columns`     | `number`                  | `4`                   | Default number of columns   |
| `gap`         | `number`                  | `16`                  | Gap between items in pixels |
| `breakpoints` | `MasonryBreakpoint[]`     | `DEFAULT_BREAKPOINTS` | Responsive breakpoints      |
| `layoutMode`  | `'columns' \| 'absolute'` | `'columns'`           | Layout algorithm to use     |
| `class`       | `string`                  | `''`                  | Additional CSS classes      |

#### Public Methods

| Method       | Description                             |
| ------------ | --------------------------------------- |
| `relayout()` | Manually trigger a layout recalculation |

### ScMasonryItem

Wrapper component for each item in the grid.

#### Outputs

| Output       | Type                | Description                    |
| ------------ | ------------------- | ------------------------------ |
| `sizeChange` | `{ width, height }` | Emitted when item size changes |

#### Public Methods

| Method         | Returns       | Description                |
| -------------- | ------------- | -------------------------- |
| `getElement()` | `HTMLElement` | Get the native DOM element |
| `getHeight()`  | `number`      | Get the element's height   |

## Type Definitions

### MasonryBreakpoint

```typescript
interface MasonryBreakpoint {
  minWidth: number; // Minimum viewport width
  columns: number; // Number of columns at this breakpoint
}
```

### MasonryConfig

```typescript
interface MasonryConfig {
  columns?: number;
  gap?: number;
  breakpoints?: MasonryBreakpoint[];
}
```

### MasonryLayoutMode

```typescript
type MasonryLayoutMode = 'columns' | 'absolute';
```

## Default Breakpoints

```typescript
const DEFAULT_BREAKPOINTS: MasonryBreakpoint[] = [
  { minWidth: 0, columns: 1 }, // Mobile
  { minWidth: 640, columns: 2 }, // sm
  { minWidth: 768, columns: 3 }, // md
  { minWidth: 1024, columns: 4 }, // lg
  { minWidth: 1280, columns: 5 }, // xl
];
```

## Layout Modes

### columns (default)

Uses CSS `column-count` for layout. This is the most performant option:

- **Pros**: Native browser layout, no JavaScript calculations, smooth animations
- **Cons**: Items flow top-to-bottom then left-to-right (not shortest-column-first)
- **Best for**: Most use cases, image galleries, card layouts

### absolute

Uses JavaScript-calculated absolute positioning:

- **Pros**: Items placed in shortest column first, better space utilization
- **Cons**: Requires JavaScript calculations, may need manual relayout
- **Best for**: When precise shortest-column placement is required

## Features

- **CSS Columns Layout**: Uses native CSS columns for optimal performance
- **Responsive**: Configurable breakpoints for different screen sizes
- **Flexible Gap**: Customizable spacing between items
- **Dynamic Content**: Handles varying item heights automatically
- **Two Layout Modes**: CSS columns or absolute positioning
- **Manual Relayout**: Trigger recalculation when content changes
- **ResizeObserver**: Automatically responds to container size changes

## Styling

The component uses CSS columns for layout. Each item automatically:

- Breaks inside avoid (prevents items from splitting across columns)
- Has margin-bottom equal to the gap

Custom styling can be applied via the `class` input or by styling the content within `sc-masonry-item`.

## Performance Tips

1. **Use `columns` mode** (default) for best performance
2. **Add `loading="lazy"`** to images for better initial load
3. **Use `track` in `@for`** loops for efficient DOM updates
4. **Call `relayout()`** sparingly, only when necessary

## Browser Support

- CSS Columns: Supported in all modern browsers
- ResizeObserver: Supported in all modern browsers (polyfill available for older browsers)
