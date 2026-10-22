import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import {
  ScSortableList,
  type ScSortableListAnnouncement,
  ScSortableListItem,
} from '@semantic-components/ui-lab';
import { SiArrowDownIcon, SiArrowUpIcon } from '@semantic-icons/lucide-icons';

interface Item {
  readonly id: string;
  readonly label: string;
}

/** move(item, index) — for Move up and Move down buttons, the simplest way for those who neither drag nor lift. */
@Component({
  selector: 'app-buttons-sortable-list-demo',
  imports: [
    ScSortableList,
    ScSortableListItem,
    ScButton,
    SiArrowUpIcon,
    SiArrowDownIcon,
  ],
  template: `
    <p id="buttons-sortable-help" class="sr-only">
      Space lifts an item, the arrow keys move it, Space drops it, Escape puts
      it back.
    </p>
    <ol
      scSortableList
      #list="scSortableList"
      [(value)]="items"
      [announce]="announce"
      aria-label="Playlist"
      class="w-full max-w-sm"
    >
      @for (item of list.items(); track item.id; let i = $index, last = $last) {
        <li
          [scSortableListItem]="item"
          aria-describedby="buttons-sortable-help"
          class="flex items-center gap-2 py-1 ps-3 pe-1"
        >
          <span class="flex-1">{{ item.label }}</span>
          <button
            scButton
            variant="ghost"
            size="icon-sm"
            [disabled]="i === 0"
            (click)="list.move(item, i - 1)"
          >
            <svg siArrowUpIcon></svg>
            <span class="sr-only">Move {{ item.label }} up</span>
          </button>
          <button
            scButton
            variant="ghost"
            size="icon-sm"
            [disabled]="last"
            (click)="list.move(item, i + 1)"
          >
            <svg siArrowDownIcon></svg>
            <span class="sr-only">Move {{ item.label }} down</span>
          </button>
        </li>
      }
    </ol>
    <p class="text-muted-foreground text-sm" data-testid="buttons-order">
      {{ joined() }}
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class ButtonsSortableListDemo {
  readonly items = signal<Item[]>([
    { id: 'p1', label: 'Opening theme' },
    { id: 'p2', label: 'Night drive' },
    { id: 'p3', label: 'Slow morning' },
    { id: 'p4', label: 'Last call' },
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
      lift: `Lifted ${item.label}, ${position} of ${count}.`,
      move: `${item.label}: ${position} of ${count}.`,
      drop: `Dropped ${item.label} at ${position} of ${count}.`,
      cancel: `${item.label} back at ${position} of ${count}.`,
    })[type];
}
