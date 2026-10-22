import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DOCUMENT } from '@angular/common';
import {
  DestroyRef,
  Directive,
  ElementRef,
  Injector,
  afterNextRender,
  booleanAttribute,
  computed,
  contentChildren,
  forwardRef,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScKanbanCardNext } from './kanban-card-next';
import { ScKanbanColumnNext } from './kanban-column-next';

/** The items of each column, in order: column id → items. */
export type ScKanbanBoardNextValue<T> = Record<string, readonly T[]>;

/** A step of a keyboard move, for you to put into words. */
export interface ScKanbanBoardNextAnnouncement<T> {
  readonly type: 'lift' | 'move' | 'drop' | 'cancel';
  readonly item: T;
  /** The column it is in (after a cancel, back in). */
  readonly column: string;
  /** Its place there, from 1. */
  readonly position: number;
  /** How many items that column has. */
  readonly count: number;
}

/** How far a mouse or pen moves before a press becomes a drag. */
const DISTANCE = 4;
/** How long a touch holds still before it drags (shorter: a scroll). */
const HOLD = 250;
/** How near an edge the pointer scrolls the board or a column. */
const EDGE = 48;

/**
 * A kanban board: your columns (`scKanbanColumnNext`) and cards
 * (`scKanbanCardNext`), its value your items by column — replaced on each
 * move, never changed. Cards are dragged by the pointer (mouse, touch, pen),
 * or lifted by the keyboard: Space, arrows, Space — each step announced in
 * your words (`announce`).
 */
@Directive({
  selector: '[scKanbanBoardNext]',
  exportAs: 'scKanbanBoardNext',
  host: {
    'data-slot': 'kanban-board',
    '[attr.data-dragging]': 'dragging() || null',
    '[class]': 'class()',
  },
})
export class ScKanbanBoardNext<T = unknown> {
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);
  private readonly announcer = inject(LiveAnnouncer);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Your items by column id, in order. */
  readonly value = model<ScKanbanBoardNextValue<T>>({});
  /** What a keyboard move says, step by step: yours to write. */
  readonly announce =
    input.required<(event: ScKanbanBoardNextAnnouncement<T>) => string>();
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly columns = contentChildren(
    forwardRef(() => ScKanbanColumnNext),
    {
      descendants: true,
    },
  );
  readonly cards = contentChildren(
    forwardRef(() => ScKanbanCardNext),
    {
      descendants: true,
    },
  );

  /** The arrangement while a card is moved, before it is dropped. */
  private readonly preview = signal<ScKanbanBoardNextValue<T> | null>(null);
  /** What is shown: the moving arrangement, or the value. */
  readonly arrangement = computed(() => this.preview() ?? this.value());

  /** The item being moved, and how. */
  readonly active = signal<T | null>(null);
  private readonly mode = signal<'pointer' | 'keyboard' | null>(null);
  readonly dragging = computed(() => this.mode() === 'pointer');
  readonly lifted = computed(() => this.mode() === 'keyboard');
  /** The column a dragged card is over. */
  readonly over = signal<string | null>(null);

  protected readonly class = computed(() =>
    cn(
      'flex items-start gap-4 overflow-x-auto p-1',
      this.dragging() && 'cursor-grabbing select-none',
      this.classInput(),
    ),
  );

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stopPointer());
  }

  /** A column's items, as shown. */
  items(column: string): readonly T[] {
    return this.arrangement()[column] ?? [];
  }

  /** Moves `item` to `column`, at `index` — for a "Move to…" menu of yours. */
  move(item: T, column: string, index: number): void {
    this.value.set(place(this.value(), item, column, index));
  }

  // ── Pointer ──────────────────────────────────────────────────────────

  private press: {
    item: T;
    element: HTMLElement;
    id: number;
    x: number;
    y: number;
    grabX: number;
    grabY: number;
    timer: ReturnType<typeof setTimeout> | null;
  } | null = null;
  private pointer = { x: 0, y: 0 };
  private frame = 0;

  /** A press on a card: a drag, once it moves far enough (or holds, by touch). */
  cardPointerDown(event: PointerEvent, item: T, element: HTMLElement): void {
    if (this.disabled() || this.mode() || !event.isPrimary) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const target = event.target as Element;
    if (target.closest('button, a, input, textarea, select, [contenteditable]'))
      return;
    const rect = element.getBoundingClientRect();
    this.press = {
      item,
      element,
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      grabX: event.clientX - rect.left,
      grabY: event.clientY - rect.top,
      timer:
        event.pointerType === 'touch'
          ? setTimeout(() => this.startDrag(), HOLD)
          : null,
    };
    this.pointer = { x: event.clientX, y: event.clientY };
    const view = this.document.defaultView;
    view?.addEventListener('pointermove', this.onPointerMove);
    view?.addEventListener('pointerup', this.onPointerUp);
    view?.addEventListener('pointercancel', this.onPointerCancel);
    view?.addEventListener('keydown', this.onEscape, true);
  }

  private readonly onPointerMove = (event: PointerEvent): void => {
    const press = this.press;
    if (!press || event.pointerId !== press.id) return;
    this.pointer = { x: event.clientX, y: event.clientY };
    if (this.dragging()) {
      this.update();
      return;
    }
    const far =
      Math.hypot(event.clientX - press.x, event.clientY - press.y) > DISTANCE;
    if (!far) return;
    if (press.timer) {
      // A touch that moves before it holds: a scroll, not a drag.
      this.stopPointer();
    } else {
      this.startDrag();
    }
  };

  private readonly onPointerUp = (event: PointerEvent): void => {
    if (!this.press || event.pointerId !== this.press.id) return;
    if (this.dragging()) {
      this.value.set(this.arrangement());
      this.swallowClick();
    }
    this.endDrag();
  };

  private readonly onPointerCancel = (): void => this.endDrag();

  /** While a card is dragged by touch, the page holds still. */
  private readonly holdStill = (event: TouchEvent): void => {
    if (this.dragging()) event.preventDefault();
  };

  private readonly onEscape = (event: KeyboardEvent): void => {
    if (event.key !== 'Escape' || !this.dragging()) return;
    event.preventDefault();
    event.stopPropagation();
    this.endDrag();
  };

  private startDrag(): void {
    const press = this.press;
    if (!press) return;
    if (press.timer) clearTimeout(press.timer);
    press.timer = null;
    this.preview.set(this.value());
    this.active.set(press.item);
    this.mode.set('pointer');
    this.document.addEventListener('touchmove', this.holdStill, {
      passive: false,
    });
    this.update();
    this.scroll();
  }

  /** The card under the pointer: the arrangement follows, the card too. */
  private update(): void {
    const press = this.press;
    if (!press) return;
    const target = this.hit(press.item);
    if (!target) return;
    this.over.set(target.column);
    const at = locate(this.arrangement(), press.item);
    if (at?.column !== target.column || at.index !== target.index) {
      this.preview.set(
        place(this.arrangement(), press.item, target.column, target.index),
      );
      afterNextRender(() => this.follow(), { injector: this.injector });
    } else {
      this.follow();
    }
  }

  /** The dragged card, where the pointer holds it. */
  private follow(): void {
    const press = this.press;
    if (!press || !this.dragging()) return;
    const element = this.elementOf(press.item);
    if (!element) return;
    element.style.translate = '';
    const rect = element.getBoundingClientRect();
    element.style.translate = `${this.pointer.x - press.grabX - rect.left}px ${this.pointer.y - press.grabY - rect.top}px`;
  }

  /** Where a dragged card would go: the column across, the place down. */
  private hit(item: T): { column: string; index: number } | null {
    const { x, y } = this.pointer;
    let best: { column: ScKanbanColumnNext; distance: number } | null = null;
    for (const column of this.columns()) {
      const rect = column.element.getBoundingClientRect();
      const distance =
        x < rect.left ? rect.left - x : Math.max(0, x - rect.right);
      if (!best || distance < best.distance) best = { column, distance };
    }
    if (!best) return null;
    const id = best.column.id();
    const others = this.cards().filter(
      (card) => card.column?.id() === id && card.item() !== item,
    );
    const index = others.findIndex((card) => {
      const rect = card.element.getBoundingClientRect();
      return y < rect.top + rect.height / 2;
    });
    return { column: id, index: index < 0 ? others.length : index };
  }

  /** Near an edge of the board or the column under it: scrolled that way. */
  private scroll(): void {
    if (!this.dragging()) return;
    const { x, y } = this.pointer;
    let moved = false;
    const edge = (element: HTMLElement, horizontal: boolean) => {
      const rect = element.getBoundingClientRect();
      const [start, end, at] = horizontal
        ? [rect.left, rect.right, x]
        : [rect.top, rect.bottom, y];
      const speed =
        at < start + EDGE
          ? -Math.ceil((start + EDGE - at) / 4)
          : at > end - EDGE
            ? Math.ceil((at - end + EDGE) / 4)
            : 0;
      if (!speed) return;
      const before = horizontal ? element.scrollLeft : element.scrollTop;
      element.scrollBy(horizontal ? speed : 0, horizontal ? 0 : speed);
      moved ||=
        (horizontal ? element.scrollLeft : element.scrollTop) !== before;
    };
    edge(this.host, true);
    const column = this.columns().find((c) => c.id() === this.over());
    if (column) edge(column.element, false);
    if (moved) this.update();
    this.frame = requestAnimationFrame(() => this.scroll());
  }

  private endDrag(): void {
    const press = this.press;
    if (press && this.dragging()) {
      const element = this.elementOf(press.item);
      if (element) element.style.translate = '';
    }
    if (this.mode() === 'pointer') {
      this.preview.set(null);
      this.active.set(null);
      this.mode.set(null);
      this.over.set(null);
    }
    this.stopPointer();
  }

  private stopPointer(): void {
    if (this.press?.timer) clearTimeout(this.press.timer);
    this.press = null;
    cancelAnimationFrame(this.frame);
    const view = this.document.defaultView;
    view?.removeEventListener('pointermove', this.onPointerMove);
    view?.removeEventListener('pointerup', this.onPointerUp);
    view?.removeEventListener('pointercancel', this.onPointerCancel);
    view?.removeEventListener('keydown', this.onEscape, true);
    this.document.removeEventListener('touchmove', this.holdStill);
  }

  /** The click that ends a drag is not a click on the card. */
  private swallowClick(): void {
    const view = this.document.defaultView;
    const swallow = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    view?.addEventListener('click', swallow, { capture: true, once: true });
    setTimeout(() => view?.removeEventListener('click', swallow, true));
  }

  // ── Keyboard ─────────────────────────────────────────────────────────

  /** Space or Enter lifts a card; arrows move it; Space drops, Escape cancels. */
  cardKeydown(event: KeyboardEvent, item: T, element: HTMLElement): void {
    if (this.disabled() || this.dragging()) return;
    const lift = event.key === ' ' || event.key === 'Enter';
    if (!this.lifted() || this.active() !== item) {
      // Keys of the card's own buttons and links are theirs.
      if (!lift || event.target !== element || this.lifted()) return;
      event.preventDefault();
      this.preview.set(this.value());
      this.active.set(item);
      this.mode.set('keyboard');
      this.say('lift', item);
      return;
    }
    const rtl = getComputedStyle(element).direction === 'rtl';
    const across = { ArrowLeft: rtl ? 1 : -1, ArrowRight: rtl ? -1 : 1 }[
      event.key as 'ArrowLeft' | 'ArrowRight'
    ];
    const down = { ArrowUp: -1, ArrowDown: 1 }[
      event.key as 'ArrowUp' | 'ArrowDown'
    ];
    if (lift) {
      this.value.set(this.arrangement());
      this.say('drop', item);
      this.stopKeyboard();
    } else if (event.key === 'Escape') {
      this.stopKeyboard();
      this.say('cancel', item);
      this.refocus(item);
    } else if (across || down) {
      this.shift(item, across ?? 0, down ?? 0);
    } else if (event.key !== 'Tab') {
      return;
    }
    // Tab, while lifted, stays: drop or cancel first.
    event.preventDefault();
  }

  private shift(item: T, across: number, down: number): void {
    const at = locate(this.arrangement(), item);
    if (!at) return;
    const ids = this.columns().map((column) => column.id());
    const column = ids[ids.indexOf(at.column) + across];
    if (!column) return;
    const length = this.items(column).length;
    const index = across ? Math.min(at.index, length) : at.index + down;
    if (!across && (index < 0 || index >= length)) return;
    this.preview.set(place(this.arrangement(), item, column, index));
    this.say('move', item);
    this.refocus(item);
  }

  private stopKeyboard(): void {
    this.preview.set(null);
    this.active.set(null);
    this.mode.set(null);
  }

  private say(type: ScKanbanBoardNextAnnouncement<T>['type'], item: T): void {
    const at = locate(this.arrangement(), item);
    if (!at) return;
    this.announcer.announce(
      this.announce()({
        type,
        item,
        column: at.column,
        position: at.index + 1,
        count: this.items(at.column).length,
      }),
    );
  }

  /** Its card may be a new one, in another column: focused again. */
  private refocus(item: T): void {
    afterNextRender(() => this.elementOf(item)?.focus(), {
      injector: this.injector,
    });
  }

  private elementOf(item: T): HTMLElement | undefined {
    return this.cards().find((card) => card.item() === item)?.element;
  }
}

/** Where `item` is: its column and place. */
function locate<T>(
  value: ScKanbanBoardNextValue<T>,
  item: T,
): { column: string; index: number } | null {
  for (const [column, items] of Object.entries(value)) {
    const index = items.indexOf(item);
    if (index >= 0) return { column, index };
  }
  return null;
}

/** `value` with `item` taken out and put in `column` at `index`: a new one. */
function place<T>(
  value: ScKanbanBoardNextValue<T>,
  item: T,
  column: string,
  index: number,
): ScKanbanBoardNextValue<T> {
  const next: Record<string, readonly T[]> = {};
  for (const [id, items] of Object.entries(value)) {
    next[id] = items.includes(item) ? items.filter((i) => i !== item) : items;
  }
  const target = [...(next[column] ?? [])];
  target.splice(Math.max(0, Math.min(index, target.length)), 0, item);
  next[column] = target;
  return next;
}
