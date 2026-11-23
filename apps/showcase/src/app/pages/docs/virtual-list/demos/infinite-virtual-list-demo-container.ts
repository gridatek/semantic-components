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
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScFrame, ScInfiniteScroll } from '@semantic-components/ui';
import {
  ScVirtualList,
  ScVirtualListRow,
} from '@semantic-components/ui/virtual-list';

/** Long, and longer: the infinite scroll asks for 100 more near the end; the virtual list renders only what is seen. */
@Component({
  selector: 'app-infinite-virtual-list-demo',
  imports: [ScFrame, ScInfiniteScroll, ScVirtualList, ScVirtualListRow],
  template: \`
    <div
      scFrame
      class="h-96 w-full max-w-md overflow-y-auto"
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
          [estimate]="37"
          aria-label="Items"
        >
          @for (row of list.rows(); track row.key) {
            <li [scVirtualListRow]="row" class="border-b px-4 py-2 text-sm">
              {{ items()[row.index] }}
            </li>
          }
        </ul>
      </div>
      <p
        role="status"
        class="text-muted-foreground flex min-h-6 items-center justify-center py-2 text-sm"
      >
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
  private readonly items = signal<string[]>([]);
  private readonly loading = signal(false);

  private async load(): Promise<void> {
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
