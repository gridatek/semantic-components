import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InfiniteVirtualListDemo } from './infinite-virtual-list-demo';

@Component({
  selector: 'app-infinite-virtual-list-demo-container',
  imports: [DemoContainer, InfiniteVirtualListDemo],
  template: `
    <app-demo-container
      title="With the infinite scroll"
      [code]="code"
      demoUrl="/demos/virtual-list/infinite-virtual-list-demo"
    >
      <app-infinite-virtual-list-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InfiniteVirtualListDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScInfiniteScroll,
  ScInfiniteScrollStatus,
  ScVirtualList,
  ScVirtualListRow,
} from '@semantic-components/ui';

/** Long, and longer: the infinite scroll asks for 100 more near the end; the virtual list renders only what is seen. */
@Component({
  selector: 'app-infinite-virtual-list-demo',
  imports: [
    ScVirtualList,
    ScVirtualListRow,
    ScInfiniteScroll,
    ScInfiniteScrollStatus,
  ],
  template: \`
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
          scVirtualList
          #list="scVirtualList"
          [count]="items().length"
          [estimate]="40"
          aria-label="Items"
        >
          @for (row of list.rows(); track row.key) {
            <li [scVirtualListRow]="row" class="border-b px-4 py-2 text-sm">
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
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class InfiniteVirtualListDemo {
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
}`;
}
