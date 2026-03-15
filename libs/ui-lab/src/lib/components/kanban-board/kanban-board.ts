import {
  Directive,
  InjectionToken,
  computed,
  input,
  model,
  output,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import type {
  KanbanCard,
  KanbanCardAddEvent,
  KanbanCardDeleteEvent,
  KanbanColumn,
  KanbanDragEvent,
} from './kanban-types';

export const SC_KANBAN_BOARD = new InjectionToken<ScKanbanBoard>(
  'SC_KANBAN_BOARD',
);

@Directive({
  selector: '[scKanbanBoard]',
  exportAs: 'scKanbanBoard',
  providers: [{ provide: SC_KANBAN_BOARD, useExisting: ScKanbanBoard }],
  host: {
    'data-slot': 'kanban-board',
    '[class]': 'class()',
    role: 'region',
    'aria-label': 'Kanban board',
  },
})
export class ScKanbanBoard {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('flex gap-4 overflow-x-auto h-full p-4', this.classInput()),
  );

  readonly columns = model<KanbanColumn[]>([]);
  readonly cards = model<KanbanCard[]>([]);
  readonly disabled = input(false);

  readonly cardMoved = output<KanbanDragEvent>();
  readonly cardAdded = output<KanbanCardAddEvent>();
  readonly cardDeleted = output<KanbanCardDeleteEvent>();
  readonly cardClick = output<KanbanCard>();
  readonly columnAdded = output<string>();
  readonly columnCollapsed = output<{ columnId: string; collapsed: boolean }>();

  readonly sortedColumns = computed(() =>
    [...this.columns()].sort((a, b) => a.order - b.order),
  );

  getCardsForColumn(columnId: string): KanbanCard[] {
    return this.cards()
      .filter((card) => card.columnId === columnId)
      .sort((a, b) => a.order - b.order);
  }

  moveCard(event: KanbanDragEvent): void {
    const cards = [...this.cards()];
    const cardIndex = cards.findIndex((c) => c.id === event.card.id);

    if (cardIndex === -1) return;

    const [movedCard] = cards.splice(cardIndex, 1);
    movedCard.columnId = event.targetColumnId;

    const targetColumnCards = cards
      .filter((c) => c.columnId === event.targetColumnId)
      .sort((a, b) => a.order - b.order);

    targetColumnCards.splice(event.targetIndex, 0, movedCard);

    targetColumnCards.forEach((card, index) => {
      card.order = index;
    });

    if (event.sourceColumnId !== event.targetColumnId) {
      const sourceColumnCards = cards
        .filter((c) => c.columnId === event.sourceColumnId)
        .sort((a, b) => a.order - b.order);

      sourceColumnCards.forEach((card, index) => {
        card.order = index;
      });
    }

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

  addCard(columnId: string, title: string): void {
    const newCard: KanbanCard = {
      id: this.generateId(),
      title,
      columnId,
      order: this.getCardsForColumn(columnId).length,
    };

    this.cards.update((cards) => [...cards, newCard]);
    this.cardAdded.emit({ columnId, title });
  }

  deleteCard(columnId: string, card: KanbanCard): void {
    this.cards.update((cards) => cards.filter((c) => c.id !== card.id));

    const columnCards = this.getCardsForColumn(columnId);
    columnCards.forEach((c, index) => {
      c.order = index;
    });

    this.cardDeleted.emit({ card, columnId });
  }

  addColumn(title: string): void {
    const newColumn: KanbanColumn = {
      id: this.generateId(),
      title,
      order: this.columns().length,
    };

    this.columns.update((columns) => [...columns, newColumn]);
    this.columnAdded.emit(title);
  }

  collapseColumn(columnId: string, collapsed: boolean): void {
    this.columns.update((columns) =>
      columns.map((col) => (col.id === columnId ? { ...col, collapsed } : col)),
    );
    this.columnCollapsed.emit({ columnId, collapsed });
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
