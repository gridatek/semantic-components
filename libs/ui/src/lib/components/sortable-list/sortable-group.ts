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
import { ScSortable } from './sortable';
import { ScSortableList } from './sortable-list';
import { ScSortableListItem } from './sortable-list-item';

/** The items of each list, in order: list key → items. */
export type ScSortableGroupValue<T> = Record<string, readonly T[]>;

/** A step of a keyboard move, for you to put into words. */
export interface ScSortableGroupAnnouncement<T> {
  readonly type: 'lift' | 'move' | 'drop' | 'cancel';
  readonly item: T;
  /** The list it is in (after a cancel, back in). */
  readonly list: string;
  /** Its place there, from 1. */
  readonly position: number;
  /** How many items that list has. */
  readonly count: number;
}

/**
 * Sortable lists, linked: your lists (`[scSortableList]="key"`), its value
 * your items by list — an item dragged, or lifted by the keyboard, from one
 * list to another (a kanban's columns). Replaced on each move, never
 * changed. Each keyboard step announced in your words.
 */
@Directive({
  selector: '[scSortableGroup]',
  exportAs: 'scSortableGroup',
  host: {
    '[attr.data-dragging]': 'dragging() || null',
    '[class]': 'class()',
  },
})
export class ScSortableGroup<T = unknown> {
  readonly classInput = input<string>('', { alias: 'class' });
  /** Your items by list key, in order. */
  readonly value = model<ScSortableGroupValue<T>>({});
  /** What a keyboard move says, step by step: yours to write. */
  readonly announce =
    input.required<(event: ScSortableGroupAnnouncement<T>) => string>();
  readonly disabled = input(false, { transform: booleanAttribute });

  private readonly lists = contentChildren(
    forwardRef(() => ScSortableList),
    { descendants: true },
  );
  private readonly itemRefs = contentChildren(
    forwardRef(() => ScSortableListItem),
    { descendants: true },
  );

  private readonly sortable = new ScSortable<T>({
    value: () => this.value(),
    setValue: (value) => this.value.set(value),
    containers: () =>
      this.lists().map((list) => ({
        id: () => list.key(),
        element: list.element,
        orientation: () => list.orientation(),
      })),
    items: () =>
      this.itemRefs().map((ref) => ({
        item: () => ref.item() as T,
        element: ref.element,
        containerId: () => ref.list.key(),
      })),
    announce: ({ container, ...event }) =>
      this.announce()({ ...event, list: container }),
    disabled: () => this.disabled(),
    scroller: inject<ElementRef<HTMLElement>>(ElementRef).nativeElement,
  });

  /** The item being moved. */
  readonly active = this.sortable.active;
  readonly dragging = this.sortable.dragging;
  readonly lifted = this.sortable.lifted;
  /** The list a dragged item is over. */
  readonly over = this.sortable.over.asReadonly();

  private readonly class = computed(() =>
    cn(this.dragging() && 'cursor-grabbing select-none', this.classInput()),
  );

  /** A list's items, as shown: while an item is moved, the moving order. */
  items(list: string): readonly T[] {
    return this.sortable.items(list);
  }

  /** Moves `item` to `list`, at `index` — for a "Move to…" menu of yours. */
  move(item: T, list: string, index: number): void {
    this.sortable.move(item, list, index);
  }

  /** A press on an item: a drag, once it moves far enough (or holds, by touch). */
  itemPointerDown(event: PointerEvent, item: T, element: HTMLElement): void {
    this.sortable.pointerDown(event, item, element);
  }

  /** Space or Enter lifts an item; arrows move it, across lists too; Space drops, Escape cancels. */
  itemKeydown(event: KeyboardEvent, item: T, element: HTMLElement): void {
    this.sortable.keydown(event, item, element);
  }
}
