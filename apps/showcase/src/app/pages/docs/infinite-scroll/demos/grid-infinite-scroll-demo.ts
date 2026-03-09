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
  selector: 'app-grid-infinite-scroll-demo',
  imports: [
    ScInfiniteScroll,
    ScInfiniteScrollSentinel,
    ScInfiniteScrollLoader,
    ScInfiniteScrollEnd,
    SiLoaderCircleIcon,
  ],
  template: `
    <div
      scInfiniteScroll
      class="h-[400px] overflow-auto rounded-lg border"
      [loading]="loading()"
      [hasReachedEnd]="reachedEnd()"
      (loadMore)="loadMore()"
    >
      <div class="grid grid-cols-2 gap-4 p-4">
        @for (item of items(); track item.id) {
          <div class="bg-muted/50 rounded-lg border p-4">
            <div class="bg-muted mb-2 aspect-video rounded"></div>
            <h4 class="text-sm font-medium">{{ item.title }}</h4>
            <p class="text-muted-foreground text-xs">
              {{ item.description }}
            </p>
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
export class GridInfiniteScrollDemo {
  readonly items = signal<Item[]>(this.generateItems(0, 8));
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
      if (currentLength >= 24) {
        this.reachedEnd.set(true);
      } else {
        this.items.update((items) => [
          ...items,
          ...this.generateItems(currentLength, 4),
        ]);
      }
      this.loading.set(false);
    }, 1000);
  }
}
