import { DOCUMENT } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '../../utils/cn/cn';

/** A row to render: which, where, how big. */
export interface ScVirtualListItem {
  readonly index: number;
  readonly key: unknown;
  /** From the list's start, in pixels, along its flow. */
  readonly start: number;
  readonly size: number;
  /** Its lane (column of a grid; row of a horizontal one), from 0. */
  readonly lane: number;
}

export type ScVirtualListAlign = 'start' | 'center' | 'end' | 'auto';

/**
 * A long list, rendered only where it is seen: your rows
 * (`scVirtualListRow`) for `rows()`, placed and measured as they render.
 * It scrolls with what scrolls — itself (give it a size and an overflow),
 * the box it is in, or the page. Down or along; in lanes for a grid.
 */
@Component({
  selector: '[scVirtualList]',
  exportAs: 'scVirtualList',
  template: `
    <ng-content />
    @if (spacerTag() === 'li') {
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
    '(focusin)': 'onFocusIn($event)',
    '(focusout)': 'onFocusOut($event)',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScVirtualList {
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly document = inject(DOCUMENT);

  readonly classInput = input<string>('', { alias: 'class' });
  /** How many rows there are. */
  readonly count = input.required<number>();
  /** A row's size before it is measured, in pixels. */
  readonly estimate = input(40);
  /** A row's key — what its measured size is kept by. The index, by default. */
  readonly key = input<(index: number) => unknown>((index) => index);
  /** How many rows are rendered beyond each end of the view. */
  readonly overscan = input(5);
  readonly orientation = input<'vertical' | 'horizontal'>('vertical');
  /** Rows side by side (a grid): each goes in the lane that ends first. */
  readonly lanes = input(1);
  /** Room between rows, and between lanes, in pixels. */
  readonly gap = input(0);

  /** Measured sizes, by key. */
  private readonly sizes = signal(new Map<unknown, number>());
  /** The part of the list in view, from its start, in pixels. */
  private readonly view = signal({ from: 0, to: 0 });
  /** The focused row: kept rendered while scrolled away. */
  private readonly focused = signal<number | null>(null);
  /** It does not scroll itself: it takes its full size, and something else scrolls. */
  protected readonly outer = signal(false);

  protected readonly vertical = computed(
    () => this.orientation() === 'vertical',
  );
  protected readonly spacerTag = signal<'li' | 'div'>(
    /^(UL|OL)$/.test(this.host.tagName) ? 'li' : 'div',
  );

  /** Every row's place: in the lane that ends first. */
  private readonly layout = computed(() => {
    const count = this.count();
    const lanes = Math.max(1, this.lanes());
    const gap = this.gap();
    const estimate = this.estimate();
    const key = this.key();
    const sizes = this.sizes();
    const ends = new Array<number>(lanes).fill(0);
    const rows: ScVirtualListItem[] = new Array(count);
    for (let index = 0; index < count; index++) {
      let lane = 0;
      for (let l = 1; l < lanes; l++) if (ends[l] < ends[lane]) lane = l;
      const k = key(index);
      const size = sizes.get(k) ?? estimate;
      const start = ends[lane] + (ends[lane] ? gap : 0);
      rows[index] = { index, key: k, start, size, lane };
      ends[lane] = start + size;
    }
    return { rows, size: Math.max(0, ...ends) };
  });

  /** The list's whole size along its flow, in pixels. */
  readonly size = computed(() => this.layout().size);

  /** The rows to render: those in view, `overscan` more each way, the focused one. */
  readonly rows = computed<ScVirtualListItem[]>(() => {
    const { rows } = this.layout();
    const { from, to } = this.view();
    let first = -1;
    let last = -1;
    for (const row of rows) {
      if (row.start + row.size >= from && row.start <= to) {
        if (first < 0) first = row.index;
        last = row.index;
      }
    }
    if (first < 0) return [];
    const extra = this.overscan() * Math.max(1, this.lanes());
    const shown = rows.slice(
      Math.max(0, first - extra),
      Math.min(rows.length, last + extra + 1),
    );
    const focused = this.focused();
    if (focused !== null && rows[focused] && !shown.includes(rows[focused])) {
      return focused < shown[0].index
        ? [rows[focused], ...shown]
        : [...shown, rows[focused]];
    }
    return shown;
  });

  /** The indexes rendered: the first and the last. */
  readonly range = computed(() => {
    const rows = this.rows();
    return rows.length
      ? { first: rows[0].index, last: rows[rows.length - 1].index }
      : null;
  });

  protected readonly spacer = computed(() =>
    this.vertical()
      ? `position:absolute;inset-inline-start:0;top:0;width:1px;height:${this.size()}px;visibility:hidden;pointer-events:none`
      : `position:absolute;inset-inline-start:0;top:0;height:1px;width:${this.size()}px;visibility:hidden;pointer-events:none`,
  );

  protected readonly class = computed(() =>
    cn('relative block [overflow-anchor:none]', this.classInput()),
  );

  private scroller: HTMLElement | null = null;
  private frame = 0;
  private readonly measured = new Map<Element, () => unknown>();
  private readonly resize =
    // None on the server: nothing to observe there.
    typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver((entries) => this.onResize(entries));

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const style = getComputedStyle(this.host);
      const overflow = this.vertical() ? style.overflowY : style.overflowX;
      const own = /auto|scroll|overlay/.test(overflow);
      this.outer.set(!own);
      this.scroller = own ? this.host : scrollParent(this.host.parentElement);
      const target: HTMLElement | Window | null =
        this.scroller ?? this.document.defaultView;
      const onScroll = () => this.schedule();
      target?.addEventListener('scroll', onScroll, { passive: true });
      this.document.defaultView?.addEventListener('resize', onScroll);
      const box = new ResizeObserver(onScroll);
      box.observe(this.host);
      if (this.scroller && this.scroller !== this.host) {
        box.observe(this.scroller);
      }
      this.measureView();
      destroyRef.onDestroy(() => {
        target?.removeEventListener('scroll', onScroll);
        this.document.defaultView?.removeEventListener('resize', onScroll);
        box.disconnect();
        this.resize?.disconnect();
        cancelAnimationFrame(this.frame);
      });
    });
  }

  /**
   * Scrolls `index` into view: its start at the view's start, its centre at
   * the centre, its end at the end — or, `auto`, only as far as it needs.
   */
  scrollToIndex(
    index: number,
    { align = 'auto' }: { align?: ScVirtualListAlign } = {},
  ): void {
    /** How far to scroll, as the row and the view are now. */
    const distance = (): number => {
      const row = this.layout().rows[index];
      if (!row) return 0;
      const { from, to } = this.view();
      const end = row.start + row.size;
      return align === 'start'
        ? row.start - from
        : align === 'end'
          ? end - to
          : row.start + row.size / 2 - (from + to) / 2;
    };
    if (align === 'auto') {
      // Only as far as needed: to the near edge — or not at all.
      const row = this.layout().rows[index];
      if (!row) return;
      const { from, to } = this.view();
      if (row.start < from) align = 'start';
      else if (row.start + row.size > to) align = 'end';
      else return;
    }
    // Rows rendered there are measured, and may move it: corrected, frame
    // by frame, until it holds still.
    let still = 0;
    let frames = 0;
    let sizes = this.sizes();
    const step = () => {
      this.measureView();
      const by = distance();
      // Rows measured since the last look: not still yet.
      if (Math.abs(by) >= 1 || this.sizes() !== sizes) still = 0;
      else still++;
      sizes = this.sizes();
      if (Math.abs(by) >= 1) this.scrollBy(by);
      if (still < 3 && ++frames < 30) requestAnimationFrame(step);
    };
    step();
  }

  /** A row element, measured while it is rendered (`scVirtualListRow`). */
  ɵobserve(element: Element, key: () => unknown): void {
    this.measured.set(element, key);
    this.resize?.observe(element);
  }

  ɵunobserve(element: Element): void {
    this.measured.delete(element);
    this.resize?.unobserve(element);
  }

  protected onFocusIn(event: FocusEvent): void {
    const index = this.indexOf(event.target as Element);
    if (index !== null) this.focused.set(index);
  }

  protected onFocusOut(event: FocusEvent): void {
    const to = event.relatedTarget as Node | null;
    if (!to || !this.host.contains(to)) this.focused.set(null);
  }

  private indexOf(target: Element): number | null {
    const row = target.closest<HTMLElement>('[data-slot="virtual-list-row"]');
    const index = row?.dataset['index'];
    return index === undefined ? null : Number(index);
  }

  private onResize(entries: ResizeObserverEntry[]): void {
    const sizes = new Map(this.sizes());
    const rows = this.layout().rows;
    const { from } = this.view();
    let changed = false;
    let above = 0;
    for (const entry of entries) {
      const key = this.measured.get(entry.target)?.();
      if (key === undefined) continue;
      const box = entry.borderBoxSize[0];
      const size = this.vertical() ? box.blockSize : box.inlineSize;
      const before = sizes.get(key);
      if (before === size) continue;
      const row = rows.find((r) => r.key === key);
      // A row starting above the view grows or shrinks: the view keeps its place.
      if (row && row.start < from) {
        above += size - (before ?? row.size);
      }
      sizes.set(key, size);
      changed = true;
    }
    if (!changed) return;
    this.sizes.set(sizes);
    if (above) this.scrollBy(above);
  }

  private schedule(): void {
    if (!this.resize) return;
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => this.measureView());
  }

  /** Where the view is, from the list's start. */
  private measureView(): void {
    const view = this.document.defaultView;
    const scroller = this.scroller;
    const own = scroller === this.host;
    // Inside the borders: where rows are placed, and what is seen.
    const inner = (element: HTMLElement) => {
      const r = element.getBoundingClientRect();
      const top = r.top + element.clientTop;
      const left = r.left + element.clientLeft;
      return {
        top,
        left,
        bottom: top + element.clientHeight,
        right: left + element.clientWidth,
      };
    };
    const rect = inner(this.host);
    const box = scroller
      ? inner(scroller)
      : {
          top: 0,
          left: 0,
          bottom: view?.innerHeight ?? 0,
          right: view?.innerWidth ?? 0,
        };
    let from: number;
    let length: number;
    if (this.vertical()) {
      const start = own ? rect.top - this.host.scrollTop : rect.top;
      from = Math.max(box.top, 0) - start;
      length =
        Math.min(box.bottom, view?.innerHeight ?? box.bottom) -
        Math.max(box.top, 0);
    } else {
      const rtl = getComputedStyle(this.host).direction === 'rtl';
      if (rtl) {
        const end = own ? rect.right - this.host.scrollLeft : rect.right;
        from = end - Math.min(box.right, view?.innerWidth ?? box.right);
      } else {
        const start = own ? rect.left - this.host.scrollLeft : rect.left;
        from = Math.max(box.left, 0) - start;
      }
      length =
        Math.min(box.right, view?.innerWidth ?? box.right) -
        Math.max(box.left, 0);
    }
    this.view.set({ from, to: from + Math.max(0, length) });
  }

  private scrollBy(by: number): void {
    if (!by) return;
    const rtl =
      !this.vertical() && getComputedStyle(this.host).direction === 'rtl';
    const [x, y] = this.vertical() ? [0, by] : [rtl ? -by : by, 0];
    (this.scroller ?? this.document.defaultView)?.scrollBy(x, y);
  }
}

/** The nearest element that scrolls, from `element` up; none: the page. */
function scrollParent(element: HTMLElement | null): HTMLElement | null {
  for (
    let node = element;
    node && node !== node.ownerDocument.body;
    node = node.parentElement
  ) {
    const style = getComputedStyle(node);
    if (/auto|scroll|overlay/.test(style.overflowY + style.overflowX)) {
      return node;
    }
  }
  return null;
}
