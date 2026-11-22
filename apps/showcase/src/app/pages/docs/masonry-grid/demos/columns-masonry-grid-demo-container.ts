import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ColumnsMasonryGridDemo } from './columns-masonry-grid-demo';

@Component({
  selector: 'app-columns-masonry-grid-demo-container',
  imports: [DemoContainer, ColumnsMasonryGridDemo],
  template: `
    <app-demo-container
      title="Columns and gaps"
      [code]="code"
      demoUrl="/demos/masonry-grid/columns-masonry-grid-demo"
    >
      <app-columns-masonry-grid-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ColumnsMasonryGridDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScMasonryGrid,
  ScMasonryGridItem,
} from '@semantic-components/ui';

/** maxColumns caps the count however wide; the gaps are your classes — wider across than down here (gap-x-6 gap-y-2). */
@Component({
  selector: 'app-columns-masonry-grid-demo',
  imports: [ScMasonryGrid, ScMasonryGridItem, ScFrame],
  template: \`
    <ul
      scMasonryGrid
      [columnWidth]="100"
      [maxColumns]="3"
      class="w-full gap-x-6 gap-y-2"
    >
      @for (height of heights; track $index) {
        <li
          scMasonryGridItem
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
export class ColumnsMasonryGridDemo {
  private readonly heights = [80, 50, 110, 60, 90, 40, 70, 100, 50];
}`;
}
