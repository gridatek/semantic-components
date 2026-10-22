import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DOCUMENT } from '@angular/common';
import {
  DestroyRef,
  Injector,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';

/** Items by container id, in order. */
export type ScSortableValue<T> = Record<string, readonly T[]>;

/** How a container lays out its items — and so which arrows move in it. */
export type ScSortableOrientation = 'vertical' | 'horizontal' | 'grid';

/** A step of a keyboard move, for the consumer to put into words. */
export interface ScSortableAnnouncement<T> {
  readonly type: 'lift' | 'move' | 'drop' | 'cancel';
  readonly item: T;
  /** The container it is in (after a cancel, back in). */
  readonly container: string;
  /** Its place there, from 1. */
  readonly position: number;
  /** How many items that container has. */
  readonly count: number;
}

/** A container, as the engine sees it. */
export interface ScSortableContainerRef {
  id(): string;
  readonly element: HTMLElement;
  orientation(): ScSortableOrientation;
}

/** An item, as the engine sees it. */
export interface ScSortableItemRef<T> {
  item(): T;
  readonly element: HTMLElement;
  /** The container it is in. */
  containerId(): string | undefined;
}

/** What a component gives the engine. */
export interface ScSortableOptions<T> {
  value(): ScSortableValue<T>;
  setValue(value: ScSortableValue<T>): void;
  containers(): readonly ScSortableContainerRef[];
  items(): readonly ScSortableItemRef<T>[];
  announce(event: ScSortableAnnouncement<T>): string;
  disabled(): boolean;
  /** What scrolls around the containers, besides each container itself. */
  scroller: HTMLElement;
}

/** How far a mouse or pen moves before a press becomes a drag. */
const DISTANCE = 4;
/** How long a touch holds still before it drags (shorter: a scroll). */
const HOLD = 250;
/** How near an edge the pointer scrolls. */
const EDGE = 48;

/**
 * Sorting items, within and between containers: dragged by the pointer
 * (mouse, touch, pen), or lifted by the keyboard — Space, arrows, Space,
 * Escape — each keyboard step announced in the consumer's words. The value
 * is replaced on each move, never changed. Made in an injection context.
 * Internal: the kanban board and the sortable list are built on it.
 */
export class ScSortable<T> {
  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);
  private readonly announcer = inject(LiveAnnouncer);

  /** The arrangement while an item is moved, before it is dropped. */
  private readonly preview = signal<ScSortableValue<T> | null>(null);
  /** What is shown: the moving arrangement, or the value. */
  readonly arrangement = computed(() => this.preview() ?? this.options.value());

  /** The item being moved, and how. */
  readonly active = signal<T | null>(null);
  private readonly mode = signal<'pointer' | 'keyboard' | null>(null);
  readonly dragging = computed(() => this.mode() === 'pointer');
  readonly lifted = computed(() => this.mode() === 'keyboard');
  /** The container a dragged item is over. */
  readonly over = signal<string | null>(null);

  constructor(private readonly options: ScSortableOptions<T>) {
    inject(DestroyRef).onDestroy(() => this.stopPointer());
  }

  /** A container's items, as shown. */
  items(container: string): readonly T[] {
    return this.arrangement()[container] ?? [];
  }

  /** Moves `item` to `container`, at `index`, at once. */
  move(item: T, container: string, index: number): void {
    this.options.setValue(place(this.options.value(), item, container, index));
  }

  // ── Pointer ──────────────────────────────────────────────────────────

  private press: {
    item: T;
    id: number;
    x: number;
    y: number;
    grabX: number;
    grabY: number;
    timer: ReturnType<typeof setTimeout> | null;
  } | null = null;
  private pointer = { x: 0, y: 0 };
  private frame = 0;

  /** A press on an item: a drag, once it moves far enough (or holds, by touch). */
  pointerDown(event: PointerEvent, item: T, element: HTMLElement): void {
    if (this.options.disabled() || this.mode() || !event.isPrimary) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const target = event.target as Element;
    if (target.closest('button, a, input, textarea, select, [contenteditable]'))
      return;
    const rect = element.getBoundingClientRect();
    this.press = {
      item,
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
      this.options.setValue(this.arrangement());
      this.swallowClick();
    }
    this.endDrag();
  };

  private readonly onPointerCancel = (): void => this.endDrag();

  /** While an item is dragged by touch, the page holds still. */
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
    this.preview.set(this.options.value());
    this.active.set(press.item);
    this.mode.set('pointer');
    this.document.addEventListener('touchmove', this.holdStill, {
      passive: false,
    });
    this.update();
    this.scroll();
  }

  /** The place under the pointer: the arrangement follows, the item too. */
  private update(): void {
    const press = this.press;
    if (!press) return;
    const target = this.hit(press.item);
    if (!target) return;
    this.over.set(target.container);
    const at = locate(this.arrangement(), press.item);
    if (at?.container !== target.container || at.index !== target.index) {
      this.preview.set(
        place(this.arrangement(), press.item, target.container, target.index),
      );
      afterNextRender(() => this.follow(), { injector: this.injector });
    } else {
      this.follow();
    }
  }

  /** The dragged item, where the pointer holds it. */
  private follow(): void {
    const press = this.press;
    if (!press || !this.dragging()) return;
    const element = this.elementOf(press.item);
    if (!element) return;
    element.style.translate = '';
    const rect = element.getBoundingClientRect();
    element.style.translate = `${this.pointer.x - press.grabX - rect.left}px ${this.pointer.y - press.grabY - rect.top}px`;
  }

  /**
   * Where a dragged item would go. The container: the nearest across its
   * flow (a column, anywhere down it). The place: before the first item the
   * pointer is before — down a list, along a row, in reading order in a grid.
   */
  private hit(item: T): { container: string; index: number } | null {
    const { x, y } = this.pointer;
    let best: { container: ScSortableContainerRef; distance: number } | null =
      null;
    for (const container of this.options.containers()) {
      const rect = container.element.getBoundingClientRect();
      const dx = x < rect.left ? rect.left - x : Math.max(0, x - rect.right);
      const dy = y < rect.top ? rect.top - y : Math.max(0, y - rect.bottom);
      const orientation = container.orientation();
      const distance =
        orientation === 'vertical'
          ? dx * 1e4 + dy
          : orientation === 'horizontal'
            ? dy * 1e4 + dx
            : Math.hypot(dx, dy);
      if (!best || distance < best.distance) best = { container, distance };
    }
    if (!best) return null;
    const { container } = best;
    const id = container.id();
    const orientation = container.orientation();
    const rtl = getComputedStyle(container.element).direction === 'rtl';
    const before = (rect: DOMRect) => {
      const alongX = rtl
        ? x > rect.left + rect.width / 2
        : x < rect.left + rect.width / 2;
      if (orientation === 'vertical') return y < rect.top + rect.height / 2;
      if (orientation === 'horizontal') return alongX;
      return y < rect.top || (y <= rect.bottom && alongX);
    };
    const others = this.options
      .items()
      .filter((ref) => ref.containerId() === id && ref.item() !== item);
    const index = others.findIndex((ref) =>
      before(ref.element.getBoundingClientRect()),
    );
    return { container: id, index: index < 0 ? others.length : index };
  }

  /** Near an edge of what scrolls, or of the container under it: scrolled. */
  private scroll(): void {
    if (!this.dragging()) return;
    const { x, y } = this.pointer;
    let moved = false;
    const edge = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const speed = (at: number, start: number, end: number) =>
        at < start + EDGE
          ? -Math.ceil((start + EDGE - at) / 4)
          : at > end - EDGE
            ? Math.ceil((at - end + EDGE) / 4)
            : 0;
      const across = element.scrollWidth > element.clientWidth;
      const down = element.scrollHeight > element.clientHeight;
      const sx = across ? speed(x, rect.left, rect.right) : 0;
      const sy = down ? speed(y, rect.top, rect.bottom) : 0;
      if (!sx && !sy) return;
      const [left, top] = [element.scrollLeft, element.scrollTop];
      element.scrollBy(sx, sy);
      moved ||= element.scrollLeft !== left || element.scrollTop !== top;
    };
    edge(this.options.scroller);
    const container = this.options
      .containers()
      .find((c) => c.id() === this.over());
    if (container && container.element !== this.options.scroller) {
      edge(container.element);
    }
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

  /** The click that ends a drag is not a click on the item. */
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

  /**
   * Space or Enter lifts an item; the arrows move it — along its container
   * (by a row too, in a grid), or to the container before or after; Home and
   * End to its container's ends. Space or Enter drops it, Escape puts it back.
   */
  keydown(event: KeyboardEvent, item: T, element: HTMLElement): void {
    if (this.options.disabled() || this.dragging()) return;
    const lift = event.key === ' ' || event.key === 'Enter';
    if (!this.lifted() || this.active() !== item) {
      // Keys of the item's own buttons and links are theirs.
      if (!lift || event.target !== element || this.lifted()) return;
      event.preventDefault();
      this.preview.set(this.options.value());
      this.active.set(item);
      this.mode.set('keyboard');
      this.say('lift', item);
      return;
    }
    if (lift) {
      this.options.setValue(this.arrangement());
      this.say('drop', item);
      this.stopKeyboard();
    } else if (event.key === 'Escape') {
      this.stopKeyboard();
      this.say('cancel', item);
      this.refocus(item);
    } else if (!this.step(event.key, item, element) && event.key !== 'Tab') {
      return;
    }
    // Tab, while lifted, stays: drop or cancel first.
    event.preventDefault();
  }

  /** An arrow, Home or End on a lifted item: moved, if it can go. */
  private step(key: string, item: T, element: HTMLElement): boolean {
    const at = locate(this.arrangement(), item);
    if (!at) return false;
    const containers = this.options.containers();
    const container = containers.find((c) => c.id() === at.container);
    if (!container) return false;
    const orientation = container.orientation();
    const rtl = getComputedStyle(element).direction === 'rtl';
    const forward = rtl ? 'ArrowLeft' : 'ArrowRight';
    const back = rtl ? 'ArrowRight' : 'ArrowLeft';
    const length = this.items(at.container).length;
    // Along the container: ±1 (or a row, in a grid), or its ends.
    const along: Record<string, number | undefined> =
      orientation === 'vertical'
        ? { ArrowDown: 1, ArrowUp: -1 }
        : orientation === 'horizontal'
          ? { [forward]: 1, [back]: -1 }
          : {
              [forward]: 1,
              [back]: -1,
              ArrowDown: this.perRow(at.container),
              ArrowUp: -this.perRow(at.container),
            };
    if (key === 'Home' || key === 'End') {
      const index = key === 'Home' ? 0 : length - 1;
      return this.shiftTo(item, at.container, index);
    }
    const by = along[key];
    if (by !== undefined) {
      const index = at.index + by;
      if (index < 0 || index >= length) return true;
      return this.shiftTo(item, at.container, index);
    }
    // Across: to the container before or after — beside for columns,
    // above or below for rows.
    const across: Record<string, number | undefined> =
      orientation === 'horizontal'
        ? { ArrowDown: 1, ArrowUp: -1 }
        : orientation === 'vertical'
          ? { [forward]: 1, [back]: -1 }
          : {};
    const to = across[key];
    if (to === undefined) return false;
    const ids = containers.map((c) => c.id());
    const target = ids[ids.indexOf(at.container) + to];
    if (!target) return true;
    return this.shiftTo(
      item,
      target,
      Math.min(at.index, this.items(target).length),
    );
  }

  private shiftTo(item: T, container: string, index: number): boolean {
    this.preview.set(place(this.arrangement(), item, container, index));
    this.say('move', item);
    this.refocus(item);
    return true;
  }

  /** How many items a grid container shows on its first row. */
  private perRow(container: string): number {
    const refs = this.options
      .items()
      .filter((ref) => ref.containerId() === container);
    if (!refs.length) return 1;
    const top = refs[0].element.getBoundingClientRect().top;
    const row = refs.filter(
      (ref) => Math.abs(ref.element.getBoundingClientRect().top - top) < 2,
    );
    return Math.max(1, row.length);
  }

  private stopKeyboard(): void {
    this.preview.set(null);
    this.active.set(null);
    this.mode.set(null);
  }

  private say(type: ScSortableAnnouncement<T>['type'], item: T): void {
    const at = locate(this.arrangement(), item);
    if (!at) return;
    this.announcer.announce(
      this.options.announce({
        type,
        item,
        container: at.container,
        position: at.index + 1,
        count: this.items(at.container).length,
      }),
    );
  }

  /** Its element may be a new one, in another container: focused again. */
  private refocus(item: T): void {
    afterNextRender(() => this.elementOf(item)?.focus(), {
      injector: this.injector,
    });
  }

  private elementOf(item: T): HTMLElement | undefined {
    return this.options.items().find((ref) => ref.item() === item)?.element;
  }
}

/** Where `item` is: its container and place. */
function locate<T>(
  value: ScSortableValue<T>,
  item: T,
): { container: string; index: number } | null {
  for (const [container, items] of Object.entries(value)) {
    const index = items.indexOf(item);
    if (index >= 0) return { container, index };
  }
  return null;
}

/** `value` with `item` taken out and put in `container` at `index`: a new one. */
function place<T>(
  value: ScSortableValue<T>,
  item: T,
  container: string,
  index: number,
): ScSortableValue<T> {
  const next: Record<string, readonly T[]> = {};
  for (const [id, items] of Object.entries(value)) {
    next[id] = items.includes(item) ? items.filter((i) => i !== item) : items;
  }
  const target = [...(next[container] ?? [])];
  target.splice(Math.max(0, Math.min(index, target.length)), 0, item);
  next[container] = target;
  return next;
}
