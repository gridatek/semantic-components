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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListSortableListDemoContainer {
  readonly code = `import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScCheckbox, ScCheckboxField } from '@semantic-components/ui';
import { SiGripVerticalIcon } from '@semantic-icons/lucide-icons';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-task-list-sortable-list-demo',
  imports: [
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    ScCheckboxField,
    ScCheckbox,
    SiGripVerticalIcon,
  ],
  template: \`
    <div class="max-w-md">
      <div
        cdkDropList
        [cdkDropListData]="tasks()"
        (cdkDropListDropped)="drop($event)"
        class="space-y-1"
      >
        @for (task of tasks(); track task.id) {
          <div
            cdkDrag
            class="bg-background hover:bg-muted/50 flex items-center gap-3 rounded-md border p-3"
          >
            <svg
              cdkDragHandle
              siGripVerticalIcon
              class="text-muted-foreground size-4 shrink-0 cursor-grab"
            ></svg>
            <label scCheckboxField>
              <input
                type="checkbox"
                scCheckbox
                [checked]="task.completed"
                (checkedChange)="toggleTask(task.id)"
              />
            </label>
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
  styles: \`
    .cdk-drag-preview {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      border-radius: 0.375rem;
      border: 1px solid var(--border);
      padding: 0.75rem;
      background: var(--background);
      box-shadow:
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
    }
    .cdk-drag-placeholder {
      border-radius: 0.375rem;
      border: 1px dashed var(--border);
      opacity: 0.5;
    }
    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
  \`,
  host: { class: 'flex w-full justify-center' },
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

  drop(event: CdkDragDrop<Task[]>): void {
    this.tasks.update((tasks) => {
      const updated = [...tasks];
      moveItemInArray(updated, event.previousIndex, event.currentIndex);
      return updated;
    });
  }
}`;
}
