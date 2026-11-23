import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HandleSortableNextDemo } from './handle-sortable-next-demo';

@Component({
  selector: 'app-handle-sortable-next-demo-container',
  imports: [DemoContainer, HandleSortableNextDemo],
  template: `
    <app-demo-container
      title="Handle"
      [code]="code"
      demoUrl="/demos/sortable-next/handle-sortable-next-demo"
    >
      <app-handle-sortable-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HandleSortableNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScCheckbox,
  ScField,
  ScLabel,
  ScSortableNext,
  type ScSortableNextAnnouncement,
  ScSortableNextHandle,
  ScSortableNextItem,
} from '@semantic-components/ui';
import { SiGripVerticalIcon } from '@semantic-icons/lucide-icons';

interface Item {
  readonly id: string;
  readonly label: string;
}

/** With a handle, only the grip drags — the rest of the item is free for a checkbox and its label. The keyboard still lifts the whole item. */
@Component({
  selector: 'app-handle-sortable-next-demo',
  imports: [
    ScSortableNext,
    ScSortableNextItem,
    ScSortableNextHandle,
    ScCheckbox,
    ScLabel,
    SiGripVerticalIcon,
    ScField,
  ],
  template: \`
    <p id="handle-sortable-help" class="sr-only">
      Space lifts an item, the arrow keys move it, Space drops it, Escape puts
      it back.
    </p>
    <ul
      scSortableNext
      #list="scSortableNext"
      [(value)]="items"
      [announce]="announce"
      aria-label="Tasks"
      class="w-full max-w-sm"
    >
      @for (item of list.items(); track item.id) {
        <li
          [scSortableNextItem]="item"
          aria-describedby="handle-sortable-help"
          class="flex items-center gap-3"
        >
          <span scSortableNextHandle><svg siGripVerticalIcon></svg></span>
          <div scField orientation="horizontal">
            <input
              scCheckbox
              [checked]="done().has(item.id)"
              (checkedChange)="toggle(item.id)"
            />
            <label scLabel>{{ item.label }}</label>
          </div>
        </li>
      }
    </ul>
    <p class="text-muted-foreground text-sm" data-testid="handle-order">
      {{ joined() }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class HandleSortableNextDemo {
  private readonly items = signal<Item[]>([
    { id: 't1', label: 'Write the outline' },
    { id: 't2', label: 'Draft the introduction' },
    { id: 't3', label: 'Collect the figures' },
    { id: 't4', label: 'Ask for a review' },
  ]);
  private readonly done = signal(new Set<string>(['t1']));
  private readonly joined = computed(() =>
    this.items()
      .map((item) => item.label)
      .join(', '),
  );

  private toggle(id: string): void {
    this.done.update((done) => {
      const next = new Set(done);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  /** What a keyboard move says, step by step. */
  private readonly announce = ({
    type,
    item,
    position,
    count,
  }: ScSortableNextAnnouncement<Item>) =>
    ({
      lift: \`Lifted \${item.label}, \${position} of \${count}.\`,
      move: \`\${item.label}: \${position} of \${count}.\`,
      drop: \`Dropped \${item.label} at \${position} of \${count}.\`,
      cancel: \`\${item.label} back at \${position} of \${count}.\`,
    })[type];
}`;
}
