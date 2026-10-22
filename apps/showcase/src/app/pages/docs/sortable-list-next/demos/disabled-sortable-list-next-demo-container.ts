import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledSortableListNextDemo } from './disabled-sortable-list-next-demo';

@Component({
  selector: 'app-disabled-sortable-list-next-demo-container',
  imports: [DemoContainer, DisabledSortableListNextDemo],
  template: `
    <app-demo-container
      title="Disabled"
      [code]="code"
      demoUrl="/demos/sortable-list-next/disabled-sortable-list-next-demo"
    >
      <app-disabled-sortable-list-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledSortableListNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { ScSwitch, ScSwitchField } from '@semantic-components/ui';
import {
  ScSortableListNext,
  type ScSortableListNextAnnouncement,
  ScSortableListNextItem,
} from '@semantic-components/ui-lab';

interface Item {
  readonly id: string;
  readonly label: string;
}

/** disabled: shown in order, but not moved — the items are not Tab stops then. */
@Component({
  selector: 'app-disabled-sortable-list-next-demo',
  imports: [
    ScSortableListNext,
    ScSortableListNextItem,
    ScSwitch,
    ScSwitchField,
    ],
  template: \`
    <label scSwitchField>
      <input type="checkbox" scSwitch [(checked)]="locked" />
      Locked
    </label>
    <p id="disabled-sortable-help" class="sr-only">
      Space lifts an item, the arrow keys move it, Space drops it, Escape puts
      it back.
    </p>
    <ul
      scSortableListNext
      #list="scSortableListNext"
      [(value)]="items"
      [announce]="announce"
      [disabled]="locked()"
      aria-label="Ranking"
      class="w-full max-w-sm"
    >
      @for (item of list.items(); track item.id) {
        <li
          [scSortableListNextItem]="item"
          aria-describedby="disabled-sortable-help"
          class="px-3 py-2"
        >
          {{ item.label }}
        </li>
      }
    </ul>
    <p class="text-muted-foreground text-sm" data-testid="disabled-order">
      {{ joined() }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledSortableListNextDemo {
  readonly locked = signal(true);
  readonly items = signal<Item[]>([
    { id: 'r1', label: 'First' },
    { id: 'r2', label: 'Second' },
    { id: 'r3', label: 'Third' },
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
