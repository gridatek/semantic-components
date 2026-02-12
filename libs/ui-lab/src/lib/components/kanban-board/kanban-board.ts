import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScKanbanColumn } from './kanban-column';
import type {
  KanbanCard,
  KanbanCardAddEvent,
  KanbanCardDeleteEvent,
  KanbanColumn,
  KanbanDragEvent,
} from './kanban-types';

@Component({
  selector: 'sc-kanban-board',
  imports: [ScKanbanColumn],
  template: `
    <div [class]="containerClass()" role="region" aria-label="Kanban board">
      @for (column of sortedColumns(); track column.id) {
        <sc-kanban-column
          [column]="column"
          [cards]="getCardsForColumn(column.id)"
          [disabled]="disabled()"
          [showAddButton]="showAddCard()"
          [showDeleteCard]="showDeleteCard()"
          (cardMoved)="onCardMoved($event)"
          (addCard)="onAddCard(column.id, $event)"
          (deleteCard)="onDeleteCard(column.id, $event)"
          (cardClick)="cardClick.emit($event)"
          (collapseChange)="onColumnCollapse(column.id, $event)"
        />
      }

      @if (showAddColumn()) {
        <div class="flex-shrink-0 min-w-[280px] max-w-[320px]">
          @if (isAddingColumn()) {
            <div class="p-3 bg-muted/30 border rounded-lg">
              <input
                #columnInput
                type="text"
                class="w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter column title..."
                (keydown.enter)="submitNewColumn($event)"
                (keydown.escape)="cancelAddingColumn()"
                (blur)="onColumnInputBlur()"
              />
              <div class="flex items-center gap-2 mt-2">
                <button
                  type="button"
                  class="px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                  (mousedown)="submitNewColumnFromButton()"
                >
                  Add Column
                </button>
                <button
                  type="button"
                  class="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  (mousedown)="cancelAddingColumn()"
                >
                  Cancel
                </button>
              </div>
            </div>
          } @else {
            <button
              type="button"
              class="w-full p-3 border-2 border-dashed rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-muted/30 transition-colors flex items-center justify-center gap-2"
              (click)="startAddingColumn()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              Add Column
            </button>
          }
        </div>
      }
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScKanbanBoard {
  readonly columns = model<KanbanColumn[]>([]);
  readonly cards = model<KanbanCard[]>([]);
  readonly disabled = input(false);
  readonly showAddCard = input(true);
  readonly showDeleteCard = input(true);
  readonly showAddColumn = input(true);
  readonly class = input<string>('');

  readonly cardMoved = output<KanbanDragEvent>();
  readonly cardAdded = output<KanbanCardAddEvent>();
  readonly cardDeleted = output<KanbanCardDeleteEvent>();
  readonly cardClick = output<KanbanCard>();
  readonly columnAdded = output<string>();
  readonly columnCollapsed = output<{ columnId: string; collapsed: boolean }>();

  private isAddingColumnState = false;

  protected readonly containerClass = computed(() =>
    cn('flex gap-4 p-4 overflow-x-auto h-full', this.class()),
  );

  protected readonly sortedColumns = computed(() =>
    [...this.columns()].sort((a, b) => a.order - b.order),
  );

  protected getCardsForColumn(columnId: string): KanbanCard[] {
    return this.cards()
      .filter((card) => card.columnId === columnId)
      .sort((a, b) => a.order - b.order);
  }

  protected onCardMoved(event: KanbanDragEvent): void {
    const cards = [...this.cards()];
    const cardIndex = cards.findIndex((c) => c.id === event.card.id);

    if (cardIndex === -1) return;

    // Remove card from old position
    const [movedCard] = cards.splice(cardIndex, 1);

    // Update card's column
    movedCard.columnId = event.targetColumnId;

    // Get cards in target column (excluding the moved card)
    const targetColumnCards = cards
      .filter((c) => c.columnId === event.targetColumnId)
      .sort((a, b) => a.order - b.order);

    // Insert at new position
    targetColumnCards.splice(event.targetIndex, 0, movedCard);

    // Update order for all cards in target column
    targetColumnCards.forEach((card, index) => {
      card.order = index;
    });

    // If moving to different column, update source column orders
    if (event.sourceColumnId !== event.targetColumnId) {
      const sourceColumnCards = cards
        .filter((c) => c.columnId === event.sourceColumnId)
        .sort((a, b) => a.order - b.order);

      sourceColumnCards.forEach((card, index) => {
        card.order = index;
      });
    }

    // Rebuild full cards array
    const otherCards = cards.filter(
      (c) =>
        c.columnId !== event.targetColumnId &&
        c.columnId !== event.sourceColumnId,
    );

    const sourceColumnCards =
      event.sourceColumnId !== event.targetColumnId
        ? cards.filter((c) => c.columnId === event.sourceColumnId)
        : [];

    this.cards.set([...otherCards, ...sourceColumnCards, ...targetColumnCards]);
    this.cardMoved.emit(event);
  }

  protected onAddCard(columnId: string, title: string): void {
    const newCard: KanbanCard = {
      id: this.generateId(),
      title,
      columnId,
      order: this.getCardsForColumn(columnId).length,
    };

    this.cards.update((cards) => [...cards, newCard]);
    this.cardAdded.emit({ columnId, title });
  }

  protected onDeleteCard(columnId: string, card: KanbanCard): void {
    this.cards.update((cards) => cards.filter((c) => c.id !== card.id));

    // Reorder remaining cards in column
    const columnCards = this.getCardsForColumn(columnId);
    columnCards.forEach((c, index) => {
      c.order = index;
    });

    this.cardDeleted.emit({ card, columnId });
  }

  protected onColumnCollapse(columnId: string, collapsed: boolean): void {
    this.columns.update((columns) =>
      columns.map((col) => (col.id === columnId ? { ...col, collapsed } : col)),
    );
    this.columnCollapsed.emit({ columnId, collapsed });
  }

  protected isAddingColumn(): boolean {
    return this.isAddingColumnState;
  }

  protected startAddingColumn(): void {
    this.isAddingColumnState = true;
    requestAnimationFrame(() => {
      const input = document.querySelector(
        'sc-kanban-board input[type="text"]',
      ) as HTMLInputElement;
      input?.focus();
    });
  }

  protected cancelAddingColumn(): void {
    this.isAddingColumnState = false;
  }

  protected submitNewColumn(event: Event): void {
    event.preventDefault();
    const input = event.target as HTMLInputElement;
    const title = input.value.trim();

    if (title) {
      this.addColumn(title);
      input.value = '';
    }

    this.isAddingColumnState = false;
  }

  protected submitNewColumnFromButton(): void {
    const input = document.querySelector(
      'sc-kanban-board input[type="text"]',
    ) as HTMLInputElement;
    const title = input?.value.trim();

    if (title) {
      this.addColumn(title);
    }

    this.isAddingColumnState = false;
  }

  protected onColumnInputBlur(): void {
    setTimeout(() => {
      if (this.isAddingColumnState) {
        this.isAddingColumnState = false;
      }
    }, 150);
  }

  private addColumn(title: string): void {
    const newColumn: KanbanColumn = {
      id: this.generateId(),
      title,
      order: this.columns().length,
    };

    this.columns.update((columns) => [...columns, newColumn]);
    this.columnAdded.emit(title);
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
