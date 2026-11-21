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
import { cn } from 'cn';
import { ScSortable, type ScSortableOrientation } from './sortable';
import { ScSortableGroup } from './sortable-group';
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
 * each step announced in your words. Down, along, or as a grid. In a
 * `scSortableGroup`, one of its linked lists — `[scSortableList]="key"`:
 * items go from list to list, the group holding the value.
 */
@Directive({
  selector: '[scSortableList]',
  exportAs: 'scSortableList',
  host: {
    'data-slot': 'sortable-list',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-dragging]': 'dragging() || null',
    '[attr.data-over]': 'isOver() || null',
    '[class]': 'class()',
  },
})
export class ScSortableList<T = unknown> {
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  /** The group it is linked in, if any: its value and moves are the group's. */
  private readonly group = inject<ScSortableGroup<T>>(
    forwardRef(() => ScSortableGroup),
    { optional: true },
  );

  readonly classInput = input<string>('', { alias: 'class' });
  /** In a group: this list's key in the group's value. */
  readonly key = input('', { alias: 'scSortableList' });
  /** Your items, in order (alone; in a group, the group's value). */
  readonly value = model<readonly T[]>([]);
  /** How it is laid out, and so which arrows move: ↑↓, ←→, or both. */
  readonly orientation = input<ScSortableListOrientation>('vertical');
  /** What a keyboard move says, step by step: yours to write (in a group, the group's). */
  readonly announce = input<
    ((event: ScSortableListAnnouncement<T>) => string) | undefined
  >(undefined);
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Disabled, or its group is. */
  readonly off = computed(
    () => this.disabled() || (this.group?.disabled() ?? false),
  );

  readonly itemRefs = contentChildren(
    forwardRef(() => ScSortableListItem),
    { descendants: true },
  );

  /** Its own engine, alone; in a group, the group's. */
  private readonly sortable = this.group
    ? null
    : new ScSortable<T>({
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
          this.announce()?.({ type, item, position, count }) ?? '',
        disabled: () => this.disabled(),
        scroller: this.element,
      });

  /** The item being moved. */
  readonly active = computed(() =>
    this.group ? this.group.active() : (this.sortable?.active() ?? null),
  );
  readonly dragging = computed(() =>
    this.group ? this.group.dragging() : !!this.sortable?.dragging(),
  );
  readonly lifted = computed(() =>
    this.group ? this.group.lifted() : !!this.sortable?.lifted(),
  );
  /** In a group: a dragged item is over it. */
  private readonly isOver = computed(
    () => !!this.group && this.group.over() === this.key(),
  );

  /** What is shown: while an item is moved, the moving order. */
  readonly items = computed(() =>
    this.group
      ? this.group.items(this.key())
      : (this.sortable?.items(LIST) ?? []),
  );

  private readonly class = computed(() =>
    cn(
      'gap-2',
      this.orientation() === 'vertical' && 'flex flex-col',
      this.orientation() === 'horizontal' && 'flex overflow-x-auto p-1',
      this.orientation() === 'grid' && 'grid',
      this.dragging() && 'cursor-grabbing select-none',
      // In a group: a place to drop, all its height, lit while an item is over.
      this.group && 'min-h-24 rounded-lg p-1 transition-colors',
      this.isOver() && 'bg-accent/60',
      this.classInput(),
    ),
  );

  /** Moves `item` to `index` — for Move up / Move down buttons of yours. */
  move(item: T, index: number): void {
    if (this.group) this.group.move(item, this.key(), index);
    else this.sortable?.move(item, LIST, index);
  }

  /** A press on an item: a drag, once it moves far enough (or holds, by touch). */
  itemPointerDown(event: PointerEvent, item: T, element: HTMLElement): void {
    if (this.group) this.group.itemPointerDown(event, item, element);
    else this.sortable?.pointerDown(event, item, element);
  }

  /** Space or Enter lifts an item; arrows move it; Space drops, Escape cancels. */
  itemKeydown(event: KeyboardEvent, item: T, element: HTMLElement): void {
    if (this.group) this.group.itemKeydown(event, item, element);
    else this.sortable?.keydown(event, item, element);
  }
}
