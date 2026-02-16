import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MinimalKanbanBoardDemo } from './minimal-kanban-board-demo';

@Component({
  selector: 'app-minimal-kanban-board-demo-container',
  imports: [DemoContainer, MinimalKanbanBoardDemo],
  template: `
    <app-demo-container
      title="Minimal (No Add/Delete)"
      demoUrl="/demos/kanban-board/minimal-kanban-board-demo"
      [code]="code"
    >
      <app-minimal-kanban-board-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinimalKanbanBoardDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScKanbanBoard,
  type KanbanCard,
  type KanbanColumn,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-minimal-kanban-board-demo',
  imports: [ScKanbanBoard],
  template: \`
    <div class="h-[400px] border rounded-lg bg-muted/10">
      <sc-kanban-board
        [(columns)]="columns"
        [(cards)]="cards"
        [showAddCard]="false"
        [showDeleteCard]="false"
        [showAddColumn]="false"
      />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinimalKanbanBoardDemo {
  readonly columns = signal<KanbanColumn[]>([
    { id: 'pending', title: 'Pending', order: 0 },
    { id: 'approved', title: 'Approved', order: 1 },
    { id: 'rejected', title: 'Rejected', order: 2 },
  ]);

  readonly cards = signal<KanbanCard[]>([
    { id: 'm1', title: 'Request #1001', columnId: 'pending', order: 0 },
    { id: 'm2', title: 'Request #1002', columnId: 'pending', order: 1 },
    { id: 'm3', title: 'Request #1003', columnId: 'approved', order: 0 },
    { id: 'm4', title: 'Request #1004', columnId: 'rejected', order: 0 },
  ]);
}`;
}
