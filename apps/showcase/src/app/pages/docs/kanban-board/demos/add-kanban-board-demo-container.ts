import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AddKanbanBoardDemo } from './add-kanban-board-demo';

@Component({
  selector: 'app-add-kanban-board-demo-container',
  imports: [DemoContainer, AddKanbanBoardDemo],
  template: `
    <app-demo-container
      title="Add and limit"
      [code]="code"
      demoUrl="/demos/kanban-board/add-kanban-board-demo"
    >
      <app-add-kanban-board-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AddKanbanBoardDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton, ScInput, ScKanbanBoard, type ScKanbanBoardAnnouncement, type ScKanbanBoardValue, ScKanbanCard, ScKanbanColumn } from '@semantic-components/ui';

interface Task {
  readonly id: string;
  readonly title: string;
}

/** Adding a card, and a work-in-progress limit, are yours: here a field under each column, and In progress said to be over three. */
@Component({
  selector: 'app-add-kanban-board-demo',
  imports: [ScKanbanBoard, ScKanbanColumn, ScKanbanCard, ScButton, ScInput],
  template: \`
    <p id="add-kanban-help" class="sr-only">
      Space lifts a card, the arrow keys move it, Space drops it, Escape puts it
      back.
    </p>
    <div
      scKanbanBoard
      #kanban="scKanbanBoard"
      [(value)]="board"
      [announce]="announce"
      class="w-full"
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
            [scKanbanColumn]="column.id"
            [attr.aria-labelledby]="'add-' + column.id"
          >
            @for (task of kanban.items(column.id); track task.id) {
              <li [scKanbanCard]="task" aria-describedby="add-kanban-help">
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
  \`,
  host: { class: 'flex w-full flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class AddKanbanBoardDemo {
  readonly columns: { id: string; title: string; limit?: number }[] = [
    { id: 'todo', title: 'To do' },
    { id: 'doing', title: 'In progress', limit: 3 },
    { id: 'done', title: 'Done' },
  ];
  readonly titles: Record<string, string> = {
    todo: 'To do',
    doing: 'In progress',
    done: 'Done',
  };
  readonly board = signal<ScKanbanBoardValue<Task>>({
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
  over(column: string): boolean {
    const limit = this.columns.find((c) => c.id === column)?.limit;
    return limit !== undefined && (this.board()[column]?.length ?? 0) > limit;
  }

  add(event: Event, column: string, field: HTMLInputElement): void {
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
  readonly announce = ({
    type,
    item,
    column,
    position,
    count,
  }: ScKanbanBoardAnnouncement<Task>) => {
    const where = \`\${this.titles[column]}, \${position} of \${count}\`;
    return {
      lift: \`Lifted \${item.title}, in \${where}.\`,
      move: \`\${item.title}: \${where}.\`,
      drop: \`Dropped \${item.title} in \${where}.\`,
      cancel: \`\${item.title} back in \${where}.\`,
    }[type];
  };
}`;
}
