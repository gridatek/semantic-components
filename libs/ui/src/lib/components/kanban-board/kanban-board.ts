import {
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  contentChildren,
  forwardRef,
  inject,
  input,
  model,
} from '@angular/core';
import { ScSortable } from '../../utilities/sortable';
import { cn } from '../../utils/cn/cn';
import { ScKanbanCard } from './kanban-card';
import { ScKanbanColumn } from './kanban-column';

/** The items of each column, in order: column id → items. */
export type ScKanbanBoardValue<T> = Record<string, readonly T[]>;

/** A step of a keyboard move, for you to put into words. */
export interface ScKanbanBoardAnnouncement<T> {
  readonly type: 'lift' | 'move' | 'drop' | 'cancel';
  readonly item: T;
  /** The column it is in (after a cancel, back in). */
  readonly column: string;
  /** Its place there, from 1. */
  readonly position: number;
  /** How many items that column has. */
  readonly count: number;
}

/**
 * A kanban board: your columns (`scKanbanColumn`) and cards
 * (`scKanbanCard`), its value your items by column — replaced on each
 * move, never changed. Cards are dragged by the pointer (mouse, touch, pen),
 * or lifted by the keyboard: Space, arrows, Space — each step announced in
 * your words (`announce`).
 */
@Directive({
  selector: '[scKanbanBoard]',
  exportAs: 'scKanbanBoard',
  host: {
    'data-slot': 'kanban-board',
    '[attr.data-dragging]': 'dragging() || null',
    '[class]': 'class()',
  },
})
export class ScKanbanBoard<T = unknown> {
  readonly classInput = input<string>('', { alias: 'class' });
  /** Your items by column id, in order. */
  readonly value = model<ScKanbanBoardValue<T>>({});
  /** What a keyboard move says, step by step: yours to write. */
  readonly announce =
    input.required<(event: ScKanbanBoardAnnouncement<T>) => string>();
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly columns = contentChildren(
    forwardRef(() => ScKanbanColumn),
    { descendants: true },
  );
  readonly cards = contentChildren(
    forwardRef(() => ScKanbanCard),
    { descendants: true },
  );

  private readonly sortable = new ScSortable<T>({
    value: () => this.value(),
    setValue: (value) => this.value.set(value),
    containers: () =>
      this.columns().map((column) => ({
        id: () => column.id(),
        element: column.element,
        orientation: () => 'vertical' as const,
      })),
    items: () =>
      this.cards().map((card) => ({
        item: () => card.item() as T,
        element: card.element,
        containerId: () => card.column?.id(),
      })),
    announce: ({ container, ...event }) =>
      this.announce()({ ...event, column: container }),
    disabled: () => this.disabled(),
    scroller: inject<ElementRef<HTMLElement>>(ElementRef).nativeElement,
  });

  /** What is shown: the moving arrangement, or the value. */
  readonly arrangement = this.sortable.arrangement;
  /** The card being moved. */
  readonly active = this.sortable.active;
  readonly dragging = this.sortable.dragging;
  readonly lifted = this.sortable.lifted;
  /** The column a dragged card is over. */
  readonly over = this.sortable.over.asReadonly();

  protected readonly class = computed(() =>
    cn(
      'flex items-start gap-4 overflow-x-auto p-1',
      this.dragging() && 'cursor-grabbing select-none',
      this.classInput(),
    ),
  );

  /** A column's items, as shown. */
  items(column: string): readonly T[] {
    return this.sortable.items(column);
  }

  /** Moves `item` to `column`, at `index` — for a "Move to…" menu of yours. */
  move(item: T, column: string, index: number): void {
    this.sortable.move(item, column, index);
  }

  /** A press on a card: a drag, once it moves far enough (or holds, by touch). */
  cardPointerDown(event: PointerEvent, item: T, element: HTMLElement): void {
    this.sortable.pointerDown(event, item, element);
  }

  /** Space or Enter lifts a card; arrows move it; Space drops, Escape cancels. */
  cardKeydown(event: KeyboardEvent, item: T, element: HTMLElement): void {
    this.sortable.keydown(event, item, element);
  }
}
