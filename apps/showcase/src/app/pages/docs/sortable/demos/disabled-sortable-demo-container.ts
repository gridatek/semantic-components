import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledSortableDemo } from './disabled-sortable-demo';

@Component({
  selector: 'app-disabled-sortable-demo-container',
  imports: [DemoContainer, DisabledSortableDemo],
  template: `
    <app-demo-container
      title="Disabled"
      [code]="code"
      demoUrl="/demos/sortable/disabled-sortable-demo"
    >
      <app-disabled-sortable-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledSortableDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScField,
  ScSortable,
  type ScSortableAnnouncement,
  ScSortableItem,
  ScSwitch,
} from '@semantic-components/ui';

interface Item {
  readonly id: string;
  readonly label: string;
}

/** disabled: shown in order, but not moved — the items are not Tab stops then. */
@Component({
  selector: 'app-disabled-sortable-demo',
  imports: [ScSortable, ScSortableItem, ScSwitch, ScField],
  template: \`
    <label scField orientation="horizontal">
      <input scSwitch [(checked)]="locked" />
      Locked
    </label>
    <p id="disabled-sortable-help" class="sr-only">
      Space lifts an item, the arrow keys move it, Space drops it, Escape puts
      it back.
    </p>
    <ul
      scSortable
      #list="scSortable"
      [(value)]="items"
      [announce]="announce"
      [disabled]="locked()"
      aria-label="Ranking"
      class="w-full max-w-sm"
    >
      @for (item of list.items(); track item.id) {
        <li [scSortableItem]="item" aria-describedby="disabled-sortable-help">
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
export class DisabledSortableDemo {
  private readonly locked = signal(true);
  private readonly items = signal<Item[]>([
    { id: 'r1', label: 'First' },
    { id: 'r2', label: 'Second' },
    { id: 'r3', label: 'Third' },
  ]);
  private readonly joined = computed(() =>
    this.items()
      .map((item) => item.label)
      .join(', '),
  );
  /** What a keyboard move says, step by step. */
  private readonly announce = ({
    type,
    item,
    position,
    count,
  }: ScSortableAnnouncement<Item>) =>
    ({
      lift: \`Lifted \${item.label}, \${position} of \${count}.\`,
      move: \`\${item.label}: \${position} of \${count}.\`,
      drop: \`Dropped \${item.label} at \${position} of \${count}.\`,
      cancel: \`\${item.label} back at \${position} of \${count}.\`,
    })[type];
}`;
}
