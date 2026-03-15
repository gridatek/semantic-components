import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  type KanbanCard,
  type KanbanColumn,
  ScKanbanBoard,
  ScKanbanCard,
  ScKanbanColumn,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-minimal-kanban-board-demo',
  imports: [ScKanbanBoard, ScKanbanColumn, ScKanbanCard],
  template: `
    <div class="bg-muted/10 h-[400px] rounded-lg border">
      <div
        scKanbanBoard
        #board="scKanbanBoard"
        [(columns)]="columns"
        [(cards)]="cards"
      >
        @for (column of board.sortedColumns(); track column.id) {
          <div scKanbanColumn #col="scKanbanColumn" [column]="column">
            <!-- Header -->
            <div class="flex items-center gap-2 border-b p-3">
              <h3 class="text-foreground text-sm font-semibold">
                {{ column.title }}
              </h3>
              <span
                class="bg-muted rounded-full px-1.5 py-0.5 text-xs font-medium"
              >
                {{ col.columnCards().length }}
              </span>
            </div>

            <!-- Cards -->
            <div
              class="min-h-[100px] flex-1 space-y-2 overflow-y-auto p-2"
              [class.bg-primary/5]="col.isDragOver()"
              [class.ring-2]="col.isDragOver()"
              [class.ring-primary]="col.isDragOver()"
              [class.ring-inset]="col.isDragOver()"
              role="list"
              [attr.aria-label]="column.title + ' cards'"
            >
              @for (card of col.columnCards(); track card.id) {
                <div scKanbanCard [card]="card">
                  <h4 class="text-foreground text-sm leading-tight font-medium">
                    {{ card.title }}
                  </h4>
                </div>
              }

              @if (col.columnCards().length === 0) {
                <div
                  class="text-muted-foreground flex h-24 items-center justify-center rounded-lg border-2 border-dashed text-sm"
                >
                  Drop cards here
                </div>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
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
}
