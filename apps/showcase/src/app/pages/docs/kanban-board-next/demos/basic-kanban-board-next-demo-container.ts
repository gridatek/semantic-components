import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicKanbanBoardNextDemo } from './basic-kanban-board-next-demo';

@Component({
  selector: 'app-basic-kanban-board-next-demo-container',
  imports: [DemoContainer, BasicKanbanBoardNextDemo],
  template: `
    <app-demo-container
      title="Basic"
      [code]="code"
      demoUrl="/demos/kanban-board-next/basic-kanban-board-next-demo"
    >
      <app-basic-kanban-board-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicKanbanBoardNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScKanbanBoardNext, ScKanbanColumnNext, ScKanbanCardNext, type ScKanbanBoardNextAnnouncement, type ScKanbanBoardNextValue } from '@semantic-components/ui-lab';

interface Task {
  readonly id: string;
  readonly title: string;
}

/** Cards dragged with the mouse, a finger (hold, then move) or a pen — or lifted by the keyboard: Space, the arrows, Space; Escape puts it back. Each keyboard step is announced, in your words. */
@Component({
  selector: 'app-basic-kanban-board-next-demo',
  imports: [ScKanbanBoardNext, ScKanbanColumnNext, ScKanbanCardNext],
  template: \`
    <p id="basic-kanban-help" class="sr-only">
      Space lifts a card, the arrow keys move it, Space drops it, Escape puts it back.
    </p>
    <div scKanbanBoardNext #kanban="scKanbanBoardNext" [(value)]="board" [announce]="announce" class="w-full">
      @for (column of columns; track column.id) {
        <div class="bg-muted/50 flex w-64 shrink-0 flex-col gap-1 rounded-xl p-2">
          <h3 [id]="'basic-' + column.id" class="flex items-center gap-2 px-2 py-1 text-sm font-semibold">
            {{ column.title }}
            <span class="text-muted-foreground font-normal tabular-nums">{{ kanban.items(column.id).length }}</span>
          </h3>
          <ul [scKanbanColumnNext]="column.id" [attr.aria-labelledby]="'basic-' + column.id">
            @for (task of kanban.items(column.id); track task.id) {
              <li [scKanbanCardNext]="task" aria-describedby="basic-kanban-help">{{ task.title }}</li>
            }
          </ul>
        </div>
      }
    </div>
  \`,
  host: { class: 'flex w-full flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicKanbanBoardNextDemo {
  readonly columns = [
    { id: 'todo', title: 'To do' },
    { id: 'doing', title: 'In progress' },
    { id: 'done', title: 'Done' },
  ];
  readonly titles: Record<string, string> = { todo: 'To do', doing: 'In progress', done: 'Done' };
  readonly board = signal<ScKanbanBoardNextValue<Task>>({
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
  readonly announce = ({ type, item, column, position, count }: ScKanbanBoardNextAnnouncement<Task>) => {
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
