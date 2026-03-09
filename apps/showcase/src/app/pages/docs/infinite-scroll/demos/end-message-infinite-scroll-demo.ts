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
} from '@semantic-components/ui-lab';

interface Item {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-end-message-infinite-scroll-demo',
  imports: [ScInfiniteScroll, ScInfiniteScrollLoader, ScInfiniteScrollEnd],
  template: `
    <div
      scInfiniteScroll
      class="h-[300px] overflow-auto rounded-lg border"
      [loading]="loading()"
      [hasReachedEnd]="reachedEnd()"
      (loadMore)="loadMore()"
    >
      <div class="space-y-2 p-4">
        @for (item of items(); track item.id) {
          <div class="rounded border p-3">
            {{ item.title }}
          </div>
        }
      </div>

      <div scInfiniteScrollLoader></div>
      <div scInfiniteScrollEnd message="You've reached the end! 🎉"></div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EndMessageInfiniteScrollDemo {
  readonly items = signal<Item[]>(this.generateItems(0, 5));
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
      if (currentLength >= 15) {
        this.reachedEnd.set(true);
      } else {
        this.items.update((items) => [
          ...items,
          ...this.generateItems(currentLength, 5),
        ]);
      }
      this.loading.set(false);
    }, 800);
  }
}
