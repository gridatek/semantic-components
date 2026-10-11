import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  Directive,
  ElementRef,
  InjectionToken,
  Injector,
  afterNextRender,
  computed,
  inject,
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
    '[class]': 'class()',
    role: 'region',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-describedby]': 'ariaDescribedby()',
  },
})
export class ScKanbanBoard {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);
  private readonly announcer = inject(LiveAnnouncer);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Name of the board region; give each board on a page its own. */
  readonly ariaLabel = input<string>('Kanban board', { alias: 'aria-label' });
  /** Id of an element explaining the keyboard moves (Alt + arrow keys). */
  readonly ariaDescribedby = input<string | null>(null, {
    alias: 'aria-describedby',
  });
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

  /**
   * Keyboard alternative to drag and drop: moves a card one column left/right
   * (to the end of that column) or one place up/down, keeps focus on it and
   * announces the new position.
   */
  moveCardByKeyboard(
    card: KanbanCard,
    direction: 'left' | 'right' | 'up' | 'down',
  ): void {
    if (this.disabled()) return;
    const columns = this.sortedColumns();
    const columnIndex = columns.findIndex((c) => c.id === card.columnId);
    const sourceCards = this.getCardsForColumn(card.columnId);
    const sourceIndex = sourceCards.findIndex((c) => c.id === card.id);
    if (columnIndex === -1 || sourceIndex === -1) return;

    let target = columns[columnIndex];
    let targetIndex = sourceIndex;
    if (direction === 'left' || direction === 'right') {
      const next = columns[columnIndex + (direction === 'left' ? -1 : 1)];
      if (!next) return;
      target = next;
      targetIndex = this.getCardsForColumn(next.id).length;
    } else {
      targetIndex += direction === 'up' ? -1 : 1;
      if (targetIndex < 0 || targetIndex >= sourceCards.length) return;
    }

    this.moveCard({
      card,
      sourceColumnId: card.columnId,
      targetColumnId: target.id,
      sourceIndex,
      targetIndex,
    });

    const count = this.getCardsForColumn(target.id).length;
    this.announcer.announce(
      `${card.title} moved to ${target.title}, position ${targetIndex + 1} of ${count}`,
    );
    // The card may be re-rendered in another column: focus it again.
    afterNextRender(
      () =>
        this.elementRef.nativeElement
          .querySelector<HTMLElement>(`[data-card-id="${CSS.escape(card.id)}"]`)
          ?.focus(),
      { injector: this.injector },
    );
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
