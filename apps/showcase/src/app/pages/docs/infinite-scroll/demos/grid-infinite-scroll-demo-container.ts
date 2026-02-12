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
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridInfiniteScrollDemoContainer {
  readonly code = `import {
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
  selector: 'app-grid-infinite-scroll-demo',
  imports: [ScInfiniteScroll],
  template: \`
    <sc-infinite-scroll
      class="h-[400px] border rounded-lg"
      [loading]="loading()"
      [hasReachedEnd]="reachedEnd()"
      (loadMore)="loadMore()"
    >
      <div class="p-4 grid grid-cols-2 gap-4">
        @for (item of items(); track item.id) {
          <div class="p-4 border rounded-lg bg-muted/50">
            <div class="aspect-video bg-muted rounded mb-2"></div>
            <h4 class="font-medium text-sm">{{ item.title }}</h4>
            <p class="text-xs text-muted-foreground">
              {{ item.description }}
            </p>
          </div>
        }
      </div>
    </sc-infinite-scroll>
  \`,
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
