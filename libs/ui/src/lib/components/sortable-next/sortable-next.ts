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
import { injectStyle } from '../../config/style';
import {
  ScSortableNextEngine,
  type ScSortableOrientation,
} from './sortable-next-engine';
import { ScSortableNextGroup } from './sortable-next-group';
import { ScSortableNextItem } from './sortable-next-item';

/** How a list is laid out: down, along, or as a grid. */
export type ScSortableNextOrientation = ScSortableOrientation;

/** A step of a keyboard move, for you to put into words. */
export interface ScSortableNextAnnouncement<T> {
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
 * A list you reorder: your items (`scSortableNextItem`), its value your
 * array — replaced on each move, never changed. Dragged by the pointer
 * (mouse, touch, pen), or lifted by the keyboard: Space, arrows, Space —
 * each step announced in your words. Down, along, or as a grid. In a
 * `scSortableNextGroup`, one of its linked lists — `[scSortableNext]="key"`:
 * items go from list to list, the group holding the value.
 */
@Directive({
  selector: '[scSortableNext]',
  exportAs: 'scSortableNext',
  host: {
    'data-slot': 'sortable',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-dragging]': 'dragging() || null',
    '[attr.data-over]': 'isOver() || null',
    '[class]': 'class()',
  },
})
export class ScSortableNext<T = unknown> {
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  /** A drop zone's corners: the style's. */
  private readonly corners = injectStyle().frameXs;
  /** The group it is linked in, if any: its value and moves are the group's. */
  private readonly group = inject<ScSortableNextGroup<T>>(
    forwardRef(() => ScSortableNextGroup),
    { optional: true },
  );

  readonly classInput = input<string>('', { alias: 'class' });
  /** In a group: this list's key in the group's value. */
  readonly key = input('', { alias: 'scSortableNext' });
  /** Your items, in order (alone; in a group, the group's value). */
  readonly value = model<readonly T[]>([]);
  /** How it is laid out, and so which arrows move: ↑↓, ←→, or both. */
  readonly orientation = input<ScSortableNextOrientation>('vertical');
  /** What a keyboard move says, step by step: yours to write (in a group, the group's). */
  readonly announce = input<
    ((event: ScSortableNextAnnouncement<T>) => string) | undefined
  >(undefined);
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Disabled, or its group is. */
  readonly off = computed(
    () => this.disabled() || (this.group?.disabled() ?? false),
  );

  readonly itemRefs = contentChildren(
    forwardRef(() => ScSortableNextItem),
    { descendants: true },
  );

  /** Its own engine, alone; in a group, the group's. */
  private readonly sortable = this.group
    ? null
    : new ScSortableNextEngine<T>({
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
  /** The item just dropped, for a moment. */
  readonly dropped = computed(() =>
    this.group ? this.group.dropped() : (this.sortable?.dropped() ?? null),
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
      'relative gap-2',
      this.orientation() === 'vertical' && 'flex flex-col',
      this.orientation() === 'horizontal' && 'flex overflow-x-auto p-1',
      this.orientation() === 'grid' && 'grid',
      this.dragging() && 'cursor-grabbing select-none',
      // In a group: a place to drop, all its height, lit while an item is over.
      this.group && cn('min-h-24 p-1 transition-colors', this.corners),
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
