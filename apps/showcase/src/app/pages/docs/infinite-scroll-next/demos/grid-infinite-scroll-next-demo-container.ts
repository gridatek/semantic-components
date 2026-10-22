import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GridInfiniteScrollNextDemo } from './grid-infinite-scroll-next-demo';

@Component({
  selector: 'app-grid-infinite-scroll-next-demo-container',
  imports: [DemoContainer, GridInfiniteScrollNextDemo],
  template: `
    <app-demo-container
      title="Grid"
      [code]="code"
      demoUrl="/demos/infinite-scroll-next/grid-infinite-scroll-next-demo"
    >
      <app-grid-infinite-scroll-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GridInfiniteScrollNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScInfiniteScrollNext,
  ScInfiniteScrollNextStatus,
} from '@semantic-components/ui-lab';

interface Item {
  readonly id: number;
  readonly name: string;
}

/** Any layout: here a grid of products. The first page does not fill the box — it asks again, until the box is full or there is no more. */
@Component({
  selector: 'app-grid-infinite-scroll-next-demo',
  imports: [ScInfiniteScrollNext, ScInfiniteScrollNextStatus],
  template: \`
    <div
      class="h-96 w-full max-w-2xl overflow-y-auto rounded-lg border"
      tabindex="0"
      role="region"
      aria-label="Products"
    >
      <ul
        scInfiniteScrollNext
        class="grid grid-cols-2 gap-3 p-3 sm:grid-cols-3"
        [loading]="loading()"
        [done]="done()"
        (more)="load()"
      >
        @for (item of items(); track item.id) {
          <li
            class="bg-muted/50 grid aspect-square place-items-center rounded-lg text-sm font-medium"
          >
            {{ item.name }}
          </li>
        }
      </ul>
      <p scInfiniteScrollNextStatus class="pb-3">
        @if (loading()) {
          Loading…
        } @else if (done()) {
          All {{ items().length }} products.
        }
      </p>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class GridInfiniteScrollNextDemo {
  readonly items = signal<Item[]>([]);
  readonly loading = signal(false);
  readonly done = signal(false);

  async load(): Promise<void> {
    this.loading.set(true);
    const more = await this.fetch();
    this.items.update((items) => [...items, ...more]);
    this.done.set(this.items().length >= 36);
    this.loading.set(false);
  }

  /** A pretend server: 3 more after a moment, 36 in all. */
  private fetch(): Promise<Item[]> {
    const from = this.items().length;
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve(
            Array.from({ length: Math.min(3, 36 - from) }, (_, i) => ({
              id: from + i + 1,
              name: 'Product ' + (from + i + 1),
            })),
          ),
        600,
      ),
    );
  }
}`;
}
