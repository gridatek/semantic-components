import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TaskListSortableListDemo } from './task-list-sortable-list-demo';

@Component({
  selector: 'app-task-list-sortable-list-demo-container',
  imports: [DemoContainer, TaskListSortableListDemo],
  template: `
    <app-demo-container title="Task List" [code]="code">
      <app-task-list-sortable-list-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListSortableListDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScSortableHandle,
  ScSortableItem,
  ScSortableList,
  ScSortableOverlay,
  SortableEvent,
} from '@semantic-components/ui-lab';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-task-list-sortable-list-demo',
  imports: [
    ScSortableList,
    ScSortableItem,
    ScSortableHandle,
    ScSortableOverlay,
  ],
  template: \`
    <div class="max-w-md">
      <div
        sc-sortable-list
        [(items)]="tasks"
        [handleOnly]="true"
        (sortChange)="onTaskReorder($event)"
        class="gap-1"
      >
        <div sc-sortable-overlay></div>
        @for (task of tasks(); track task.id; let i = $index) {
          <div
            sc-sortable-item
            [index]="i"
            [item]="task"
            class="flex items-center gap-3 rounded-md border bg-background p-3 hover:bg-muted/50"
          >
            <span sc-sortable-handle class="p-1"></span>
            <input
              type="checkbox"
              [checked]="task.completed"
              (change)="toggleTask(task.id)"
              class="size-4 rounded border-primary"
            />
            <span
              class="flex-1 text-sm"
              [class.line-through]="task.completed"
              [class.text-muted-foreground]="task.completed"
            >
              {{ task.title }}
            </span>
          </div>
        }
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListSortableListDemo {
  readonly tasks = signal<Task[]>([
    { id: 1, title: 'Review pull request', completed: false },
    { id: 2, title: 'Update documentation', completed: true },
    { id: 3, title: 'Fix navigation bug', completed: false },
    { id: 4, title: 'Write unit tests', completed: false },
    { id: 5, title: 'Deploy to staging', completed: false },
  ]);

  toggleTask(id: number): void {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  onTaskReorder(event: SortableEvent<Task>): void {
    console.log('Task reordered:', event);
  }
}`;
}
