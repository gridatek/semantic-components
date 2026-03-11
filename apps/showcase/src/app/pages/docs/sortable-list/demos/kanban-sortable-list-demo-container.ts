import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { KanbanSortableListDemo } from './kanban-sortable-list-demo';

@Component({
  selector: 'app-kanban-sortable-list-demo-container',
  imports: [DemoContainer, KanbanSortableListDemo],
  template: `
    <app-demo-container title="Kanban Cards" [code]="code">
      <app-kanban-sortable-list-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanSortableListDemoContainer {
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
import { SiGripVerticalIcon } from '@semantic-icons/lucide-icons';

interface KanbanCard {
  id: number;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

@Component({
  selector: 'app-kanban-sortable-list-demo',
  imports: [CdkDropList, CdkDrag, CdkDragHandle, SiGripVerticalIcon],
  template: \`
    <div class="max-w-md">
      <div
        cdkDropList
        [cdkDropListData]="cards()"
        (cdkDropListDropped)="drop($event)"
        class="space-y-3"
      >
        @for (card of cards(); track card.id) {
          <div cdkDrag class="bg-card rounded-lg border p-4 shadow-sm">
            <div class="flex items-start gap-3">
              <svg
                cdkDragHandle
                siGripVerticalIcon
                class="text-muted-foreground mt-1 size-4 shrink-0 cursor-grab"
              ></svg>
              <div class="flex-1 space-y-2">
                <h4 class="font-medium">{{ card.title }}</h4>
                <p class="text-muted-foreground text-sm">
                  {{ card.description }}
                </p>
                <div class="flex items-center gap-2">
                  <span
                    class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                    [class]="getPriorityClass(card.priority)"
                  >
                    {{ card.priority }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanSortableListDemo {
  readonly cards = signal<KanbanCard[]>([
    {
      id: 1,
      title: 'Design System',
      description: 'Create a comprehensive design system for the application',
      priority: 'high',
    },
    {
      id: 2,
      title: 'API Integration',
      description: 'Integrate third-party payment API',
      priority: 'medium',
    },
    {
      id: 3,
      title: 'Documentation',
      description: 'Write developer documentation for components',
      priority: 'low',
    },
  ]);

  drop(event: CdkDragDrop<KanbanCard[]>): void {
    this.cards.update((cards) => {
      const updated = [...cards];
      moveItemInArray(updated, event.previousIndex, event.currentIndex);
      return updated;
    });
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }
}`;
}
