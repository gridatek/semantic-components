import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GridSortableListNextDemo } from './grid-sortable-list-next-demo';

@Component({
  selector: 'app-grid-sortable-list-next-demo-container',
  imports: [DemoContainer, GridSortableListNextDemo],
  template: `
    <app-demo-container
      title="Grid"
      [code]="code"
      demoUrl="/demos/sortable-list-next/grid-sortable-list-next-demo"
    >
      <app-grid-sortable-list-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GridSortableListNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScSortableListNext,
  type ScSortableListNextAnnouncement,
  ScSortableListNextItem,
} from '@semantic-components/ui-lab';

interface Item {
  readonly id: string;
  readonly label: string;
}

/** As a grid — photos: the place follows the reading order; ← → move a lifted item by one, ↑ ↓ by a row. */
@Component({
  selector: 'app-grid-sortable-list-next-demo',
  imports: [ScSortableListNext, ScSortableListNextItem],
  template: \`
    <p id="grid-sortable-help" class="sr-only">
      Space lifts an item, ← → ↑ ↓ move it, Space drops it, Escape puts it back.
    </p>
    <ul
      scSortableListNext
      #list="scSortableListNext"
      orientation="grid"
      [(value)]="items"
      [announce]="announce"
      aria-label="Album"
      class="w-full max-w-lg grid-cols-3 sm:grid-cols-4"
    >
      @for (item of list.items(); track item.id) {
        <li
          [scSortableListNextItem]="item"
          aria-describedby="grid-sortable-help"
          class="overflow-hidden"
        >
          <img
            [src]="'/images/gallery/' + item.id + '-thumb.jpg'"
            [alt]="item.label"
            class="pointer-events-none aspect-square w-full object-cover"
            draggable="false"
          />
        </li>
      }
    </ul>
    <p class="text-muted-foreground text-sm" data-testid="grid-order">
      {{ joined() }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class GridSortableListNextDemo {
  readonly items = signal<Item[]>([
    { id: 'cafe', label: 'Café' },
    { id: 'coast', label: 'Coast' },
    { id: 'forest', label: 'Forest' },
    { id: 'gorge', label: 'Gorge' },
    { id: 'mountains', label: 'Mountains' },
    { id: 'shed', label: 'Shed' },
    { id: 'summit', label: 'Summit' },
    { id: 'waterfall', label: 'Waterfall' },
  ]);
  readonly joined = computed(() =>
    this.items()
      .map((item) => item.label)
      .join(', '),
  );
  /** What a keyboard move says, step by step. */
  readonly announce = ({
    type,
    item,
    position,
    count,
  }: ScSortableListNextAnnouncement<Item>) =>
    ({
      lift: \`Lifted \${item.label}, \${position} of \${count}.\`,
      move: \`\${item.label}: \${position} of \${count}.\`,
      drop: \`Dropped \${item.label} at \${position} of \${count}.\`,
      cancel: \`\${item.label} back at \${position} of \${count}.\`,
    })[type];
}`;
}
