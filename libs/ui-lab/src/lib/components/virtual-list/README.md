# Virtual List

A high-performance virtualized list component that efficiently renders large datasets by only rendering visible items.

## Installation

```typescript
import { ScVirtualList } from '@/ui/virtual-list';
import type { VirtualListItem, VirtualListRange } from '@/ui/virtual-list';
```

## Usage

### Basic Usage

```html
<sc-virtual-list [items]="items" [itemHeight]="48" [height]="400">
  <ng-template let-item let-index="index">
    <div class="p-3 border-b">{{ index }}: {{ item }}</div>
  </ng-template>
</sc-virtual-list>
```

```typescript
items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
```

### Custom Item Template

```html
<sc-virtual-list [items]="users" [itemHeight]="64">
  <ng-template let-user let-index="index">
    <div class="flex items-center gap-3 p-3 border-b">
      <img [src]="user.avatar" class="w-10 h-10 rounded-full" />
      <div>
        <div class="font-medium">{{ user.name }}</div>
        <div class="text-sm text-muted-foreground">{{ user.email }}</div>
      </div>
    </div>
  </ng-template>
</sc-virtual-list>
```

### With Custom Track Function

```html
<sc-virtual-list [items]="items" [trackByFn]="trackById">
  <ng-template let-item>{{ item.name }}</ng-template>
</sc-virtual-list>
```

```typescript
trackById = (index: number, item: User) => item.id;
```

### Listening to Range Changes

```html
<sc-virtual-list [items]="items" (rangeChange)="onRangeChange($event)">
  <ng-template let-item>{{ item }}</ng-template>
</sc-virtual-list>
```

```typescript
onRangeChange(range: VirtualListRange) {
  console.log('Visible range:', range.start, '-', range.end);
}
```

## API Reference

### Inputs

| Input        | Type                                  | Default    | Description                       |
| ------------ | ------------------------------------- | ---------- | --------------------------------- |
| `items`      | `T[]`                                 | `[]`       | Array of items to render          |
| `itemHeight` | `number`                              | `48`       | Fixed height of each item in px   |
| `overscan`   | `number`                              | `3`        | Extra items to render above/below |
| `height`     | `string \| number`                    | `'400px'`  | Container height                  |
| `class`      | `string`                              | `''`       | Additional CSS classes            |
| `trackByFn`  | `(index: number, item: T) => unknown` | `(i) => i` | Track function for items          |

### Outputs

| Output        | Type               | Description                        |
| ------------- | ------------------ | ---------------------------------- |
| `rangeChange` | `VirtualListRange` | Emitted when visible range changes |

### Methods

| Method                                    | Description                   |
| ----------------------------------------- | ----------------------------- |
| `scrollToIndex(index: number, behavior?)` | Scroll to specific item index |
| `scrollToTop(behavior?)`                  | Scroll to top of list         |
| `scrollToBottom(behavior?)`               | Scroll to bottom of list      |

## Type Definitions

```typescript
interface VirtualListRange {
  start: number;
  end: number;
}

interface VirtualListItem<T = unknown> {
  index: number;
  data: T;
}
```

## Features

- Efficient virtualization for large datasets
- Fixed-height item rendering
- Configurable overscan for smoother scrolling
- Custom item templates via ng-template
- Custom track function support
- Programmatic scroll methods
- Range change events for infinite loading
- Smooth scroll behavior support
