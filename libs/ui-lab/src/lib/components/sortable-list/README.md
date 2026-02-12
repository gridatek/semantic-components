# Sortable List

A drag and drop list component for reordering items.

## Usage

```html
<div sc-sortable-list [(items)]="items" class="gap-2">
  @for (item of items(); track item; let i = $index) {
  <div sc-sortable-item [index]="i" [item]="item" class="p-3 border rounded-md">{{ item }}</div>
  }
</div>
```

## Components

### ScSortableList

Root container that manages sortable state.

**Selector:** `[sc-sortable-list]`

**Inputs:**

| Input         | Type                         | Default      | Description          |
| ------------- | ---------------------------- | ------------ | -------------------- |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | List direction       |
| `disabled`    | `boolean`                    | `false`      | Disable reordering   |
| `handleOnly`  | `boolean`                    | `false`      | Only drag via handle |
| `class`       | `string`                     | `''`         | Additional CSS       |

**Two-way Bindings:**

| Binding | Type  | Default | Description    |
| ------- | ----- | ------- | -------------- |
| `items` | `T[]` | `[]`    | Array of items |

**Outputs:**

| Output       | Type               | Description        |
| ------------ | ------------------ | ------------------ |
| `sortChange` | `SortableEvent<T>` | Item was reordered |
| `sortStart`  | `{ item, index }`  | Drag started       |
| `sortEnd`    | `SortableEvent<T>` | Drag ended         |

**Methods:**

| Method               | Description                 |
| -------------------- | --------------------------- |
| `moveItem(from, to)` | Move item programmatically  |
| `moveUp(index)`      | Move item up one position   |
| `moveDown(index)`    | Move item down one position |

### ScSortableItem

Individual draggable item.

**Selector:** `[sc-sortable-item]`

**Inputs:**

| Input   | Type     | Required | Description    |
| ------- | -------- | -------- | -------------- |
| `index` | `number` | Yes      | Item index     |
| `item`  | `T`      | Yes      | Item data      |
| `class` | `string` | No       | Additional CSS |

**Data Attributes:**

| Attribute        | Description                |
| ---------------- | -------------------------- |
| `data-dragging`  | Present when being dragged |
| `data-drag-over` | Present when drag target   |

### ScSortableHandle

Optional drag handle (use with `handleOnly`).

**Selector:** `[sc-sortable-handle]`

**Inputs:**

| Input   | Type     | Default | Description    |
| ------- | -------- | ------- | -------------- |
| `class` | `string` | `''`    | Additional CSS |

### ScSortableOverlay

Optional overlay during drag (prevents interaction with other elements).

**Selector:** `[sc-sortable-overlay]`

## Types

### SortableEvent<T>

```typescript
interface SortableEvent<T> {
  item: T;
  previousIndex: number;
  currentIndex: number;
}
```

## Examples

### Basic

```html
<div sc-sortable-list [(items)]="items" class="gap-2">
  @for (item of items(); track item; let i = $index) {
  <div sc-sortable-item [index]="i" [item]="item" class="p-3 border rounded-md">{{ item }}</div>
  }
</div>
```

### With Drag Handle

```html
<div sc-sortable-list [(items)]="items" [handleOnly]="true" class="gap-2">
  @for (item of items(); track item; let i = $index) {
  <div sc-sortable-item [index]="i" [item]="item" class="flex items-center gap-3 p-3 border">
    <span sc-sortable-handle></span>
    <span>{{ item }}</span>
  </div>
  }
</div>
```

### Horizontal Layout

```html
<div sc-sortable-list [(items)]="items" orientation="horizontal" class="gap-3">
  @for (item of items(); track item; let i = $index) {
  <div sc-sortable-item [index]="i" [item]="item" class="p-4 border rounded-md">{{ item }}</div>
  }
</div>
```

### Task List

```html
<div sc-sortable-list [(items)]="tasks" [handleOnly]="true" class="gap-1">
  <div sc-sortable-overlay></div>
  @for (task of tasks(); track task.id; let i = $index) {
  <div sc-sortable-item [index]="i" [item]="task" class="flex items-center gap-3 p-3 border">
    <span sc-sortable-handle></span>
    <input type="checkbox" [checked]="task.completed" />
    <span>{{ task.title }}</span>
  </div>
  }
</div>
```

### With Sort Events

```html
<div sc-sortable-list [(items)]="items" (sortStart)="onSortStart($event)" (sortChange)="onSortChange($event)" (sortEnd)="onSortEnd($event)">...</div>
```

```typescript
onSortChange(event: SortableEvent<Item>) {
  console.log(`Moved "${event.item}" from ${event.previousIndex} to ${event.currentIndex}`);
}
```

### Disabled

```html
<div sc-sortable-list [items]="items" [disabled]="true">
  @for (item of items; track item; let i = $index) {
  <div sc-sortable-item [index]="i" [item]="item" class="p-3 border opacity-60">{{ item }}</div>
  }
</div>
```

### Custom Handle Icon

```html
<span sc-sortable-handle>
  <svg class="size-5"><!-- custom icon --></svg>
</span>
```

### Playlist Example

```html
<div sc-sortable-list [(items)]="songs" [handleOnly]="true" class="divide-y">
  @for (song of songs(); track song.id; let i = $index) {
  <div sc-sortable-item [index]="i" [item]="song" class="flex items-center gap-4 p-3">
    <span sc-sortable-handle></span>
    <span class="text-muted-foreground">{{ i + 1 }}</span>
    <div class="flex-1">
      <p class="font-medium">{{ song.title }}</p>
      <p class="text-sm text-muted-foreground">{{ song.artist }}</p>
    </div>
    <span>{{ song.duration }}</span>
  </div>
  }
</div>
```

## Keyboard Navigation

| Key                        | Action                                |
| -------------------------- | ------------------------------------- |
| `ArrowUp` / `ArrowLeft`    | Move item up (based on orientation)   |
| `ArrowDown` / `ArrowRight` | Move item down (based on orientation) |
| `Tab`                      | Move focus between items              |

## Features

- **Drag and Drop**: Native HTML5 drag and drop
- **Keyboard Support**: Arrow keys to reorder when focused
- **Handle Mode**: Restrict dragging to handle element
- **Orientations**: Vertical or horizontal layouts
- **Visual Feedback**: Opacity and ring indicators during drag
- **Events**: Callbacks for sort start, change, and end
- **Overlay**: Optional overlay to prevent interaction during drag
- **Two-way Binding**: Sync with `[(items)]`
- **Generic Types**: Full TypeScript support

## Accessibility

- Focusable items with `tabindex`
- Keyboard reordering with arrow keys
- ARIA label on drag handle
- Visual focus indicators
- Disabled state support
