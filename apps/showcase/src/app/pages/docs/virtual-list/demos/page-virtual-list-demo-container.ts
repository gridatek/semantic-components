import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PageVirtualListDemo } from './page-virtual-list-demo';

@Component({
  selector: 'app-page-virtual-list-demo-container',
  imports: [DemoContainer, PageVirtualListDemo],
  template: `
    <app-demo-container
      title="The page scrolls"
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
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScFrame } from '@semantic-components/ui';
import {
  ScVirtualList,
  ScVirtualListRow,
} from '@semantic-components/ui/virtual-list';

/** Without a size of its own it takes its full height, and the page — or the box around it — scrolls it. */
@Component({
  selector: 'app-page-virtual-list-demo',
  imports: [ScFrame, ScVirtualList, ScVirtualListRow],
  template: \`
    <ul
      scVirtualList
      #list="scVirtualList"
      [count]="entries.length"
      [estimate]="33"
      aria-label="Log"
      scFrame
      class="w-full max-w-md"
    >
      @for (row of list.rows(); track row.key) {
        <li
          [scVirtualListRow]="row"
          class="border-b px-4 py-2 font-mono text-xs"
        >
          {{ entries[row.index] }}
        </li>
      }
    </ul>
    <!-- Shown above the list (order-first) and stuck there; written after it: it reads the list. -->
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
  private readonly entries = Array.from(
    { length: 500 },
    (_, i) => 'Entry ' + (i + 1) + ': all good',
  );
}`;
}
