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
import { ScVirtualList, ScVirtualListRow } from '@semantic-components/ui-lab';

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
export class PageVirtualListDemo {
  readonly rows = Array.from(
    { length: 5_000 },
    (_, i) => 'Entry ' + (i + 1) + ': all good',
  );
}`;
}
