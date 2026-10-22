import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScBadge,
  ScButton,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuTrigger,
} from '@semantic-components/ui';
import {
  ScKanbanBoard,
  type ScKanbanBoardAnnouncement,
  type ScKanbanBoardValue,
  ScKanbanCard,
  ScKanbanColumn,
} from '@semantic-components/ui-lab';
import { SiEllipsisIcon } from '@semantic-icons/lucide-icons';

interface Task {
  readonly id: string;
  readonly title: string;
  readonly labels: readonly string[];
  readonly priority: 'high' | 'medium' | 'low';
  readonly due: Temporal.PlainDate;
  readonly owner: { readonly name: string; readonly initials: string };
}

/** A card is yours: labels, a priority in words and the theme’s colours, a due date, an avatar — and a “Move to…” menu, through move(), for those who neither drag nor lift. */
@Component({
  selector: 'app-rich-kanban-board-demo',
  imports: [
    ScKanbanBoard,
    ScKanbanColumn,
    ScKanbanCard,
    ScAvatar,
    ScAvatarFallback,
    ScBadge,
    ScButton,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuTrigger,
    SiEllipsisIcon,
  ],
  template: `
    <p id="rich-kanban-help" class="sr-only">
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
            [id]="'rich-' + column.id"
            class="flex items-center gap-2 px-2 py-1 text-sm font-semibold"
          >
            {{ column.title }}
            <span class="text-muted-foreground font-normal tabular-nums">{{
              kanban.items(column.id).length
            }}</span>
          </h3>
          <ul
            [scKanbanColumn]="column.id"
            [attr.aria-labelledby]="'rich-' + column.id"
          >
            @for (task of kanban.items(column.id); track task.id) {
              <li
                [scKanbanCard]="task"
                aria-describedby="rich-kanban-help"
                class="grid gap-2"
              >
                <div class="flex items-start gap-2">
                  <span class="flex-1 font-medium">{{ task.title }}</span>
                  <div scMenuProvider align="end">
                    <button
                      scButton
                      scMenuTrigger
                      variant="ghost"
                      size="icon-xs"
                      class="-me-1 -mt-1"
                    >
                      <svg siEllipsisIcon></svg>
                      <span class="sr-only">Move {{ task.title }}</span>
                    </button>
                    <ng-template scMenuPortal>
                      <div
                        scMenu
                        (itemSelected)="kanban.move(task, $any($event), 0)"
                      >
                        <ng-template scMenuContent>
                          @for (target of columns; track target.id) {
                            @if (target.id !== column.id) {
                              <div scMenuItem [value]="target.id">
                                Move to {{ target.title }}
                              </div>
                            }
                          }
                        </ng-template>
                      </div>
                    </ng-template>
                  </div>
                </div>
                <div class="flex flex-wrap gap-1">
                  @for (label of task.labels; track label) {
                    <span scBadge variant="secondary">{{ label }}</span>
                  }
                </div>
                <div
                  class="text-muted-foreground flex items-center gap-2 text-xs"
                >
                  <span [class]="priorityClass[task.priority]">{{
                    priorityText[task.priority]
                  }}</span>
                  <time [attr.datetime]="task.due.toString()" class="ms-auto">
                    Due
                    {{
                      task.due.toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })
                    }}
                  </time>
                  <span scAvatar class="size-6">
                    <span scAvatarFallback class="text-[0.625rem]">{{
                      task.owner.initials
                    }}</span>
                  </span>
                  <span class="sr-only">{{ task.owner.name }}</span>
                </div>
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
export class RichKanbanBoardDemo {
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
  readonly priorityText = { high: 'High', medium: 'Medium', low: 'Low' };
  readonly priorityClass = {
    high: 'text-destructive font-medium',
    medium: 'text-warning font-medium',
    low: 'text-muted-foreground',
  };
  readonly board = signal<ScKanbanBoardValue<Task>>({
    todo: [
      {
        id: 'r1',
        title: 'Customer interviews',
        labels: ['Research'],
        priority: 'high',
        due: Temporal.PlainDate.from('2026-11-03'),
        owner: { name: 'Ada Lovelace', initials: 'AL' },
      },
      {
        id: 'r2',
        title: 'Pricing page copy',
        labels: ['Marketing', 'Copy'],
        priority: 'low',
        due: Temporal.PlainDate.from('2026-11-12'),
        owner: { name: 'Grace Hopper', initials: 'GH' },
      },
    ],
    doing: [
      {
        id: 'r3',
        title: 'Onboarding flow',
        labels: ['Design'],
        priority: 'medium',
        due: Temporal.PlainDate.from('2026-10-30'),
        owner: { name: 'Alan Turing', initials: 'AT' },
      },
    ],
    done: [
      {
        id: 'r4',
        title: 'Billing migration',
        labels: ['Backend'],
        priority: 'high',
        due: Temporal.PlainDate.from('2026-10-20'),
        owner: { name: 'Katherine Johnson', initials: 'KJ' },
      },
    ],
  });
  /** What a keyboard move says, step by step. */
  readonly announce = ({
    type,
    item,
    column,
    position,
    count,
  }: ScKanbanBoardAnnouncement<Task>) => {
    const where = `${this.titles[column]}, ${position} of ${count}`;
    return {
      lift: `Lifted ${item.title}, in ${where}.`,
      move: `${item.title}: ${where}.`,
      drop: `Dropped ${item.title} in ${where}.`,
      cancel: `${item.title} back in ${where}.`,
    }[type];
  };
}
