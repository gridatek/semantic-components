import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScInfiniteScroll } from '@semantic-components/ui-lab';

interface Item {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-basic-infinite-scroll-demo',
  imports: [ScInfiniteScroll],
  template: `
    <sc-infinite-scroll
      class="h-[400px] border rounded-lg"
      [loading]="loading()"
      [hasReachedEnd]="reachedEnd()"
      (loadMore)="loadMore()"
    >
      <div class="p-4 space-y-2">
        @for (item of items(); track item.id) {
          <div class="p-4 border rounded-lg">
            <h4 class="font-medium">{{ item.title }}</h4>
            <p class="text-sm text-muted-foreground">
              {{ item.description }}
            </p>
          </div>
        }
      </div>
    </sc-infinite-scroll>
    <p class="text-sm text-muted-foreground mt-4">
      Loaded {{ items().length }} items
    </p>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInfiniteScrollDemo {
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
      if (currentLength >= 50) {
        this.reachedEnd.set(true);
      } else {
        this.items.update((items) => [
          ...items,
          ...this.generateItems(currentLength, 10),
        ]);
      }
      this.loading.set(false);
    }, 1000);
  }
}
