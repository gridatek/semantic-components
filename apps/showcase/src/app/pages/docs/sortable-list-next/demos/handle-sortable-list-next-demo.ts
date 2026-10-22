import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { ScCheckbox, ScCheckboxField, ScLabel } from '@semantic-components/ui';
import {
  ScSortableListNext,
  type ScSortableListNextAnnouncement,
  ScSortableListNextHandle,
  ScSortableListNextItem,
} from '@semantic-components/ui-lab';
import { SiGripVerticalIcon } from '@semantic-icons/lucide-icons';

interface Item {
  readonly id: string;
  readonly label: string;
}

/** With a handle, only the grip drags — the rest of the item is free for a checkbox and its label. The keyboard still lifts the whole item. */
@Component({
  selector: 'app-handle-sortable-list-next-demo',
  imports: [
    ScSortableListNext,
    ScSortableListNextItem,
    ScSortableListNextHandle,
    ScCheckbox,
    ScCheckboxField,
    ScLabel,
    SiGripVerticalIcon,
  ],
  template: `
    <p id="handle-sortable-help" class="sr-only">
      Space lifts an item, the arrow keys move it, Space drops it, Escape puts
      it back.
    </p>
    <ul
      scSortableListNext
      #list="scSortableListNext"
      [(value)]="items"
      [announce]="announce"
      aria-label="Tasks"
      class="w-full max-w-sm"
    >
      @for (item of list.items(); track item.id) {
        <li
          [scSortableListNextItem]="item"
          aria-describedby="handle-sortable-help"
          class="flex items-center gap-3 px-3 py-2"
        >
          <span scSortableListNextHandle><svg siGripVerticalIcon></svg></span>
          <div scCheckboxField>
            <input
              type="checkbox"
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
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class HandleSortableListNextDemo {
  readonly items = signal<Item[]>([
    { id: 't1', label: 'Write the outline' },
    { id: 't2', label: 'Draft the introduction' },
    { id: 't3', label: 'Collect the figures' },
    { id: 't4', label: 'Ask for a review' },
  ]);
  readonly done = signal(new Set<string>(['t1']));
  readonly joined = computed(() =>
    this.items()
      .map((item) => item.label)
      .join(', '),
  );

  toggle(id: string): void {
    this.done.update((done) => {
      const next = new Set(done);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  /** What a keyboard move says, step by step. */
  readonly announce = ({
    type,
    item,
    position,
    count,
  }: ScSortableListNextAnnouncement<Item>) =>
    ({
      lift: `Lifted ${item.label}, ${position} of ${count}.`,
      move: `${item.label}: ${position} of ${count}.`,
      drop: `Dropped ${item.label} at ${position} of ${count}.`,
      cancel: `${item.label} back at ${position} of ${count}.`,
    })[type];
}
