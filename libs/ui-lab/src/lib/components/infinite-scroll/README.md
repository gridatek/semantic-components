# Infinite Scroll

Automatically load more content as the user scrolls to the bottom of a container.

## Components

- `ScInfiniteScroll` - Root directive with scroll detection (via IntersectionObserver)
- `ScInfiniteScrollLoader` - Loading indicator (default or custom content)
- `ScInfiniteScrollEnd` - End message (default or custom content)

## Usage

```html
<div scInfiniteScroll class="h-[400px] overflow-auto rounded-lg border" [loading]="loading()" [hasReachedEnd]="reachedEnd()" (loadMore)="loadMore()">
  <div class="space-y-2 p-4">
    @for (item of items(); track item.id) {
    <div class="rounded border p-4">{{ item.title }}</div>
    }
  </div>

  <div scInfiniteScrollLoader></div>
  <div scInfiniteScrollEnd></div>
</div>
```

## API

### ScInfiniteScroll (Root Directive)

| Input           | Type      | Default | Description                               |
| --------------- | --------- | ------- | ----------------------------------------- | -------------------------- |
| `threshold`     | `number`  | `100`   | Distance from bottom (px) to trigger load |
| `loading`       | `boolean` | `false` | Whether currently loading                 |
| `hasReachedEnd` | `boolean` | `false` | Whether all content is loaded             |
| `disabled`      | `boolean` | `false` | Disable scroll detection                  |
| `direction`     | `'down'   | 'up'`   | `'down'`                                  | Scroll direction to detect |

| Output     | Type   | Description                           |
| ---------- | ------ | ------------------------------------- |
| `loadMore` | `void` | Emitted when more content should load |

| Method             | Description                |
| ------------------ | -------------------------- |
| `scrollToTop()`    | Scroll container to top    |
| `scrollToBottom()` | Scroll container to bottom |

### ScInfiniteScrollLoader

Shows loading indicator when `loading()` is true. Uses default spinner or custom projected content.

```html
<!-- Default loader -->
<div scInfiniteScrollLoader></div>

<!-- Custom loader -->
<div scInfiniteScrollLoader>
  <div class="flex items-center gap-2 py-4">
    <div class="bg-primary size-2 animate-bounce rounded-full"></div>
    <div class="bg-primary size-2 animate-bounce rounded-full"></div>
    <div class="bg-primary size-2 animate-bounce rounded-full"></div>
  </div>
</div>
```

### ScInfiniteScrollEnd

Shows end message when `hasReachedEnd()` is true and `loading()` is false.

| Input     | Type     | Default                   | Description         |
| --------- | -------- | ------------------------- | ------------------- |
| `message` | `string` | `"No more items to load"` | Default end message |

```html
<!-- Default message -->
<div scInfiniteScrollEnd></div>

<!-- Custom message -->
<div scInfiniteScrollEnd message="You've reached the end!"></div>

<!-- Fully custom content -->
<div scInfiniteScrollEnd>
  <p class="py-4 text-center">All items loaded</p>
</div>
```

## Examples

### Basic Usage

```typescript
@Component({
  imports: [ScInfiniteScroll, ScInfiniteScrollLoader, ScInfiniteScrollEnd],
  template: `
    <div scInfiniteScroll class="h-[400px] overflow-auto rounded-lg border" [loading]="loading()" [hasReachedEnd]="reachedEnd()" (loadMore)="loadMore()">
      <div class="space-y-2 p-4">
        @for (item of items(); track item.id) {
          <div class="rounded border p-4">{{ item.title }}</div>
        }
      </div>

      <div scInfiniteScrollLoader></div>
      <div scInfiniteScrollEnd></div>
    </div>
  `,
})
export class MyComponent {
  readonly items = signal<Item[]>([]);
  readonly loading = signal(false);
  readonly reachedEnd = signal(false);

  loadMore(): void {
    if (this.loading() || this.reachedEnd()) return;
    this.loading.set(true);

    setTimeout(() => {
      const newItems = this.fetchItems();
      this.items.update((items) => [...items, ...newItems]);

      if (this.items().length >= 100) {
        this.reachedEnd.set(true);
      }
      this.loading.set(false);
    }, 1000);
  }
}
```

### Custom Threshold

Load content earlier by increasing the threshold:

```html
<div scInfiniteScroll class="h-[300px] overflow-auto" [threshold]="200" [loading]="loading()" (loadMore)="loadMore()">
  <!-- content -->
  <div scInfiniteScrollLoader></div>
</div>
```

### Grid Layout

Works with any content layout:

```html
<div scInfiniteScroll class="h-[400px] overflow-auto" [loading]="loading()" (loadMore)="loadMore()">
  <div class="grid grid-cols-3 gap-4 p-4">
    @for (item of items(); track item.id) {
    <div class="bg-muted/50 rounded border p-4">{{ item.title }}</div>
    }
  </div>

  <div scInfiniteScrollLoader></div>
  <div scInfiniteScrollEnd></div>
</div>
```

## Accessibility

- Announces loading state to screen readers
- Uses semantic HTML structure
- Keyboard accessible content
