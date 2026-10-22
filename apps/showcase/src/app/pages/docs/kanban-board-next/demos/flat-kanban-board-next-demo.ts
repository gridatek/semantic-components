import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScKanbanBoardNext,
  type ScKanbanBoardNextAnnouncement,
  type ScKanbanBoardNextValue,
  ScKanbanCardNext,
  ScKanbanColumnNext,
} from '@semantic-components/ui-lab';

interface Task {
  readonly id: string;
  readonly title: string;
  readonly status: string;
}

/** Your data as it is stored — issues, each with a status: the board’s value made from it, and each move written back. */
@Component({
  selector: 'app-flat-kanban-board-next-demo',
  imports: [ScKanbanBoardNext, ScKanbanColumnNext, ScKanbanCardNext],
  template: `
    <p id="flat-kanban-help" class="sr-only">
      Space lifts a card, the arrow keys move it, Space drops it, Escape puts it
      back.
    </p>
    <div
      scKanbanBoardNext
      #kanban="scKanbanBoardNext"
      [value]="byStatus()"
      (valueChange)="save($event)"
      [announce]="announce"
      class="w-full"
    >
      @for (column of columns; track column.id) {
        <div
          class="bg-muted/50 flex w-64 shrink-0 flex-col gap-1 rounded-xl p-2"
        >
          <h3
            [id]="'flat-' + column.id"
            class="flex items-center gap-2 px-2 py-1 text-sm font-semibold"
          >
            {{ column.title }}
            <span class="text-muted-foreground font-normal tabular-nums">{{
              kanban.items(column.id).length
            }}</span>
          </h3>
          <ul
            [scKanbanColumnNext]="column.id"
            [attr.aria-labelledby]="'flat-' + column.id"
          >
            @for (task of kanban.items(column.id); track task.id) {
              <li [scKanbanCardNext]="task" aria-describedby="flat-kanban-help">
                <span class="text-muted-foreground font-mono text-xs">{{
                  task.id
                }}</span>
                {{ task.title }}
              </li>
            }
          </ul>
        </div>
      }
    </div>
    <pre
      class="bg-muted w-full overflow-x-auto rounded-md p-4 text-xs"
      aria-label="Stored issues"
      >{{ stored() }}</pre>
  `,
  host: { class: 'flex w-full flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FlatKanbanBoardNextDemo {
  readonly columns = [
    { id: 'todo', title: 'To do' },
    { id: 'doing', title: 'In progress' },
    { id: 'done', title: 'Done' },
  ];
  readonly titles: Record<string, string> = {
    todo: 'To do',
    doing: 'In progress',
    done: 'Done',
  };
  /** As stored: a flat list, each issue with its status. */
  readonly issues = signal<Task[]>([
    { id: 'ISS-1', title: 'Crash on empty search', status: 'todo' },
    { id: 'ISS-2', title: 'Slow dashboard', status: 'doing' },
    { id: 'ISS-3', title: 'Typo in footer', status: 'done' },
    { id: 'ISS-4', title: 'Dark mode contrast', status: 'todo' },
  ]);

  /** The board's value: the issues by status, in their order. */
  readonly byStatus = computed(() => {
    const value: Record<string, Task[]> = { todo: [], doing: [], done: [] };
    for (const issue of this.issues()) value[issue.status].push(issue);
    return value;
  });

  readonly stored = computed(() =>
    this.issues()
      .map((issue) => issue.id + ' → ' + issue.status)
      .join('\n'),
  );

  /** A move, written back: each issue's status is its column. */
  save(value: ScKanbanBoardNextValue<Task>): void {
    this.issues.set(
      Object.entries(value).flatMap(([status, tasks]) =>
        tasks.map((task) =>
          task.status === status ? task : { ...task, status },
        ),
      ),
    );
  }
  /** What a keyboard move says, step by step. */
  readonly announce = ({
    type,
    item,
    column,
    position,
    count,
  }: ScKanbanBoardNextAnnouncement<Task>) => {
    const where = `${this.titles[column]}, ${position} of ${count}`;
    return {
      lift: `Lifted ${item.title}, in ${where}.`,
      move: `${item.title}: ${where}.`,
      drop: `Dropped ${item.title} in ${where}.`,
      cancel: `${item.title} back in ${where}.`,
    }[type];
  };
}
