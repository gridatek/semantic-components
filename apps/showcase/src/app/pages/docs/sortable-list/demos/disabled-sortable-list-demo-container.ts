import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledSortableListDemo } from './disabled-sortable-list-demo';

@Component({
  selector: 'app-disabled-sortable-list-demo-container',
  imports: [DemoContainer, DisabledSortableListDemo],
  template: `
    <app-demo-container
      title="Disabled"
      [code]="code"
      demoUrl="/demos/sortable-list/disabled-sortable-list-demo"
    >
      <app-disabled-sortable-list-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledSortableListDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { ScSwitch, ScSwitchField } from '@semantic-components/ui';
import {
  ScSortableList,
  type ScSortableListAnnouncement,
  ScSortableListItem,
} from '@semantic-components/ui-lab';

interface Item {
  readonly id: string;
  readonly label: string;
}

/** disabled: shown in order, but not moved — the items are not Tab stops then. */
@Component({
  selector: 'app-disabled-sortable-list-demo',
  imports: [
    ScSortableList,
    ScSortableListItem,
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
      scSortableList
      #list="scSortableList"
      [(value)]="items"
      [announce]="announce"
      [disabled]="locked()"
      aria-label="Ranking"
      class="w-full max-w-sm"
    >
      @for (item of list.items(); track item.id) {
        <li
          [scSortableListItem]="item"
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
export class DisabledSortableListDemo {
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
  }: ScSortableListAnnouncement<Item>) =>
    ({
      lift: \`Lifted \${item.label}, \${position} of \${count}.\`,
      move: \`\${item.label}: \${position} of \${count}.\`,
      drop: \`Dropped \${item.label} at \${position} of \${count}.\`,
      cancel: \`\${item.label} back at \${position} of \${count}.\`,
    })[type];
}`;
}
