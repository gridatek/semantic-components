import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicSortableListNextDemo } from './basic-sortable-list-next-demo';

@Component({
  selector: 'app-basic-sortable-list-next-demo-container',
  imports: [DemoContainer, BasicSortableListNextDemo],
  template: `
    <app-demo-container
      title="Basic"
      [code]="code"
      demoUrl="/demos/sortable-list-next/basic-sortable-list-next-demo"
    >
      <app-basic-sortable-list-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicSortableListNextDemoContainer {
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

/** Your array, reordered: drag an item with the mouse, a finger (hold, then move) or a pen — or lift it with Space, move it with ↑ ↓, drop it with Space; Escape puts it back. Each keyboard step is announced in your words. */
@Component({
  selector: 'app-basic-sortable-list-next-demo',
  imports: [ScSortableListNext, ScSortableListNextItem],
  template: \`
    <p id="basic-sortable-help" class="sr-only">
      Space lifts an item, the arrow keys move it, Space drops it, Escape puts
      it back.
    </p>
    <ul
      scSortableListNext
      #list="scSortableListNext"
      [(value)]="items"
      [announce]="announce"
      aria-label="Priorities"
      class="w-full max-w-sm"
    >
      @for (item of list.items(); track item.id) {
        <li
          [scSortableListNextItem]="item"
          aria-describedby="basic-sortable-help"
          class="px-3 py-2"
        >
          {{ item.label }}
        </li>
      }
    </ul>
    <p class="text-muted-foreground text-sm" data-testid="basic-order">
      {{ joined() }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicSortableListNextDemo {
  readonly items = signal<Item[]>([
    { id: 'a', label: 'Customer support' },
    { id: 'b', label: 'Performance' },
    { id: 'c', label: 'Accessibility' },
    { id: 'd', label: 'New features' },
    { id: 'e', label: 'Documentation' },
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
