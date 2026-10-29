import { Service, type Signal, signal } from '@angular/core';
import {
  NOTHING_VISIBLE,
  NOT_SCROLLABLE,
  SAME,
  type ScMessageScrollerAlign,
  type ScMessageScrollerScrollable,
  type ScMessageScrollerVisibility,
  firstVisibleRow,
  gapOf,
  lastAnchor,
  maxScrollTop,
  nextAnchor,
  rowsHeight,
  rowsOf,
  sameScrollable,
  sameVisibility,
  scrollableOf,
  severalAnchors,
  spacerFor,
  targetTop,
  topIn,
  unhandledAnchor,
  visibilityOf,
} from './message-scroller-geometry';

/** Where the thread opens: its start, its end, or its last anchored turn. */
export type ScMessageScrollerPosition = 'start' | 'end' | 'last-anchor';

export interface ScMessageScrollerScrollOptions {
  readonly align?: ScMessageScrollerAlign;
  readonly behavior?: ScrollBehavior;
  /** Room above the row, in px. */
  readonly scrollMargin?: number;
}

/** What the scroller's root gives: its inputs. */
export interface ScMessageScrollerOptions {
  readonly autoScroll: Signal<boolean>;
  readonly defaultScrollPosition: Signal<ScMessageScrollerPosition>;
  readonly scrollEdgeThreshold: Signal<number>;
  readonly scrollPreviousItemPeek: Signal<number>;
  readonly scrollMargin: Signal<number>;
}

/**
 * Following the end as rows arrive; scrolled by the reader; settling after a
 * jump; holding an anchored turn near the top while its reply grows.
 */
type ScMessageScrollerMode =
  | 'following-bottom'
  | 'free-scrolling'
  | 'settling-jump'
  | 'anchored-to-message';

/** How long a scroll to the end counts as ours, not the reader's (ms). */
const AUTOSCROLL_TIME = 180;

/** The keys that scroll: the reader taking over. */
const SCROLL_KEYS = new Set([
  'ArrowDown',
  'ArrowUp',
  'End',
  'Home',
  'PageDown',
  'PageUp',
  ' ',
]);

/**
 * One message scroller's state, shared by its parts: the elements, the mode,
 * the commands. Provided by `scMessageScroller`. After shadcn's
 * `@shadcn/react/message-scroller` — its behaviour, step for step.
 */
@Service({ autoProvided: false })
export class ScMessageScrollerState {
  private options: ScMessageScrollerOptions | null = null;
  private viewport: HTMLElement | null = null;
  private content: HTMLElement | null = null;
  private spacer: HTMLElement | null = null;
  private spacerGap = 0;
  private spacerHeight = 0;

  /** Keeps the visible row in place when older ones are added above. */
  preserveScrollOnPrepend = true;

  private mode: ScMessageScrollerMode = 'free-scrolling';
  private streamingTurn: HTMLElement | null = null;
  private defaultApplied = false;
  private rowCount = 0;
  private firstRow: HTMLElement | null = null;
  private lastScrollTop = 0;
  private prependRestore: { element: HTMLElement; viewportTop: number } | null =
    null;
  private pendingScrollToMessage: {
    id: string;
    options?: ScMessageScrollerScrollOptions;
  } | null = null;
  private readonly messages = new Map<string, HTMLElement>();
  private readonly handledAnchors = new WeakSet<HTMLElement>();
  private readonly seen = new Set<string>();
  private observer: IntersectionObserver | null = null;
  private autoscrollTimer: ReturnType<typeof setTimeout> | null = null;
  private commitFrame: number | null = null;
  private visibilityFrame: number | null = null;
  private flushFrame: number | null = null;
  /** A smooth scroll of ours on its way: where it goes. */
  private chase: (() => number) | null = null;

  /** The edges it can scroll toward — at the end means `!end`. */
  readonly scrollable = signal<ScMessageScrollerScrollable>(NOT_SCROLLABLE, {
    equal: sameScrollable,
  });
  /** The rows on screen, and the turn being read. */
  readonly visibility = signal<ScMessageScrollerVisibility>(NOTHING_VISIBLE, {
    equal: sameVisibility,
  });
  /** While scrolling to the end ourselves. */
  readonly autoscrolling = signal(false);
  /** Until the opening position is applied: the viewport stays hidden. */
  readonly pendingDefaultScroll = signal(true);

  connect(options: ScMessageScrollerOptions): void {
    this.options = options;
    this.mode = options.autoScroll() ? 'following-bottom' : 'free-scrolling';
    this.pendingDefaultScroll.set(options.defaultScrollPosition() !== 'start');
  }

  private get autoScroll() {
    return this.options?.autoScroll() ?? false;
  }

  private get margin() {
    return this.options?.scrollMargin() ?? 0;
  }

  private get peek() {
    return this.options?.scrollPreviousItemPeek() ?? 64;
  }

  // The elements, as their parts render.

  setViewport(viewport: HTMLElement | null): void {
    this.viewport = viewport;
    this.observer?.disconnect();
    this.observer = null;
    this.seen.clear();
    if (viewport && typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const id = (entry.target as HTMLElement).dataset['messageId'];
            if (!id) continue;
            if (entry.isIntersecting) this.seen.add(id);
            else this.seen.delete(id);
          }
          this.scheduleVisibility();
        },
        {
          root: viewport,
          rootMargin: `${-(this.margin + this.peek)}px 0px 0px 0px`,
          threshold: [0, 0.01, 0.5, 1],
        },
      );
      for (const element of this.messages.values())
        this.observer.observe(element);
    }
    this.commit();
  }

  setContent(content: HTMLElement | null, spacer: HTMLElement | null): void {
    this.content = content;
    this.spacer = spacer;
    this.spacerGap = gapOf(content);
  }

  /** A row with an id: for `scrollToMessage` and the visibility. */
  registerMessage(id: string, element: HTMLElement): () => void {
    this.messages.set(id, element);
    this.observer?.observe(element);
    this.scheduleVisibility();
    if (this.pendingScrollToMessage?.id === id) this.scheduleFlush();
    return () => {
      if (this.messages.get(id) !== element) return;
      this.messages.delete(id);
      this.seen.delete(id);
      this.observer?.unobserve(element);
      this.scheduleVisibility();
    };
  }

  /** First render: the opening position — or none to wait for. */
  start(): void {
    this.handleContentChange();
    if (!this.applyDefaultPosition() && this.rowCount === 0)
      this.pendingDefaultScroll.set(false);
  }

  /** `autoScroll` turned on while following: back to the end. */
  autoScrollChanged(): void {
    if (
      this.autoScroll &&
      this.mode === 'following-bottom' &&
      this.rowCount > 0
    )
      this.scrollToEnd();
    else this.commit();
  }

  destroy(): void {
    if (this.autoscrollTimer !== null) clearTimeout(this.autoscrollTimer);
    for (const frame of [
      this.commitFrame,
      this.visibilityFrame,
      this.flushFrame,
    ])
      if (frame !== null) cancelAnimationFrame(frame);
    this.observer?.disconnect();
  }

  // The commands.

  scrollToStart({ behavior = 'auto' }: { behavior?: ScrollBehavior } = {}) {
    if (!this.viewport) return false;
    this.setSpacer(0);
    this.streamingTurn = null;
    this.mode = 'free-scrolling';
    this.scrollTo(() => 0, behavior);
    this.scheduleVisibility();
    return true;
  }

  /** To the end — and following again, with `autoScroll`. */
  scrollToEnd({ behavior = 'auto' }: { behavior?: ScrollBehavior } = {}) {
    const viewport = this.viewport;
    if (!viewport) return false;
    this.setSpacer(0);
    this.streamingTurn = null;
    this.mode = this.autoScroll ? 'following-bottom' : 'free-scrolling';
    this.scrollTo(() => maxScrollTop(viewport), behavior, true);
    this.scheduleVisibility();
    return true;
  }

  /** To a row by its `messageId` — once it is there, if not yet. */
  scrollToMessage(id: string, options?: ScMessageScrollerScrollOptions) {
    const element = this.messages.get(id);
    if (element) {
      this.defaultPositionApplied();
      this.pendingScrollToMessage = this.scrollToElement(element, options)
        ? null
        : { id, options };
      return true;
    }
    if (this.rowCount === 0) {
      this.pendingScrollToMessage = { id, options };
      this.defaultPositionApplied();
      return true;
    }
    return false;
  }

  // The reader.

  onScroll(): void {
    const goal = this.chase;
    if (goal && Math.abs((this.viewport?.scrollTop ?? 0) - goal()) <= 1)
      this.chase = null;
    this.commit();
    this.scheduleVisibility();
    this.captureFirstVisible();
  }

  onKeydown(event: KeyboardEvent): void {
    if (SCROLL_KEYS.has(event.key)) this.readerTookOver();
  }

  /** Wheel, touch, scroll keys: the reader scrolls, nothing follows. */
  readerTookOver(): void {
    this.chase = null;
    if (this.mode !== 'free-scrolling') {
      this.streamingTurn = null;
      this.mode = 'free-scrolling';
    }
  }

  // Rows added or removed, sizes changed.

  handleContentChange(): void {
    const content = this.content;
    if (!content) return;
    const rows = rowsOf(content, this.spacer);
    const before = this.rowCount;
    const first = this.firstRow;
    this.rowCount = rows.length;
    this.firstRow = rows[0] ?? null;
    this.react(rows, before, first);
    this.captureFirstVisible();
  }

  private react(
    rows: HTMLElement[],
    before: number,
    first: HTMLElement | null,
  ) {
    if (this.flushPendingScrollToMessage()) return;
    if (before === 0) {
      if (
        this.applyDefaultPosition() ||
        (rows.length > 0 && this.autoScroll && this.scrollToEnd())
      )
        return;
      this.commit();
      this.scheduleVisibility();
      return;
    }
    // Older rows above: keep the one being read in place.
    const firstMoved = first ? rows.indexOf(first) : -1;
    if (this.preserveScrollOnPrepend && firstMoved > 0) {
      this.restoreAfterPrepend();
      return;
    }
    if (rows.length > before) {
      const anchor = nextAnchor(rows, before);
      if (anchor) {
        if (
          this.autoScroll &&
          this.mode === 'following-bottom' &&
          severalAnchors(rows, before)
        ) {
          this.scrollToEnd();
          return;
        }
        this.scrollToElement(anchor, { align: 'start' }, true);
        this.handledAnchors.add(anchor);
        return;
      }
    }
    if (rows.length === before) {
      const anchor = unhandledAnchor(rows, this.handledAnchors);
      if (anchor) {
        this.scrollToElement(anchor, { align: 'start' }, true);
        this.handledAnchors.add(anchor);
        return;
      }
    }
    if (this.mode === 'following-bottom' && this.autoScroll) this.scrollToEnd();
    else {
      this.commit();
      this.scheduleVisibility();
    }
  }

  handleResize(): void {
    if (this.mode === 'following-bottom' && this.autoScroll) {
      this.scrollToEnd();
      return;
    }
    if (this.aimAgain()) {
      this.scheduleCommit();
      this.scheduleVisibility();
      return;
    }
    const spacerBefore = this.spacerHeight;
    if (this.reanchor()) {
      // The reply filled the room under its turn: follow it from here.
      if (this.autoScroll && spacerBefore > 0 && this.spacerHeight === 0)
        this.scrollToEnd();
      return;
    }
    this.scheduleCommit();
    this.scheduleVisibility();
  }

  // Inside.

  private scrollToElement(
    element: HTMLElement,
    {
      align = 'start',
      behavior = 'auto',
      scrollMargin = this.margin,
    }: ScMessageScrollerScrollOptions = {},
    keepPreviousPeek = false,
  ): boolean {
    const content = this.content;
    const viewport = this.viewport;
    if (!content || !viewport || !content.contains(element)) return false;
    const top = targetTop(
      element,
      align,
      keepPreviousPeek ? scrollMargin + this.peek : scrollMargin,
      this.spacer,
      viewport,
    );
    this.setSpacer(spacerFor(content, this.spacer, viewport, top));
    this.prependRestore = { element, viewportTop: topIn(element, viewport) };
    this.mode = keepPreviousPeek ? 'anchored-to-message' : 'settling-jump';
    this.streamingTurn = keepPreviousPeek ? element : null;
    this.scrollTo(() => top, behavior);
    this.scheduleVisibility();
    return true;
  }

  /** The anchored turn's reply grew: hold the turn where it was. */
  private reanchor(): boolean {
    const turn = this.streamingTurn;
    if (!turn || !turn.isConnected || this.mode !== 'anchored-to-message')
      return false;
    return this.scrollToElement(turn, { align: 'start' }, true);
  }

  private flushPendingScrollToMessage(): boolean {
    const pending = this.pendingScrollToMessage;
    if (!pending) return false;
    const element = this.messages.get(pending.id);
    if (!element || !this.scrollToElement(element, pending.options))
      return false;
    this.pendingScrollToMessage = null;
    this.defaultPositionApplied();
    return true;
  }

  private applyDefaultPosition(): boolean {
    const position = this.options?.defaultScrollPosition() ?? 'end';
    if (this.defaultApplied || this.rowCount === 0) return false;
    let done: boolean;
    if (position === 'last-anchor') {
      const content = this.content;
      const viewport = this.viewport;
      const anchor =
        content && viewport ? lastAnchor(rowsOf(content, this.spacer)) : null;
      if (!content || !viewport || !anchor) done = this.scrollToEnd();
      else {
        // Its turn fits on screen: the end shows it all.
        const fits =
          rowsHeight(content, this.spacer, viewport) -
            (topIn(anchor, viewport) + viewport.scrollTop) <=
          viewport.clientHeight;
        done = fits
          ? this.scrollToEnd()
          : this.scrollToElement(anchor, { align: 'start' }, true);
      }
    } else
      done = position === 'end' ? this.scrollToEnd() : this.scrollToStart();
    if (done) this.defaultPositionApplied();
    return done;
  }

  private defaultPositionApplied(): void {
    this.defaultApplied = true;
    this.pendingDefaultScroll.set(false);
  }

  private restoreAfterPrepend(): boolean {
    const restore = this.prependRestore;
    const viewport = this.viewport;
    if (!restore || !viewport || !restore.element.isConnected) return false;
    const moved = topIn(restore.element, viewport) - restore.viewportTop;
    if (Math.abs(moved) <= SAME) return false;
    viewport.scrollTop += moved;
    restore.viewportTop = topIn(restore.element, viewport);
    this.scheduleCommit();
    this.scheduleVisibility();
    return true;
  }

  private captureFirstVisible(): void {
    const content = this.content;
    const viewport = this.viewport;
    if (!content || !viewport) {
      this.prependRestore = null;
      return;
    }
    const row = firstVisibleRow(content, this.spacer, viewport);
    this.prependRestore = row
      ? { element: row, viewportTop: topIn(row, viewport) }
      : null;
  }

  /** Room under the rows, so an anchored turn can reach the top. */
  private setSpacer(height: number): void {
    const spacer = this.spacer;
    if (!spacer) return;
    const value = Math.max(0, Math.ceil(height));
    if (this.spacerHeight === value) return;
    this.spacerHeight = value;
    spacer.hidden = value === 0;
    spacer.style.height = `${value}px`;
    spacer.style.marginTop = value > 0 ? `${-this.spacerGap}px` : '';
  }

  /** `goal` is measured again when a smooth scroll is aimed again. */
  private scrollTo(
    goal: () => number,
    behavior: ScrollBehavior,
    autoscroll = false,
  ) {
    const viewport = this.viewport;
    this.chase = null;
    if (!viewport) return;
    const to = Math.max(0, goal());
    if (Math.abs(viewport.scrollTop - to) <= SAME) {
      viewport.scrollTop = to;
      this.commit();
      return;
    }
    if (autoscroll) this.markAutoscrolling();
    viewport.scrollTo({ top: to, behavior });
    if (behavior === 'smooth') this.chase = goal;
    this.scheduleCommit();
  }

  /**
   * Not shadcn's: WebKit drops a smooth scroll when the rows' heights change
   * under it (rows drawn as they come into view, `content-visibility`) — aim
   * it again, until it arrives or the reader takes over.
   */
  private aimAgain(): boolean {
    const viewport = this.viewport;
    const goal = this.chase;
    if (!viewport || !goal) return false;
    const to = Math.max(0, goal());
    if (Math.abs(viewport.scrollTop - to) <= 1) {
      this.chase = null;
      return false;
    }
    viewport.scrollTo({ top: to, behavior: 'smooth' });
    return true;
  }

  private markAutoscrolling(): void {
    if (this.autoscrollTimer !== null) clearTimeout(this.autoscrollTimer);
    this.autoscrolling.set(true);
    this.autoscrollTimer = setTimeout(() => {
      this.autoscrollTimer = null;
      this.autoscrolling.set(false);
    }, AUTOSCROLL_TIME);
  }

  /** Measures the edges; the reader scrolling up stops the following. */
  private commit(): void {
    const scrollable = scrollableOf(
      this.content,
      this.spacer,
      this.viewport,
      this.options?.scrollEdgeThreshold() ?? 8,
    );
    const top = this.viewport?.scrollTop ?? 0;
    const up = top < this.lastScrollTop - SAME;
    this.lastScrollTop = top;
    if (
      this.autoScroll &&
      !scrollable.end &&
      this.mode !== 'settling-jump' &&
      this.mode !== 'anchored-to-message'
    )
      this.mode = 'following-bottom';
    else if (
      this.mode === 'following-bottom' &&
      scrollable.end &&
      up &&
      !this.autoscrolling()
    )
      this.mode = 'free-scrolling';
    this.scrollable.set(
      this.mode === 'following-bottom'
        ? { ...scrollable, end: false }
        : scrollable,
    );
  }

  private scheduleCommit(): void {
    this.commitFrame ??= requestAnimationFrame(() => {
      this.commitFrame = null;
      this.commit();
    });
  }

  private scheduleVisibility(): void {
    if (typeof requestAnimationFrame === 'undefined') return;
    this.visibilityFrame ??= requestAnimationFrame(() => {
      this.visibilityFrame = null;
      this.visibility.set(
        visibilityOf(
          this.content,
          this.spacer,
          this.viewport,
          this.margin + this.peek,
          this.observer ? this.seen : null,
        ),
      );
    });
  }

  private scheduleFlush(): void {
    if (typeof requestAnimationFrame === 'undefined') return;
    this.flushFrame ??= requestAnimationFrame(() => {
      this.flushFrame = null;
      if (this.flushPendingScrollToMessage()) this.captureFirstVisible();
    });
  }
}
