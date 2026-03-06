import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GridInfiniteScrollDemo } from './grid-infinite-scroll-demo';

@Component({
  selector: 'app-grid-infinite-scroll-demo-container',
  imports: [DemoContainer, GridInfiniteScrollDemo],
  template: `
    <app-demo-container
      title="Card Grid Layout"
      demoUrl="/demos/infinite-scroll/grid-infinite-scroll-demo"
      [code]="code"
    >
      <app-grid-infinite-scroll-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridInfiniteScrollDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScInfiniteScroll } from '@semantic-components/ui-lab';

interface Item {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-grid-infinite-scroll-demo',
  imports: [ScInfiniteScroll],
  template: \`
    <sc-infinite-scroll
      class="h-[400px] rounded-lg border"
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
    </sc-infinite-scroll>
  \`,
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
      title: \`Item \${start + i + 1}\`,
      description: \`This is the description for item \${start + i + 1}\`,
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
}`;
}
