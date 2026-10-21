import { DOCUMENT } from '@angular/common';
import {
  DestroyRef,
  Directive,
  ElementRef,
  afterRenderEffect,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

/** An item, as the grid places it. */
export interface ScMasonryGridEntry {
  readonly element: HTMLElement;
  /** How many columns it spans. */
  readonly span: () => number;
}

/**
 * A masonry grid: your items in columns of at least `columnWidth`, each
 * placed in the shortest column (or in turn), the source order kept — so
 * reading and Tab follow the rows. Native (`display: grid-lanes`) where the
 * browser has it.
 */
@Directive({
  selector: '[scMasonryGridNext]',
  exportAs: 'scMasonryGridNext',
  host: {
    'data-slot': 'masonry-grid',
    '[attr.data-native]': 'native() || null',
    '[style.height.px]': 'native() ? null : height()',
    '[style.grid-template-columns]':
      'native() ? "repeat(auto-fill, minmax(min(" + columnWidth() + "px, 100%), 1fr))" : null',
    '[style.gap.px]': 'native() ? gap() : null',
    '[class]': 'class()',
  },
})
export class ScMasonryGridNext {
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  /** The least width of a column, in pixels: as many as fit. */
  readonly columnWidth = input(240);
  /** Between items, across and down, in pixels. */
  readonly gap = input(16);
  /** Each item into the shortest column, or into the next in turn. */
  readonly order = input<'shortest' | 'sequential'>('shortest');

  /**
   * The browser lays it out itself — where it can (`grid-lanes`), in the
   * shortest column: in turn, it is ours.
   */
  readonly native = computed(
    () =>
      this.order() === 'shortest' &&
      typeof CSS !== 'undefined' &&
      CSS.supports('display', 'grid-lanes'),
  );

  /** The columns, as laid out. */
  readonly columns = signal(1);
  protected readonly height = signal(0);

  protected readonly class = computed(() =>
    cn(
      this.native() ? '[display:grid-lanes]' : 'relative block',
      this.classInput(),
    ),
  );

  private readonly entries = signal<readonly ScMasonryGridEntry[]>([]);
  private readonly observer = new ResizeObserver(() => this.schedule());
  private frame = 0;

  constructor() {
    const view = inject(DOCUMENT).defaultView;
    // Any size changing — the grid's, an item's — lays it out again, once a frame.
    this.observer.observe(this.element);
    inject(DestroyRef).onDestroy(() => {
      this.observer.disconnect();
      view?.cancelAnimationFrame(this.frame);
    });
    // Its settings, or its items, changed.
    afterRenderEffect(() => {
      this.columnWidth();
      this.gap();
      this.order();
      this.native();
      for (const entry of this.entries()) entry.span();
      this.layout();
    });
  }

  ɵregister(entry: ScMasonryGridEntry): () => void {
    this.entries.update((entries) => [...entries, entry]);
    this.observer.observe(entry.element);
    return () => {
      this.observer.unobserve(entry.element);
      this.entries.update((entries) => entries.filter((e) => e !== entry));
    };
  }

  private schedule(): void {
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => this.layout());
  }

  /** Places every item: its width, then — measured — where it goes. */
  private layout(): void {
    if (this.native()) {
      // Ours no more: the browser's.
      for (const entry of this.entries()) {
        entry.element.style.width = '';
        entry.element.style.insetInlineStart = '';
        entry.element.style.top = '';
      }
      return;
    }
    const gap = this.gap();
    const width = this.element.clientWidth;
    const count = Math.max(
      1,
      Math.floor((width + gap) / (this.columnWidth() + gap)),
    );
    const column = (width - (count - 1) * gap) / count;
    const heights: number[] = Array.from({ length: count }, () => 0);
    let turn = 0;

    // In the source's order.
    const entries = [...this.entries()]
      .filter((entry) => entry.element.isConnected)
      .sort((a, b) =>
        a.element.compareDocumentPosition(b.element) &
        Node.DOCUMENT_POSITION_FOLLOWING
          ? -1
          : 1,
      );

    for (const entry of entries) {
      const element = entry.element;
      if (getComputedStyle(element).display === 'none') continue;
      const span = Math.min(count, Math.max(1, entry.span()));
      element.style.width = `${column * span + gap * (span - 1)}px`;

      // Where it fits: the shortest place across its span — or the next in turn.
      let at = 0;
      if (this.order() === 'sequential') {
        at = turn + span > count ? 0 : turn;
      } else {
        let best = Infinity;
        for (let start = 0; start + span <= count; start++) {
          const top = Math.max(...heights.slice(start, start + span));
          if (top < best) {
            best = top;
            at = start;
          }
        }
      }
      const top = Math.max(...heights.slice(at, at + span));
      const x = at * (column + gap);
      // Logical: right to left, it starts from the right — even if switched later.
      element.style.insetInlineStart = `${x}px`;
      element.style.top = `${top}px`;
      const bottom = top + element.offsetHeight + gap;
      for (let i = at; i < at + span; i++) heights[i] = bottom;
      turn = (at + span) % count;

      // Placed once: from now on, its moves are animated.
      if (!element.dataset['placed']) {
        requestAnimationFrame(() => (element.dataset['placed'] = 'true'));
      }
    }

    this.columns.set(count);
    this.height.set(Math.max(0, Math.max(...heights) - gap));
  }
}
