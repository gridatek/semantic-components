import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScKanbanBoard,
  type KanbanCard,
  type KanbanColumn,
  type KanbanDragEvent,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-kanban-board-demo',
  imports: [ScKanbanBoard],
  template: `
    <div class="h-[600px] border rounded-lg bg-muted/10">
      <sc-kanban-board
        [(columns)]="columns"
        [(cards)]="cards"
        (cardMoved)="onCardMoved($event)"
        (cardAdded)="onCardAdded($event)"
        (cardDeleted)="onCardDeleted($event)"
        (columnAdded)="onColumnAdded($event)"
      />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicKanbanBoardDemo {
  readonly columns = signal<KanbanColumn[]>([
    { id: 'backlog', title: 'Backlog', order: 0, color: '#6b7280' },
    { id: 'todo', title: 'To Do', order: 1, color: '#3b82f6' },
    {
      id: 'in-progress',
      title: 'In Progress',
      order: 2,
      color: '#f59e0b',
      limit: 3,
    },
    { id: 'review', title: 'Review', order: 3, color: '#8b5cf6' },
    { id: 'done', title: 'Done', order: 4, color: '#22c55e' },
  ]);

  readonly cards = signal<KanbanCard[]>([
    {
      id: '1',
      title: 'Set up project repository',
      description: 'Initialize Git repo and configure CI/CD pipeline',
      columnId: 'done',
      order: 0,
      labels: [{ id: 'l1', text: 'Setup', color: '#22c55e' }],
      assignee: { id: 'u1', name: 'Alice Johnson', initials: 'AJ' },
      priority: 'high',
    },
    {
      id: '2',
      title: 'Design database schema',
      description: 'Create ERD and define table relationships',
      columnId: 'done',
      order: 1,
      labels: [{ id: 'l2', text: 'Database', color: '#3b82f6' }],
      assignee: { id: 'u2', name: 'Bob Smith', initials: 'BS' },
      priority: 'high',
    },
    {
      id: '3',
      title: 'Implement user authentication',
      description: 'Add login, registration, and password reset',
      columnId: 'review',
      order: 0,
      labels: [
        { id: 'l3', text: 'Feature', color: '#8b5cf6' },
        { id: 'l4', text: 'Security', color: '#ef4444' },
      ],
      assignee: { id: 'u1', name: 'Alice Johnson', initials: 'AJ' },
      priority: 'urgent',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: '4',
      title: 'Create dashboard layout',
      description: 'Design and implement the main dashboard UI',
      columnId: 'in-progress',
      order: 0,
      labels: [{ id: 'l5', text: 'UI', color: '#f59e0b' }],
      assignee: { id: 'u3', name: 'Carol Davis', initials: 'CD' },
      priority: 'medium',
    },
    {
      id: '5',
      title: 'Add API endpoints for users',
      columnId: 'in-progress',
      order: 1,
      labels: [{ id: 'l6', text: 'Backend', color: '#6366f1' }],
      assignee: { id: 'u2', name: 'Bob Smith', initials: 'BS' },
      priority: 'medium',
    },
    {
      id: '6',
      title: 'Write unit tests for auth module',
      columnId: 'todo',
      order: 0,
      labels: [{ id: 'l7', text: 'Testing', color: '#14b8a6' }],
      priority: 'low',
    },
    {
      id: '7',
      title: 'Set up error monitoring',
      description: 'Integrate Sentry or similar service',
      columnId: 'todo',
      order: 1,
      labels: [{ id: 'l8', text: 'DevOps', color: '#ec4899' }],
      priority: 'medium',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: '8',
      title: 'Research payment providers',
      description: 'Compare Stripe, PayPal, and Square for integration',
      columnId: 'backlog',
      order: 0,
      labels: [{ id: 'l9', text: 'Research', color: '#64748b' }],
    },
    {
      id: '9',
      title: 'Mobile responsive design',
      columnId: 'backlog',
      order: 1,
      labels: [{ id: 'l5', text: 'UI', color: '#f59e0b' }],
    },
    {
      id: '10',
      title: 'Performance optimization',
      description: 'Audit and improve load times',
      columnId: 'backlog',
      order: 2,
      labels: [{ id: 'l10', text: 'Performance', color: '#06b6d4' }],
    },
  ]);

  onCardMoved(event: KanbanDragEvent): void {
    console.log('Card moved:', event);
  }

  onCardAdded(event: { columnId: string; title: string }): void {
    console.log('Card added:', event);
  }

  onCardDeleted(event: { card: KanbanCard; columnId: string }): void {
    console.log('Card deleted:', event);
  }

  onColumnAdded(title: string): void {
    console.log('Column added:', title);
  }
}
