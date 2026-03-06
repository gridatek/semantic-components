import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicInfiniteScrollDemo } from './basic-infinite-scroll-demo';

@Component({
  selector: 'app-basic-infinite-scroll-demo-container',
  imports: [DemoContainer, BasicInfiniteScrollDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/infinite-scroll/basic-infinite-scroll-demo"
      [code]="code"
    >
      <app-basic-infinite-scroll-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInfiniteScrollDemoContainer {
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
  selector: 'app-basic-infinite-scroll-demo',
  imports: [ScInfiniteScroll],
  template: \`
    <sc-infinite-scroll
      class="h-[400px] rounded-lg border"
      [loading]="loading()"
      [hasReachedEnd]="reachedEnd()"
      (loadMore)="loadMore()"
    >
      <div class="space-y-2 p-4">
        @for (item of items(); track item.id) {
          <div class="rounded-lg border p-4">
            <h4 class="font-medium">{{ item.title }}</h4>
            <p class="text-muted-foreground text-sm">
              {{ item.description }}
            </p>
          </div>
        }
      </div>
    </sc-infinite-scroll>
    <p class="text-muted-foreground mt-4 text-sm">
      Loaded {{ items().length }} items
    </p>
  \`,
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
      title: \`Item \${start + i + 1}\`,
      description: \`This is the description for item \${start + i + 1}\`,
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
}`;
}
