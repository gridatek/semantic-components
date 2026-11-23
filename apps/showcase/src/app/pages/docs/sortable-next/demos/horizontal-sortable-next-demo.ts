import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScSortableNext,
  type ScSortableNextAnnouncement,
  ScSortableNextItem,
} from '@semantic-components/ui';

interface Item {
  readonly id: string;
  readonly label: string;
}

/** Along a row — tags, tabs, steps: ← → move a lifted item, in the reading direction (reversed right to left). */
@Component({
  selector: 'app-horizontal-sortable-next-demo',
  imports: [ScSortableNext, ScSortableNextItem],
  template: `
    <p id="horizontal-sortable-help" class="sr-only">
      Space lifts an item, ← → move it, Space drops it, Escape puts it back.
    </p>
    <ul
      scSortableNext
      #list="scSortableNext"
      orientation="horizontal"
      [(value)]="items"
      [announce]="announce"
      aria-label="Steps"
      class="w-full max-w-xl"
    >
      @for (item of list.items(); track item.id) {
        <li
          [scSortableNextItem]="item"
          aria-describedby="horizontal-sortable-help"
          class="shrink-0"
        >
          {{ item.label }}
        </li>
      }
    </ul>
    <p class="text-muted-foreground text-sm" data-testid="horizontal-order">
      {{ joined() }}
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class HorizontalSortableNextDemo {
  private readonly items = signal<Item[]>([
    { id: 's1', label: 'Plan' },
    { id: 's2', label: 'Design' },
    { id: 's3', label: 'Build' },
    { id: 's4', label: 'Test' },
    { id: 's5', label: 'Ship' },
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
  }: ScSortableNextAnnouncement<Item>) =>
    ({
      lift: `Lifted ${item.label}, ${position} of ${count}.`,
      move: `${item.label}: ${position} of ${count}.`,
      drop: `Dropped ${item.label} at ${position} of ${count}.`,
      cancel: `${item.label} back at ${position} of ${count}.`,
    })[type];
}
