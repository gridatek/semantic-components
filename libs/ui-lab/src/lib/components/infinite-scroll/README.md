# Infinite Scroll

Automatically load more content as the user scrolls to the bottom of a container.

## Components

- `ScInfiniteScroll` - Main container with scroll detection
- `ScInfiniteScrollLoader` - Custom loading indicator slot
- `ScInfiniteScrollEnd` - Custom end message slot

## Usage

```html
<sc-infinite-scroll class="h-[400px] border rounded-lg" [loading]="loading()" [hasReachedEnd]="reachedEnd()" (loadMore)="loadMore()">
  <div class="p-4 space-y-2">
    @for (item of items(); track item.id) {
    <div class="p-4 border rounded">{{ item.title }}</div>
    }
  </div>
</sc-infinite-scroll>
```

## API

### ScInfiniteScroll

| Input           | Type      | Default                   | Description                               |
| --------------- | --------- | ------------------------- | ----------------------------------------- |
| `threshold`     | `number`  | `100`                     | Distance from bottom (px) to trigger load |
| `loading`       | `boolean` | `false`                   | Whether currently loading                 |
| `hasReachedEnd` | `boolean` | `false`                   | Whether all content is loaded             |
| `endMessage`    | `string`  | `"No more items to load"` | Message shown at end                      |
| `class`         | `string`  | -                         | Additional CSS classes                    |

| Output     | Type   | Description                           |
| ---------- | ------ | ------------------------------------- |
| `loadMore` | `void` | Emitted when more content should load |

### ScInfiniteScrollLoader

Custom loading indicator. Place inside `ScInfiniteScroll`.

```html
<sc-infinite-scroll [loading]="loading()" (loadMore)="load()">
  <!-- content -->

  <div sc-infinite-scroll-loader class="flex items-center gap-2 py-4">
    <div class="size-2 bg-primary rounded-full animate-bounce"></div>
    <div class="size-2 bg-primary rounded-full animate-bounce"></div>
    <div class="size-2 bg-primary rounded-full animate-bounce"></div>
  </div>
</sc-infinite-scroll>
```

### ScInfiniteScrollEnd

Custom end message. Place inside `ScInfiniteScroll`.

```html
<sc-infinite-scroll [hasReachedEnd]="reachedEnd()" (loadMore)="load()">
  <!-- content -->

  <div sc-infinite-scroll-end class="py-4 text-center">You've reached the end!</div>
</sc-infinite-scroll>
```

## Examples

### Basic Usage

```typescript
@Component({
  template: `
    <sc-infinite-scroll class="h-[400px] border rounded-lg" [loading]="loading()" [hasReachedEnd]="reachedEnd()" (loadMore)="loadMore()">
      <div class="p-4 space-y-2">
        @for (item of items(); track item.id) {
          <div class="p-4 border rounded">{{ item.title }}</div>
        }
      </div>
    </sc-infinite-scroll>
  `,
})
export class MyComponent {
  readonly items = signal<Item[]>([]);
  readonly loading = signal(false);
  readonly reachedEnd = signal(false);

  loadMore(): void {
    if (this.loading() || this.reachedEnd()) return;
    this.loading.set(true);

    // Simulate API call
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
<sc-infinite-scroll [threshold]="200" [loading]="loading()" (loadMore)="loadMore()">
  <!-- content -->
</sc-infinite-scroll>
```

### Grid Layout

Works with any content layout:

```html
<sc-infinite-scroll [loading]="loading()" (loadMore)="loadMore()">
  <div class="grid grid-cols-3 gap-4 p-4">
    @for (item of items(); track item.id) {
    <div class="p-4 border rounded bg-muted/50">{{ item.title }}</div>
    }
  </div>
</sc-infinite-scroll>
```

## Accessibility

- Announces loading state to screen readers
- Uses semantic HTML structure
- Keyboard accessible content
