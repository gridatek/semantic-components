import {
  type VirtualItem,
  Virtualizer,
  type VirtualizerOptions,
  defaultRangeExtractor,
  elementScroll,
  observeElementOffset,
  observeElementRect,
  observeWindowOffset,
  observeWindowRect,
  windowScroll,
} from '@tanstack/virtual-core';
import { Directionality } from '@angular/cdk/bidi';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { cn } from 'cn';

/** A row as the list lays it out: render it with `[scVirtualListNextRow]`. */
export type ScVirtualListNextItem = VirtualItem;

export type ScVirtualListNextAlign = 'start' | 'center' | 'end' | 'auto';

/** What scrolls the list: itself, a box around it, or the page. */
type ScScroller = Element | Window;

/**
 * A long list rendered only where it is seen, on TanStack Virtual's engine:
 * rows measured as they render, in a box that scrolls (give it a size and an
 * overflow) or the page; down, along, or in lanes. Render `rows()` with
 * `[scVirtualListNextRow]`, read your data by `row.index`, track by
 * `row.key`. `anchor="end"`: a chat — it opens at the end, keeps its place as
 * older rows come in above, and follows new ones while at the end.
 */
@Component({
  selector: '[scVirtualListNext]',
  exportAs: 'scVirtualListNext',
  template: `
    <ng-content />
    @if (spacerTag === 'li') {
      <li
        data-slot="virtual-list-spacer"
        aria-hidden="true"
        [style]="spacer()"
      ></li>
    } @else {
      <div
        data-slot="virtual-list-spacer"
        aria-hidden="true"
        [style]="spacer()"
      ></div>
    }
  `,
  host: {
    'data-slot': 'virtual-list',
    '[attr.data-orientation]': 'orientation()',
    '[style.height.px]': 'outer() && vertical() ? size() : null',
    '[style.width.px]': 'outer() && !vertical() ? size() : null',
    '[class]': 'class()',
    '(focusin)': 'onFocusIn($event)',
    '(focusout)': 'onFocusOut($event)',
    // Someone scrolling stops a scroll on its way (a follow, a scrollToIndex).
    '(wheel)': 'cancelScroll()',
    '(touchstart)': 'cancelScroll()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScVirtualListNext {
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly document = inject(DOCUMENT);
  private readonly directionality = inject(Directionality);

  readonly classInput = input<string>('', { alias: 'class' });
  /** How many rows. */
  readonly count = input.required<number>();
  /** A row's size before it is measured (px): the largest likely one. */
  readonly estimate = input(40);
  /** Each row's key — your items' ids, when rows can move or come in above. */
  readonly key = input<(index: number) => number | string>((index) => index);
  /** Rows rendered beyond each end of the view. */
  readonly overscan = input(5);
  readonly orientation = input<'vertical' | 'horizontal'>('vertical');
  /** Rows side by side (a grid): each in the lane that ends first. */
  readonly lanes = input(1);
  /** Room between rows, and between lanes (px). */
  readonly gap = input(0);
  /** `end`: a chat — opens at the end, keeps its place as rows come in above. */
  readonly anchor = input<'start' | 'end'>('start');
  /** At the end, it follows rows added after it (`anchor="end"`'s default). */
  readonly follow = input<boolean | undefined, unknown>(undefined, {
    transform: (value: unknown) =>
      value === undefined ? undefined : booleanAttribute(value),
  });
  /** Rows rendered before the list can measure — on the server, at the first paint. */
  readonly initialCount = input(10);

  /** The list scrolls itself (it has an overflow); otherwise what is around it does. */
  private readonly own = signal(true);
  private readonly outer = computed(() => !this.own());
  private readonly vertical = computed(() => this.orientation() === 'vertical');
  /** Where the list starts in what scrolls (page or box): TanStack's scrollMargin. */
  readonly margin = signal(0);
  private readonly focused = signal<number | null>(null);
  private readonly version = signal(0);
  /** What scrolls it, once in the page. */
  private readonly scroller = signal<ScScroller | null>(null);
  /** The engine is watching the page: rows can be measured. */
  readonly mounted = signal(false);

  protected readonly spacerTag = /^(UL|OL)$/.test(this.host.tagName)
    ? 'li'
    : 'div';

  private readonly options = computed<VirtualizerOptions<ScScroller, Element>>(
    () => {
      const vertical = this.vertical();
      const estimate = this.estimate();
      const lanes = Math.max(1, this.lanes());
      const gap = this.gap();
      const anchor = this.anchor();
      const follow = this.follow() ?? anchor === 'end';
      const focused = this.focused();
      const scroller = this.scroller();
      const inWindow = !!scroller && scroller === this.document.defaultView;
      return {
        count: this.count(),
        estimateSize: () => estimate,
        getItemKey: this.key(),
        overscan: this.overscan(),
        horizontal: !vertical,
        isRtl: !vertical && this.directionality.valueSignal() === 'rtl',
        lanes,
        gap,
        anchorTo: anchor,
        followOnAppend: follow ? 'auto' : false,
        scrollMargin: this.margin(),
        // The focused row stays rendered: focus is never lost to scrolling.
        rangeExtractor: (range) => {
          const indexes = defaultRangeExtractor(range);
          if (focused === null || focused >= range.count) return indexes;
          return indexes.includes(focused)
            ? indexes
            : [...indexes, focused].sort((a, b) => a - b);
        },
        getScrollElement: () => scroller,
        observeElementRect: inWindow
          ? (observeWindowRect as VirtualizerOptions<
              ScScroller,
              Element
            >['observeElementRect'])
          : (observeElementRect as VirtualizerOptions<
              ScScroller,
              Element
            >['observeElementRect']),
        observeElementOffset: inWindow
          ? (observeWindowOffset as VirtualizerOptions<
              ScScroller,
              Element
            >['observeElementOffset'])
          : (observeElementOffset as VirtualizerOptions<
              ScScroller,
              Element
            >['observeElementOffset']),
        scrollToFn: inWindow
          ? (windowScroll as VirtualizerOptions<
              ScScroller,
              Element
            >['scrollToFn'])
          : (elementScroll as VirtualizerOptions<
              ScScroller,
              Element
            >['scrollToFn']),
        onChange: () => this.version.update((v) => v + 1),
      };
    },
  );

  /** The engine: TanStack Virtual's. */
  private readonly virtualizer = new Virtualizer<ScScroller, Element>(
    placeholderOptions(),
  );

  /** The rows to render now. */
  readonly rows = computed<readonly ScVirtualListNextItem[]>(() => {
    // Before the engine watches the page (the server, the first paint): the
    // first rows, stacked by their estimate — the same on both sides.
    if (!this.mounted()) return this.initialRows();
    this.version();
    this.options();
    return [...this.virtualizer.getVirtualItems()];
  });

  /** The first `initialCount` rows, laid out by the estimate. */
  private readonly initialRows = computed<readonly ScVirtualListNextItem[]>(
    () => {
      const count = Math.min(this.initialCount(), this.count());
      const lanes = Math.max(1, this.lanes());
      const size = this.estimate();
      const gap = this.gap();
      const key = this.key();
      return Array.from({ length: count }, (_, index) => {
        const start = Math.floor(index / lanes) * (size + gap);
        return {
          key: key(index),
          index,
          start,
          end: start + size,
          size,
          lane: index % lanes,
        };
      });
    },
  );

  /** The whole list's length along its axis (px). */
  readonly size = computed(() => {
    if (!this.mounted()) {
      // Estimated: the scrollbar about right from the first paint.
      const rows = Math.ceil(this.count() / Math.max(1, this.lanes()));
      return Math.max(0, rows * (this.estimate() + this.gap()) - this.gap());
    }
    this.version();
    this.options();
    return this.virtualizer.getTotalSize();
  });

  /** The first and last rows rendered. */
  readonly range = computed(() => {
    const rows = this.rows();
    return rows.length
      ? { first: rows[0].index, last: rows[rows.length - 1].index }
      : null;
  });

  private readonly spacer = computed(() =>
    this.vertical()
      ? `position:absolute;inset-inline-start:0;top:0;width:1px;height:${this.size()}px;visibility:hidden;pointer-events:none`
      : `position:absolute;inset-inline-start:0;top:0;height:1px;width:${this.size()}px;visibility:hidden;pointer-events:none`,
  );

  private readonly class = computed(() =>
    // The browser's own anchoring off: the engine keeps the place.
    cn('relative block [overflow-anchor:none]', this.classInput()),
  );

  constructor() {
    const destroyRef = inject(DestroyRef);
    // Its settings into the engine (and, mounted, a new look at the page).
    effect(() => {
      const options = this.options();
      untracked(() => {
        this.virtualizer.setOptions(options);
        if (this.mounted()) this.virtualizer._willUpdate();
        this.version.update((v) => v + 1);
      });
    });
    afterNextRender(() => {
      // In a lazy panel or a dialog: wait until it is shown.
      if (this.host.isConnected && this.host.getClientRects().length) {
        this.mount(destroyRef);
        return;
      }
      const shown = new ResizeObserver(() => {
        if (!this.host.getClientRects().length) return;
        shown.disconnect();
        this.mount(destroyRef);
      });
      shown.observe(this.host);
      destroyRef.onDestroy(() => shown.disconnect());
    });
  }

  /** Scrolls a row into view: `align` start, center, end or auto (only if it isn't). */
  scrollToIndex(
    index: number,
    options: {
      align?: ScVirtualListNextAlign;
      behavior?: 'auto' | 'smooth';
    } = {},
  ): void {
    this.virtualizer.scrollToIndex(index, options);
  }

  scrollToEnd(options: { behavior?: 'auto' | 'smooth' } = {}): void {
    this.virtualizer.scrollToEnd(options);
  }

  /** Within `threshold` px of the end. */
  isAtEnd(threshold?: number): boolean {
    this.version();
    return this.virtualizer.isAtEnd(threshold);
  }

  /** Stops a scroll on its way. */
  cancelScroll(): void {
    this.virtualizer.cancelScroll();
  }

  /** A row, measured as it renders and again when it changes: `[scVirtualListNextRow]`. */
  measure(element: Element): void {
    if (this.mounted()) this.virtualizer.measureElement(element);
  }

  private mount(destroyRef: DestroyRef): void {
    const view = this.document.defaultView;
    const style = getComputedStyle(this.host);
    const overflow = this.vertical() ? style.overflowY : style.overflowX;
    const own = /auto|scroll|overlay/.test(overflow);
    this.own.set(own);
    this.scroller.set(own ? this.host : (scrollParent(this.host) ?? view));
    this.updateMargin();
    // What it starts at, in what scrolls, moves with the content around it.
    const box = new ResizeObserver(() => this.updateMargin());
    box.observe(this.host);
    const scroller = this.scroller();
    if (scroller instanceof Element && scroller !== this.host) {
      box.observe(scroller);
    }
    this.virtualizer.setOptions(this.options());
    const unmount = this.virtualizer._didMount();
    this.virtualizer._willUpdate();
    this.mounted.set(true);
    this.version.update((v) => v + 1);
    if (this.anchor() === 'end' && this.count() > 0) {
      view?.requestAnimationFrame(() => this.virtualizer.scrollToEnd());
    }
    destroyRef.onDestroy(() => {
      box.disconnect();
      unmount();
    });
  }

  /** Where the list starts in what scrolls it, along its axis. */
  private updateMargin(): void {
    const scroller = this.scroller();
    if (!scroller || scroller === this.host) {
      this.margin.set(0);
      return;
    }
    const rect = this.host.getBoundingClientRect();
    const vertical = this.vertical();
    let start: number;
    if (scroller instanceof Element) {
      const box = scroller.getBoundingClientRect();
      start = vertical
        ? rect.top - box.top + scroller.scrollTop
        : rect.left - box.left + scroller.scrollLeft;
    } else {
      start = vertical
        ? rect.top + scroller.scrollY
        : rect.left + scroller.scrollX;
    }
    if (Math.abs(start - this.margin()) >= 1)
      this.margin.set(Math.round(start));
  }

  private onFocusIn(event: FocusEvent): void {
    const row = (event.target as Element).closest<HTMLElement>('[data-index]');
    const index = row?.dataset['index'];
    if (index !== undefined) this.focused.set(Number(index));
  }

  private onFocusOut(event: FocusEvent): void {
    const to = event.relatedTarget as Node | null;
    if (!to || !this.host.contains(to)) this.focused.set(null);
  }
}

/**
 * The engine's options before the inputs are set (read in the constructor,
 * they would throw NG0950): nothing to render, replaced by the effect at once.
 */
function placeholderOptions(): VirtualizerOptions<ScScroller, Element> {
  return {
    count: 0,
    estimateSize: () => 0,
    getScrollElement: () => null,
    observeElementRect: observeElementRect as VirtualizerOptions<
      ScScroller,
      Element
    >['observeElementRect'],
    observeElementOffset: observeElementOffset as VirtualizerOptions<
      ScScroller,
      Element
    >['observeElementOffset'],
    scrollToFn: elementScroll as VirtualizerOptions<
      ScScroller,
      Element
    >['scrollToFn'],
  };
}

/** The nearest box around `element` that scrolls; none: the page. */
function scrollParent(element: HTMLElement): HTMLElement | null {
  let parent = element.parentElement;
  while (parent && parent !== element.ownerDocument.body) {
    const { overflowY, overflowX } = getComputedStyle(parent);
    if (/auto|scroll|overlay/.test(overflowY + overflowX)) return parent;
    parent = parent.parentElement;
  }
  return null;
}
