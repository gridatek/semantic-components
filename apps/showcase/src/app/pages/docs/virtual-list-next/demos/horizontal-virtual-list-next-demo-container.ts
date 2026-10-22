import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HorizontalVirtualListNextDemo } from './horizontal-virtual-list-next-demo';

@Component({
  selector: 'app-horizontal-virtual-list-next-demo-container',
  imports: [DemoContainer, HorizontalVirtualListNextDemo],
  template: `
    <app-demo-container
      title="Horizontal"
      [code]="code"
      demoUrl="/demos/virtual-list-next/horizontal-virtual-list-next-demo"
    >
      <app-horizontal-virtual-list-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HorizontalVirtualListNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScVirtualListNext,
  ScVirtualListNextRow,
} from '@semantic-components/ui-lab';

/** Along a row: days of a year, as a strip. Right to left, it starts at the right. */
@Component({
  selector: 'app-horizontal-virtual-list-next-demo',
  imports: [ScVirtualListNext, ScVirtualListNextRow],
  template: \`
    <ul
      scVirtualListNext
      #list="scVirtualListNext"
      tabindex="0"
      orientation="horizontal"
      [count]="days.length"
      [estimate]="96"
      [gap]="8"
      aria-label="Days"
      class="h-28 w-full max-w-2xl overflow-x-auto rounded-lg border"
    >
      @for (row of list.rows(); track row.key) {
        <li [scVirtualListNextRow]="row" class="py-2">
          <div
            class="bg-muted grid h-full w-24 place-content-center rounded-lg text-center text-sm"
          >
            <span class="text-muted-foreground text-xs">Day</span>
            <span class="text-lg font-semibold">{{ days[row.index] }}</span>
          </div>
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
export class HorizontalVirtualListNextDemo {
  readonly days = Array.from({ length: 365 }, (_, i) => i + 1);
}`;
}
