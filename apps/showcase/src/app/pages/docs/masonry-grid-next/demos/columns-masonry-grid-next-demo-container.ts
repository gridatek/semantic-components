import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ColumnsMasonryGridNextDemo } from './columns-masonry-grid-next-demo';

@Component({
  selector: 'app-columns-masonry-grid-next-demo-container',
  imports: [DemoContainer, ColumnsMasonryGridNextDemo],
  template: `
    <app-demo-container
      title="Columns and gaps"
      [code]="code"
      demoUrl="/demos/masonry-grid-next/columns-masonry-grid-next-demo"
    >
      <app-columns-masonry-grid-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ColumnsMasonryGridNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScMasonryGridNext,
  ScMasonryGridNextItem,
} from '@semantic-components/ui';

/** maxColumns caps the count however wide; the gaps are your classes — wider across than down here (gap-x-6 gap-y-2). */
@Component({
  selector: 'app-columns-masonry-grid-next-demo',
  imports: [ScMasonryGridNext, ScMasonryGridNextItem, ScFrame],
  template: \`
    <ul
      scMasonryGridNext
      [columnWidth]="100"
      [maxColumns]="3"
      class="w-full gap-x-6 gap-y-2"
    >
      @for (height of heights; track $index) {
        <li
          scMasonryGridNextItem
          scFrame
          size="sm"
          class="bg-muted grid place-items-center text-xs font-medium"
          [style.height.px]="height"
        >
          {{ $index + 1 }}
        </li>
      }
    </ul>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ColumnsMasonryGridNextDemo {
  private readonly heights = [80, 50, 110, 60, 90, 40, 70, 100, 50];
}`;
}
