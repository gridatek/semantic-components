import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PageVirtualListDemo } from './page-virtual-list-demo';

@Component({
  selector: 'app-page-virtual-list-demo-container',
  imports: [DemoContainer, PageVirtualListDemo],
  template: `
    <app-demo-container
      title="Page scroll"
      [code]="code"
      demoUrl="/demos/virtual-list/page-virtual-list-demo"
    >
      <app-page-virtual-list-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PageVirtualListDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScVirtualList, ScVirtualListRow } from '@semantic-components/ui';

/** Without a size of its own, it takes its full height, and the page — or the box around it — scrolls. */
@Component({
  selector: 'app-page-virtual-list-demo',
  imports: [ScVirtualList, ScVirtualListRow],
  template: \`
    <ul
      scVirtualList
      #list="scVirtualList"
      [count]="rows.length"
      [estimate]="40"
      aria-label="Log"
      class="w-full max-w-md rounded-lg border"
    >
      @for (row of list.rows(); track row.key) {
        <li
          [scVirtualListRow]="row"
          class="border-b px-4 py-2 font-mono text-xs"
        >
          {{ rows[row.index] }}
        </li>
      }
    </ul>
    <!-- Shown above the list (order-first) and stuck there, so the range
      follows the scroll — written after it: it reads the list's inputs. -->
    <p
      class="text-muted-foreground bg-background sticky top-14 z-10 order-first w-full max-w-md py-1 text-center text-sm"
      data-testid="range"
    >
      @if (list.range(); as range) {
        Rendered: {{ range.first + 1 }}–{{ range.last + 1 }} of
        {{ list.count() }}
      }
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class PageVirtualListDemo {
  readonly rows = Array.from(
    { length: 500 },
    (_, i) => 'Entry ' + (i + 1) + ': all good',
  );
}`;
}
