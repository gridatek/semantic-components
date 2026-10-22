import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScInfiniteScroll,
  ScInfiniteScrollStatus,
  ScVirtualListNext,
  ScVirtualListNextRow,
} from '@semantic-components/ui-lab';

/** Long, and longer: the infinite scroll asks for 100 more near the end; the virtual list renders only what is seen. */
@Component({
  selector: 'app-infinite-virtual-list-next-demo',
  imports: [
    ScVirtualListNext,
    ScVirtualListNextRow,
    ScInfiniteScroll,
    ScInfiniteScrollStatus,
  ],
  template: `
    <div
      class="h-96 w-full max-w-md overflow-y-auto rounded-lg border"
      tabindex="0"
      role="region"
      aria-label="Feed"
    >
      <div
        scInfiniteScroll
        [loading]="loading()"
        [done]="items().length >= 1000"
        (more)="load()"
      >
        <ul
          scVirtualListNext
          #list="scVirtualListNext"
          [count]="items().length"
          [estimate]="40"
          aria-label="Items"
        >
          @for (row of list.rows(); track row.key) {
            <li [scVirtualListNextRow]="row" class="border-b px-4 py-2 text-sm">
              {{ items()[row.index] }}
            </li>
          }
        </ul>
      </div>
      <p scInfiniteScrollStatus class="py-2">
        @if (loading()) {
          Loading…
        } @else if (items().length >= 1000) {
          All {{ items().length }}.
        }
      </p>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="range">
      @if (list.range(); as range) {
        Rendered: {{ range.first + 1 }}–{{ range.last + 1 }} of
        {{ list.count() }}
      }
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class InfiniteVirtualListNextDemo {
  readonly items = signal<string[]>([]);
  readonly loading = signal(false);

  async load(): Promise<void> {
    this.loading.set(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    const from = this.items().length;
    this.items.update((items) => [
      ...items,
      ...Array.from({ length: 100 }, (_, i) => 'Item ' + (from + i + 1)),
    ]);
    this.loading.set(false);
  }
}
