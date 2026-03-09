# Infinite Scroll

Automatically load more content as the user scrolls to the bottom of a container.

## Components

- `ScInfiniteScroll` - Root directive with scroll detection (via IntersectionObserver)
- `ScInfiniteScrollSentinel` - Sentinel directive that triggers load detection
- `ScInfiniteScrollLoader` - Marker directive for loading indicator
- `ScInfiniteScrollEnd` - Marker directive for end message

## Usage

```html
<div scInfiniteScroll class="h-[400px] overflow-auto rounded-lg border" [loading]="loading()" [hasReachedEnd]="reachedEnd()" (loadMore)="loadMore()">
  <div class="space-y-2 p-4">
    @for (item of items(); track item.id) {
    <div class="rounded border p-4">{{ item.title }}</div>
    }
  </div>

  @if (loading()) {
  <div scInfiniteScrollLoader class="flex items-center justify-center gap-2 py-4">
    <svg siLoaderCircleIcon class="text-muted-foreground size-5 animate-spin"></svg>
    <span class="text-muted-foreground text-sm">Loading more...</span>
  </div>
  } @if (reachedEnd() && !loading()) {
  <div scInfiniteScrollEnd class="text-muted-foreground py-4 text-center text-sm">No more items to load</div>
  }

  <div scInfiniteScrollSentinel></div>
</div>
```

## API

### ScInfiniteScroll (Root Directive)

| Input           | Type      | Default | Description                               |
| --------------- | --------- | ------- | ----------------------------------------- |
| `threshold`     | `number`  | `100`   | Distance from bottom (px) to trigger load |
| `loading`       | `boolean` | `false` | Whether currently loading                 |
| `hasReachedEnd` | `boolean` | `false` | Whether all content is loaded             |
| `disabled`      | `boolean` | `false` | Disable scroll detection                  |

| Output     | Type   | Description                           |
| ---------- | ------ | ------------------------------------- |
| `loadMore` | `void` | Emitted when more content should load |

| Method             | Description                |
| ------------------ | -------------------------- |
| `scrollToTop()`    | Scroll container to top    |
| `scrollToBottom()` | Scroll container to bottom |

### ScInfiniteScrollSentinel

Sentinel element observed by `IntersectionObserver`. Place at the bottom of the scroll container for downward scrolling, or at the top for upward scrolling. Must always be present (not conditional).

```html
<div scInfiniteScrollSentinel></div>
```

### ScInfiniteScrollLoader

Marker directive for loading indicator. Consumer controls visibility with `@if`.

```html
@if (loading()) {
<div scInfiniteScrollLoader class="flex items-center justify-center gap-2 py-4">
  <!-- your loader content -->
</div>
}
```

### ScInfiniteScrollEnd

Marker directive for end-of-list message. Consumer controls visibility with `@if`.

```html
@if (reachedEnd() && !loading()) {
<div scInfiniteScrollEnd class="text-muted-foreground py-4 text-center text-sm">No more items to load</div>
}
```

## Examples

### Basic Usage

```typescript
@Component({
  imports: [ScInfiniteScroll, ScInfiniteScrollSentinel, ScInfiniteScrollLoader, ScInfiniteScrollEnd, SiLoaderCircleIcon],
  template: `
    <div scInfiniteScroll class="h-[400px] overflow-auto rounded-lg border" [loading]="loading()" [hasReachedEnd]="reachedEnd()" (loadMore)="loadMore()">
      <div class="space-y-2 p-4">
        @for (item of items(); track item.id) {
          <div class="rounded border p-4">{{ item.title }}</div>
        }
      </div>

      @if (loading()) {
        <div scInfiniteScrollLoader class="flex items-center justify-center gap-2 py-4">
          <svg siLoaderCircleIcon class="text-muted-foreground size-5 animate-spin"></svg>
          <span class="text-muted-foreground text-sm">Loading more...</span>
        </div>
      }

      @if (reachedEnd() && !loading()) {
        <div scInfiniteScrollEnd class="text-muted-foreground py-4 text-center text-sm">No more items to load</div>
      }

      <div scInfiniteScrollSentinel></div>
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

### Custom Loader

```html
@if (loading()) {
<div scInfiniteScrollLoader class="flex items-center justify-center gap-2 py-4">
  <div class="bg-primary size-2 animate-bounce rounded-full" style="animation-delay: 0ms"></div>
  <div class="bg-primary size-2 animate-bounce rounded-full" style="animation-delay: 150ms"></div>
  <div class="bg-primary size-2 animate-bounce rounded-full" style="animation-delay: 300ms"></div>
</div>
}
```

### Custom Threshold

Load content earlier by increasing the threshold:

```html
<div scInfiniteScroll class="h-[300px] overflow-auto" [threshold]="200" [loading]="loading()" (loadMore)="loadMore()">
  <!-- content -->

  @if (loading()) {
  <div scInfiniteScrollLoader>...</div>
  }

  <div scInfiniteScrollSentinel></div>
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

  @if (loading()) {
  <div scInfiniteScrollLoader>...</div>
  } @if (reachedEnd() && !loading()) {
  <div scInfiniteScrollEnd>...</div>
  }

  <div scInfiniteScrollSentinel></div>
</div>
```

## Accessibility

- Announces loading state to screen readers
- Uses semantic HTML structure
- Keyboard accessible content
