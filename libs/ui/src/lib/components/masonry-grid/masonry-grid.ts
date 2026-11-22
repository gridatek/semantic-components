import { DOCUMENT } from '@angular/common';
import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  afterRenderEffect,
  booleanAttribute,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from 'cn';

/** An item, as the grid places it. */
export interface ScMasonryGridEntry {
  readonly element: HTMLElement;
  /** How many columns it spans. */
  readonly span: () => number;
}

/** The styles the grid writes on an item, cleared when it stops placing them. */
const ITEM_STYLES = ['position', 'top', 'left', 'width', 'translate'] as const;

/**
 * A masonry grid: your items in columns of at least `columnWidth`, each
 * placed in the shortest column — the first of those within 1em of it, as
 * CSS `grid-lanes` does — or in turn (`sequential`). The source order is kept,
 * so reading and Tab follow the rows. The gaps are your classes (`gap-4`,
 * `gap-x-4 gap-y-6`). Before it is measured (on the server, the first paint)
 * it is a plain grid of the same columns; native (`display: grid-lanes`)
 * where the browser has it.
 */
@Directive({
  selector: '[scMasonryGrid]',
  exportAs: 'scMasonryGrid',
  host: {
    'data-slot': 'masonry-grid',
    '[style.grid-template-columns]': 'template()',
    '[class]': 'class()',
  },
})
export class ScMasonryGrid {
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  /** The least width of a column, in pixels: as many as fit. */
  readonly columnWidth = input(240);
  /** At most this many columns, however wide. */
  readonly maxColumns = input<number | null>(null);
  /** Each item into the next column in turn, not the shortest. */
  readonly sequential = input(false, { transform: booleanAttribute });

  /** The columns, as laid out. */
  readonly columns = signal(1);
  /** The browser lays it out itself (`grid-lanes`, shortest column only). */
  readonly native = signal(false);

  /**
   * The columns as CSS — for the grid before it is measured, and for
   * `grid-lanes`. A most: each column wider than a share one more would get.
   */
  private readonly template = computed(() => {
    const least = `min(${this.columnWidth()}px, 100%)`;
    const most = this.maxColumns();
    const width = most
      ? `max(${least}, calc(100% / ${most + 1} + 1px))`
      : least;
    return `repeat(auto-fill, minmax(${width}, 1fr))`;
  });

  private readonly class = computed(() =>
    cn('grid items-start', this.classInput()),
  );

  private readonly entries = signal<readonly ScMasonryGridEntry[]>([]);
  private readonly view = inject(DOCUMENT).defaultView;
  private observer: ResizeObserver | null = null;
  private frame = 0;

  constructor() {
    // In the browser only: what changes the page is written on the element
    // (never a binding), so the server's render and hydration agree.
    afterNextRender(() => {
      this.native.set(
        globalThis.CSS?.supports?.('display', 'grid-lanes') ?? false,
      );
      // Any size changing — the grid's, an item's — lays it out again, once a frame.
      this.observer = new ResizeObserver(() => this.schedule());
      this.observer.observe(this.element);
      for (const entry of this.entries()) this.observer.observe(entry.element);
    });
    inject(DestroyRef).onDestroy(() => {
      this.observer?.disconnect();
      this.view?.cancelAnimationFrame(this.frame);
    });
    // Its settings, or its items, changed.
    afterRenderEffect(() => {
      this.columnWidth();
      this.maxColumns();
      this.sequential();
      this.native();
      for (const entry of this.entries()) entry.span();
      this.layout();
    });
  }

  ɵregister(entry: ScMasonryGridEntry): () => void {
    this.entries.update((entries) => [...entries, entry]);
    this.observer?.observe(entry.element);
    return () => {
      this.observer?.unobserve(entry.element);
      this.entries.update((entries) => entries.filter((e) => e !== entry));
    };
  }

  private schedule(): void {
    if (!this.view) return;
    this.view.cancelAnimationFrame(this.frame);
    this.frame = this.view.requestAnimationFrame(() => this.layout());
  }

  /** The items, in the page's order — whatever order they came in. */
  private ordered(): HTMLElement[] {
    return this.entries()
      .map((entry) => entry.element)
      .filter((element) => element.isConnected)
      .sort((a, b) =>
        a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
          ? -1
          : 1,
      );
  }

  /**
   * Places every item, in three passes — all widths written, all heights
   * read (one reflow), all places written.
   */
  private layout(): void {
    const grid = this.element;
    const style = getComputedStyle(grid);
    const columnGap = parseFloat(style.columnGap) || 0;
    const rowGap = parseFloat(style.rowGap) || 0;
    const paddingStart = parseFloat(style.paddingLeft) || 0;
    const paddingTop = parseFloat(style.paddingTop) || 0;
    const width =
      grid.clientWidth - paddingStart - (parseFloat(style.paddingRight) || 0);
    const count = Math.max(
      1,
      Math.min(
        this.maxColumns() ?? Infinity,
        Math.floor((width + columnGap) / (this.columnWidth() + columnGap)),
      ),
    );
    this.columns.set(count);

    const elements = this.ordered();
    if (this.native() && !this.sequential()) {
      // The browser's: ours undone.
      grid.style.display = 'grid-lanes';
      grid.style.height = '';
      for (const element of elements) this.release(element);
      grid.dataset['native'] = 'true';
      return;
    }
    delete grid.dataset['native'];

    const column = (width - (count - 1) * columnGap) / count;
    const spans = new Map(
      this.entries().map((entry) => [entry.element, entry.span()]),
    );
    const shown = elements.filter(
      (element) => getComputedStyle(element).display !== 'none',
    );

    // 1. Widths.
    grid.style.display = 'block';
    grid.style.position = 'relative';
    const sizes = shown.map((element) => {
      const span = Math.min(count, Math.max(1, spans.get(element) ?? 1));
      element.style.position = 'absolute';
      element.style.top = '0';
      element.style.left = '0';
      element.style.width = `${column * span + columnGap * (span - 1)}px`;
      return span;
    });
    // 2. Heights: one reflow.
    const heights = shown.map((element) => element.offsetHeight);

    // 3. Places.
    const rtl = style.direction === 'rtl';
    // Columns this close count as level: the first wins (grid-lanes' 1em).
    const tolerance = parseFloat(style.fontSize) || 16;
    const bottoms: number[] = Array.from({ length: count }, () => 0);
    let turn = 0;
    shown.forEach((element, i) => {
      const span = sizes[i];
      const at = this.sequential()
        ? turn + span > count
          ? 0
          : turn
        : this.levelFirst(bottoms, span, tolerance);
      const top = Math.max(...bottoms.slice(at, at + span));
      const itemWidth = column * span + columnGap * (span - 1);
      const start = at * (column + columnGap);
      const x = paddingStart + (rtl ? width - start - itemWidth : start);
      element.style.translate = `${x}px ${paddingTop + top}px`;
      for (let c = at; c < at + span; c++)
        bottoms[c] = top + heights[i] + rowGap;
      turn = (at + span) % count;
      // Placed once: from now on, its moves are animated.
      if (!element.dataset['placed']) {
        this.view?.requestAnimationFrame(
          () => (element.dataset['placed'] = 'true'),
        );
      }
    });
    const tallest = Math.max(0, ...bottoms) - (shown.length ? rowGap : 0);
    grid.style.height = `${tallest + paddingTop + (parseFloat(style.paddingBottom) || 0)}px`;
  }

  /**
   * Where an item `span` wide goes: the lowest place across its span — the
   * first of those within `tolerance` of it, as `grid-lanes` does.
   */
  private levelFirst(
    bottoms: readonly number[],
    span: number,
    tolerance: number,
  ): number {
    const tops = Array.from({ length: bottoms.length - span + 1 }, (_, start) =>
      Math.max(...bottoms.slice(start, start + span)),
    );
    const lowest = Math.min(...tops);
    return tops.findIndex((top) => top <= lowest + tolerance);
  }

  /** An item back to the browser's grid. */
  private release(element: HTMLElement): void {
    for (const name of ITEM_STYLES) element.style.removeProperty(name);
    delete element.dataset['placed'];
  }
}
