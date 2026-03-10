import {
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
import { SiGripVerticalIcon } from '@semantic-icons/lucide-icons';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-task-list-sortable-list-demo',
  imports: [CdkDropList, CdkDrag, CdkDragHandle, SiGripVerticalIcon],
  template: `
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
            <input
              type="checkbox"
              [checked]="task.completed"
              (change)="toggleTask(task.id)"
              class="border-primary size-4 rounded"
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
  `,
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
}
