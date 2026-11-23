import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScFrame,
  ScSortableNext,
  ScSortableNextGroup,
  type ScSortableNextGroupAnnouncement,
  type ScSortableNextGroupValue,
  ScSortableNextItem,
} from '@semantic-components/ui';

interface Task {
  readonly id: string;
  readonly title: string;
}

/** Linked lists: an item goes from one to another — dragged, or lifted and carried across by the keys; the group’s value holds every list. The full board is the Kanban Board recipe. */
@Component({
  selector: 'app-linked-sortable-next-demo',
  imports: [ScFrame, ScSortableNextGroup, ScSortableNext, ScSortableNextItem],
  template: `
    <p id="linked-help" class="sr-only">
      Space lifts a card, the arrow keys move it, Space drops it, Escape puts it
      back.
    </p>
    <div
      scSortableNextGroup
      #kanban="scSortableNextGroup"
      [(value)]="board"
      [announce]="announce"
      class="flex w-full items-start gap-4 overflow-x-auto p-1"
    >
      @for (column of columns; track column.id) {
        <div
          scFrame
          size="sm"
          class="bg-muted/50 flex w-64 shrink-0 flex-col gap-1 p-2"
        >
          <h3
            [id]="'linked-' + column.id"
            class="flex items-center gap-2 px-2 py-1 text-sm font-semibold"
          >
            {{ column.title }}
            <span class="text-muted-foreground font-normal tabular-nums">{{
              kanban.items(column.id).length
            }}</span>
          </h3>
          <ul
            [scSortableNext]="column.id"
            [attr.aria-labelledby]="'linked-' + column.id"
          >
            @for (task of kanban.items(column.id); track task.id) {
              <li [scSortableNextItem]="task" aria-describedby="linked-help">
                {{ task.title }}
              </li>
            }
          </ul>
        </div>
      }
    </div>
  `,
  host: { class: 'flex w-full flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class LinkedSortableNextDemo {
  private readonly columns = [
    { id: 'todo', title: 'To do' },
    { id: 'doing', title: 'In progress' },
    { id: 'done', title: 'Done' },
  ];
  private readonly titles: Record<string, string> = {
    todo: 'To do',
    doing: 'In progress',
    done: 'Done',
  };
  private readonly board = signal<ScSortableNextGroupValue<Task>>({
    todo: [
      { id: 't1', title: 'Write the release notes' },
      { id: 't2', title: 'Plan the next sprint' },
      { id: 't3', title: 'Update the dependencies' },
    ],
    doing: [
      { id: 't4', title: 'Design the settings page' },
      { id: 't5', title: 'Fix the login redirect' },
    ],
    done: [{ id: 't6', title: 'Set up the CI' }],
  });
  /** What a keyboard move says, step by step. */
  private readonly announce = ({
    type,
    item,
    list: column,
    position,
    count,
  }: ScSortableNextGroupAnnouncement<Task>) => {
    const where = `${this.titles[column]}, ${position} of ${count}`;
    return {
      lift: `Lifted ${item.title}, in ${where}.`,
      move: `${item.title}: ${where}.`,
      drop: `Dropped ${item.title} in ${where}.`,
      cancel: `${item.title} back in ${where}.`,
    }[type];
  };
}
