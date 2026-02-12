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
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanSortableListDemoContainer {
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
} from '@semantic-components/ui-lab';

interface KanbanCard {
  id: number;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

@Component({
  selector: 'app-kanban-sortable-list-demo',
  imports: [
    ScSortableList,
    ScSortableItem,
    ScSortableHandle,
    ScSortableOverlay,
  ],
  template: \`
    <div class="max-w-md">
      <div sc-sortable-list [(items)]="cards" [handleOnly]="true" class="gap-3">
        <div sc-sortable-overlay></div>
        @for (card of cards(); track card.id; let i = $index) {
          <div
            sc-sortable-item
            [index]="i"
            [item]="card"
            class="rounded-lg border bg-card p-4 shadow-sm"
          >
            <div class="flex items-start gap-3">
              <span sc-sortable-handle class="mt-1 p-1"></span>
              <div class="flex-1 space-y-2">
                <h4 class="font-medium">{{ card.title }}</h4>
                <p class="text-sm text-muted-foreground">
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
