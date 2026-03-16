# Masonry Grid

A composable set of directives for Pinterest-style masonry layouts with varying item heights.

## Usage

```html
<div scMasonryGrid [columns]="4" [gap]="16">
  @for (item of items; track item.id) {
  <div scMasonryItem>
    <div class="rounded-lg border p-4">
      <!-- Your content -->
    </div>
  </div>
  }
</div>
```

## Directives

### ScMasonryGrid

Root directive that manages layout state and responsive column calculation. Provides `SC_MASONRY_GRID` injection token.

**Selector:** `[scMasonryGrid]`
**Export As:** `scMasonryGrid`

**Inputs:**

| Input         | Type                      | Default               | Description                 |
| ------------- | ------------------------- | --------------------- | --------------------------- |
| `columns`     | `number`                  | `4`                   | Default number of columns   |
| `gap`         | `number`                  | `16`                  | Gap between items in pixels |
| `breakpoints` | `MasonryBreakpoint[]`     | `DEFAULT_BREAKPOINTS` | Responsive breakpoints      |
| `layoutMode`  | `'columns' \| 'absolute'` | `'columns'`           | Layout algorithm to use     |
| `class`       | `string`                  | `''`                  | Additional CSS classes      |

**Exposed via `exportAs`:**

| Property         | Type                       | Description              |
| ---------------- | -------------------------- | ------------------------ |
| `currentColumns` | `Signal<number>`           | Computed current columns |
| `items`          | `Signal<MasonryItemRef[]>` | Content-projected items  |

**Methods:**

| Method       | Description                             |
| ------------ | --------------------------------------- |
| `relayout()` | Manually trigger a layout recalculation |

### ScMasonryItem

Item wrapper directive. Applies `break-inside-avoid` and vertical gap via injection.

**Selector:** `[scMasonryItem]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

**Outputs:**

| Output       | Type                | Description                    |
| ------------ | ------------------- | ------------------------------ |
| `sizeChange` | `{ width, height }` | Emitted when item size changes |

**Methods:**

| Method         | Returns       | Description                |
| -------------- | ------------- | -------------------------- |
| `getElement()` | `HTMLElement` | Get the native DOM element |
| `getHeight()`  | `number`      | Get the element's height   |

## Types

```typescript
interface MasonryBreakpoint {
  minWidth: number;
  columns: number;
}

interface MasonryConfig {
  columns?: number;
  gap?: number;
  breakpoints?: MasonryBreakpoint[];
}

type MasonryLayoutMode = 'columns' | 'absolute';
```

## Examples

### Image Gallery

```html
<div scMasonryGrid [columns]="3" [gap]="12">
  @for (image of images; track image.id) {
  <div scMasonryItem>
    <img [src]="image.url" [alt]="image.title" class="w-full rounded-lg" loading="lazy" />
  </div>
  }
</div>
```

### Custom Breakpoints

```html
<div
  scMasonryGrid
  [columns]="4"
  [gap]="16"
  [breakpoints]="[
    { minWidth: 0, columns: 1 },
    { minWidth: 640, columns: 2 },
    { minWidth: 1024, columns: 4 }
  ]"
>
  @for (item of items; track item.id) {
  <div scMasonryItem>
    <!-- content -->
  </div>
  }
</div>
```

### Absolute Positioning Mode

```html
<div scMasonryGrid [columns]="3" [gap]="16" layoutMode="absolute">
  @for (item of items; track item.id) {
  <div scMasonryItem>
    <!-- content -->
  </div>
  }
</div>
```

### Programmatic Relayout

```typescript
readonly masonryGrid = viewChild(ScMasonryGrid);

onContentChange(): void {
  this.masonryGrid()?.relayout();
}
```

## Layout Modes

### columns (default)

Uses CSS `column-count` for layout.

- **Pros**: Native browser layout, no JavaScript calculations
- **Cons**: Items flow top-to-bottom then left-to-right
- **Best for**: Most use cases, image galleries, card layouts

### absolute

Uses JavaScript-calculated absolute positioning.

- **Pros**: Items placed in shortest column first, better space utilization
- **Cons**: Requires JavaScript calculations, may need manual relayout
- **Best for**: When precise shortest-column placement is required

## Default Breakpoints

```typescript
const DEFAULT_BREAKPOINTS: MasonryBreakpoint[] = [
  { minWidth: 0, columns: 1 },
  { minWidth: 640, columns: 2 },
  { minWidth: 768, columns: 3 },
  { minWidth: 1024, columns: 4 },
  { minWidth: 1280, columns: 5 },
];
```

## Features

- CSS Columns and absolute positioning layout modes
- Responsive breakpoints with configurable columns
- Automatic gap management via injection
- ResizeObserver for container size changes
- Fully composable directive-based API
