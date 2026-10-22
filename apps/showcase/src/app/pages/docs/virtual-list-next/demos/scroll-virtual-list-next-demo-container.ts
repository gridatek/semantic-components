import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ScrollVirtualListNextDemo } from './scroll-virtual-list-next-demo';

@Component({
  selector: 'app-scroll-virtual-list-next-demo-container',
  imports: [DemoContainer, ScrollVirtualListNextDemo],
  template: `
    <app-demo-container
      title="Scroll to"
      [code]="code"
      demoUrl="/demos/virtual-list-next/scroll-virtual-list-next-demo"
    >
      <app-scroll-virtual-list-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrollVirtualListNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import {
  ScVirtualListNext,
  ScVirtualListNextRow,
} from '@semantic-components/ui-lab';

/** scrollToIndex(index, with an alignment): row 5,000 at the start, the centre, the end — or, auto, only as far as needed. */
@Component({
  selector: 'app-scroll-virtual-list-next-demo',
  imports: [ScVirtualListNext, ScVirtualListNextRow, ScButton],
  template: \`
    <div class="flex flex-wrap justify-center gap-2">
      @for (align of aligns; track align) {
        <button
          scButton
          variant="outline"
          size="sm"
          (click)="list.scrollToIndex(4999, { align })"
        >
          Row 5,000: {{ align }}
        </button>
      }
      <button
        scButton
        variant="outline"
        size="sm"
        (click)="list.scrollToIndex(0, { align: 'start' })"
      >
        Back to the top
      </button>
    </div>
    <ul
      scVirtualListNext
      #list="scVirtualListNext"
      tabindex="0"
      [count]="10_000"
      [estimate]="40"
      aria-label="Numbers"
      class="h-80 w-full max-w-md overflow-y-auto rounded-lg border"
    >
      @for (row of list.rows(); track row.key) {
        <li
          [scVirtualListNextRow]="row"
          class="border-b px-4 py-2 text-sm"
          [class.bg-accent]="row.index === 4999"
        >
          Row {{ row.index + 1 }}
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
export class ScrollVirtualListNextDemo {
  readonly aligns = ['start', 'center', 'end', 'auto'] as const;
}`;
}
