import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScInput,
  ScSortableGroup,
  type ScSortableGroupAnnouncement,
  type ScSortableGroupValue,
  ScSortableList,
  ScSortableListItem,
} from '@semantic-components/ui';

interface Task {
  readonly id: string;
  readonly title: string;
}

/** Adding a card, and a work-in-progress limit, are yours: here a field under each column, and In progress said to be over three. */
@Component({
  selector: 'app-add-kanban-board-demo',
  imports: [
    ScSortableGroup,
    ScSortableList,
    ScSortableListItem,
    ScButton,
    ScInput,
  ],
  template: `
    <p id="add-kanban-help" class="sr-only">
      Space lifts a card, the arrow keys move it, Space drops it, Escape puts it
      back.
    </p>
    <div
      scSortableGroup
      #kanban="scSortableGroup"
      [(value)]="board"
      [announce]="announce"
      class="flex w-full items-start gap-4 overflow-x-auto p-1"
    >
      @for (column of columns; track column.id) {
        <div
          class="bg-muted/50 flex w-64 shrink-0 flex-col gap-1 rounded-xl p-2"
        >
          <h3
            [id]="'add-' + column.id"
            class="flex items-center gap-2 px-2 py-1 text-sm font-semibold"
          >
            {{ column.title }}
            <span
              class="font-normal tabular-nums"
              [class]="
                over(column.id) ? 'text-destructive' : 'text-muted-foreground'
              "
            >
              {{ kanban.items(column.id).length
              }}{{ column.limit ? ' / ' + column.limit : '' }}
            </span>
          </h3>
          @if (over(column.id)) {
            <p class="text-destructive px-2 text-xs">
              Over the limit: finish one first.
            </p>
          }
          <ul
            [scSortableList]="column.id"
            [attr.aria-labelledby]="'add-' + column.id"
          >
            @for (task of kanban.items(column.id); track task.id) {
              <li
                [scSortableListItem]="task"
                aria-describedby="add-kanban-help"
              >
                {{ task.title }}
              </li>
            }
          </ul>
          <form
            class="flex gap-1 px-1"
            (submit)="add($event, column.id, title)"
          >
            <input
              #title
              scInput
              [attr.aria-label]="'New card in ' + column.title"
              placeholder="Add a card"
              class="h-7"
            />
            <button scButton type="submit" size="sm" variant="ghost">
              Add
            </button>
          </form>
        </div>
      }
    </div>
  `,
  host: { class: 'flex w-full flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class AddKanbanBoardDemo {
  private readonly columns: { id: string; title: string; limit?: number }[] = [
    { id: 'todo', title: 'To do' },
    { id: 'doing', title: 'In progress', limit: 3 },
    { id: 'done', title: 'Done' },
  ];
  private readonly titles: Record<string, string> = {
    todo: 'To do',
    doing: 'In progress',
    done: 'Done',
  };
  private readonly board = signal<ScSortableGroupValue<Task>>({
    todo: [
      { id: 'a1', title: 'Draft the agenda' },
      { id: 'a2', title: 'Book the room' },
    ],
    doing: [
      { id: 'a3', title: 'Review the budget' },
      { id: 'a4', title: 'Call the venue' },
      { id: 'a5', title: 'Send invites' },
    ],
    done: [],
  });
  private added = 0;

  /** A column past its limit. */
  private over(column: string): boolean {
    const limit = this.columns.find((c) => c.id === column)?.limit;
    return limit !== undefined && (this.board()[column]?.length ?? 0) > limit;
  }

  private add(event: Event, column: string, field: HTMLInputElement): void {
    event.preventDefault();
    const title = field.value.trim();
    if (!title) return;
    this.board.update((board) => ({
      ...board,
      [column]: [
        ...(board[column] ?? []),
        { id: 'new-' + ++this.added, title },
      ],
    }));
    field.value = '';
  }
  /** What a keyboard move says, step by step. */
  private readonly announce = ({
    type,
    item,
    list: column,
    position,
    count,
  }: ScSortableGroupAnnouncement<Task>) => {
    const where = `${this.titles[column]}, ${position} of ${count}`;
    return {
      lift: `Lifted ${item.title}, in ${where}.`,
      move: `${item.title}: ${where}.`,
      drop: `Dropped ${item.title} in ${where}.`,
      cancel: `${item.title} back in ${where}.`,
    }[type];
  };
}
