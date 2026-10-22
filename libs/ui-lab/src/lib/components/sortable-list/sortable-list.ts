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
import { cn } from '@semantic-components/ui';
import {
  ScSortable,
  type ScSortableOrientation,
} from '../../utilities/sortable';
import { ScSortableListItem } from './sortable-list-item';

/** How a list is laid out: down, along, or as a grid. */
export type ScSortableListOrientation = ScSortableOrientation;

/** A step of a keyboard move, for you to put into words. */
export interface ScSortableListAnnouncement<T> {
  readonly type: 'lift' | 'move' | 'drop' | 'cancel';
  readonly item: T;
  /** Its place, from 1. */
  readonly position: number;
  /** How many there are. */
  readonly count: number;
}

/** The one container's key, for the engine. */
const LIST = 'list';

/**
 * A list you reorder: your items (`scSortableListItem`), its value your
 * array — replaced on each move, never changed. Dragged by the pointer
 * (mouse, touch, pen), or lifted by the keyboard: Space, arrows, Space —
 * each step announced in your words. Down, along, or as a grid.
 */
@Directive({
  selector: '[scSortableList]',
  exportAs: 'scSortableList',
  host: {
    'data-slot': 'sortable-list',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-dragging]': 'dragging() || null',
    '[class]': 'class()',
  },
})
export class ScSortableList<T = unknown> {
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** Your items, in order. */
  readonly value = model<readonly T[]>([]);
  /** How it is laid out, and so which arrows move: ↑↓, ←→, or both. */
  readonly orientation = input<ScSortableListOrientation>('vertical');
  /** What a keyboard move says, step by step: yours to write. */
  readonly announce =
    input.required<(event: ScSortableListAnnouncement<T>) => string>();
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly itemRefs = contentChildren(
    forwardRef(() => ScSortableListItem),
    { descendants: true },
  );

  private readonly sortable = new ScSortable<T>({
    value: () => ({ [LIST]: this.value() }),
    setValue: (value) => this.value.set(value[LIST] ?? []),
    containers: () => [
      {
        id: () => LIST,
        element: this.element,
        orientation: () => this.orientation(),
      },
    ],
    items: () =>
      this.itemRefs().map((ref) => ({
        item: () => ref.item() as T,
        element: ref.element,
        containerId: () => LIST,
      })),
    announce: ({ type, item, position, count }) =>
      this.announce()({ type, item, position, count }),
    disabled: () => this.disabled(),
    scroller: this.element,
  });

  /** The item being moved. */
  readonly active = this.sortable.active;
  readonly dragging = this.sortable.dragging;
  readonly lifted = this.sortable.lifted;
  /** What is shown: while an item is moved, the moving order. */
  readonly items = computed(() => this.sortable.items(LIST));

  protected readonly class = computed(() =>
    cn(
      'gap-2',
      this.orientation() === 'vertical' && 'flex flex-col',
      this.orientation() === 'horizontal' && 'flex overflow-x-auto p-1',
      this.orientation() === 'grid' && 'grid',
      this.dragging() && 'cursor-grabbing select-none',
      this.classInput(),
    ),
  );

  /** Moves `item` to `index` — for Move up / Move down buttons of yours. */
  move(item: T, index: number): void {
    this.sortable.move(item, LIST, index);
  }

  /** A press on an item: a drag, once it moves far enough (or holds, by touch). */
  itemPointerDown(event: PointerEvent, item: T, element: HTMLElement): void {
    this.sortable.pointerDown(event, item, element);
  }

  /** Space or Enter lifts an item; arrows move it; Space drops, Escape cancels. */
  itemKeydown(event: KeyboardEvent, item: T, element: HTMLElement): void {
    this.sortable.keydown(event, item, element);
  }
}
