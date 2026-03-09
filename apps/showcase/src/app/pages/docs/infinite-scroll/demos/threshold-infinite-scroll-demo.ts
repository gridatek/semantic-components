import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScInfiniteScroll,
  ScInfiniteScrollEnd,
  ScInfiniteScrollLoader,
  ScInfiniteScrollSentinel,
} from '@semantic-components/ui-lab';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

interface Item {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-threshold-infinite-scroll-demo',
  imports: [
    ScInfiniteScroll,
    ScInfiniteScrollSentinel,
    ScInfiniteScrollLoader,
    ScInfiniteScrollEnd,
    SiLoaderCircleIcon,
  ],
  template: `
    <p class="text-muted-foreground mb-4 text-sm">
      Load more items when within 200px of the bottom (loads earlier).
    </p>
    <div
      scInfiniteScroll
      class="h-[300px] overflow-auto rounded-lg border"
      [loading]="loading()"
      [hasReachedEnd]="reachedEnd()"
      [threshold]="200"
      (loadMore)="loadMore()"
    >
      <div class="space-y-2 p-4">
        @for (item of items(); track item.id) {
          <div class="rounded border p-3">
            {{ item.title }}
          </div>
        }
      </div>

      @if (loading()) {
        <div
          scInfiniteScrollLoader
          class="flex items-center justify-center gap-2 py-4"
        >
          <svg
            siLoaderCircleIcon
            class="text-muted-foreground size-5 animate-spin"
          ></svg>
          <span class="text-muted-foreground text-sm">Loading more...</span>
        </div>
      }

      @if (reachedEnd() && !loading()) {
        <div
          scInfiniteScrollEnd
          class="text-muted-foreground py-4 text-center text-sm"
        >
          No more items to load
        </div>
      }

      <div scInfiniteScrollSentinel></div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThresholdInfiniteScrollDemo {
  readonly items = signal<Item[]>(this.generateItems(0, 10));
  readonly loading = signal(false);
  readonly reachedEnd = signal(false);

  private generateItems(start: number, count: number): Item[] {
    return Array.from({ length: count }, (_, i) => ({
      id: start + i + 1,
      title: `Item ${start + i + 1}`,
      description: `This is the description for item ${start + i + 1}`,
    }));
  }

  loadMore(): void {
    if (this.loading() || this.reachedEnd()) return;
    this.loading.set(true);

    setTimeout(() => {
      const currentLength = this.items().length;
      if (currentLength >= 40) {
        this.reachedEnd.set(true);
      } else {
        this.items.update((items) => [
          ...items,
          ...this.generateItems(currentLength, 10),
        ]);
      }
      this.loading.set(false);
    }, 500);
  }
}
