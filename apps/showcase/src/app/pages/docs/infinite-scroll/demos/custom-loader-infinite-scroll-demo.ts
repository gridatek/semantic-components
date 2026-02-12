import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScInfiniteScroll,
  ScInfiniteScrollLoader,
} from '@semantic-components/ui-lab';

interface Item {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-custom-loader-infinite-scroll-demo',
  imports: [ScInfiniteScroll, ScInfiniteScrollLoader],
  template: `
    <sc-infinite-scroll
      class="h-[300px] border rounded-lg"
      [loading]="loading()"
      [hasReachedEnd]="reachedEnd()"
      (loadMore)="loadMore()"
    >
      <div class="p-4 space-y-2">
        @for (item of items(); track item.id) {
          <div class="p-3 border rounded">
            {{ item.title }}
          </div>
        }
      </div>

      <div
        sc-infinite-scroll-loader
        class="flex items-center justify-center py-4 gap-2"
      >
        <div
          class="size-2 bg-primary rounded-full animate-bounce"
          style="animation-delay: 0ms"
        ></div>
        <div
          class="size-2 bg-primary rounded-full animate-bounce"
          style="animation-delay: 150ms"
        ></div>
        <div
          class="size-2 bg-primary rounded-full animate-bounce"
          style="animation-delay: 300ms"
        ></div>
      </div>
    </sc-infinite-scroll>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomLoaderInfiniteScrollDemo {
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
      if (currentLength >= 30) {
        this.reachedEnd.set(true);
      } else {
        this.items.update((items) => [
          ...items,
          ...this.generateItems(currentLength, 8),
        ]);
      }
      this.loading.set(false);
    }, 1500);
  }
}
