import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  contentChildren,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import {
  DEFAULT_BREAKPOINTS,
  type MasonryBreakpoint,
  type MasonryLayoutMode,
  SC_MASONRY_GRID,
  SC_MASONRY_ITEM,
} from './masonry-types';

@Directive({
  selector: '[scMasonryGrid]',
  exportAs: 'scMasonryGrid',
  providers: [{ provide: SC_MASONRY_GRID, useExisting: ScMasonryGrid }],
  host: {
    'data-slot': 'masonry-grid',
    '[class]': 'class()',
    '[style.column-count]':
      "layoutMode() === 'columns' ? currentColumns() : null",
    '[style.column-gap.px]': "layoutMode() === 'columns' ? gap() : null",
    '[style.position]': "layoutMode() === 'absolute' ? 'relative' : null",
    '[style.height.px]':
      "layoutMode() === 'absolute' ? containerHeight() : null",
  },
})
export class ScMasonryGrid {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private resizeObserver: ResizeObserver | null = null;

  readonly items = contentChildren(SC_MASONRY_ITEM);

  readonly columns = input(4);
  readonly gap = input(16);
  readonly breakpoints = input<MasonryBreakpoint[]>(DEFAULT_BREAKPOINTS);
  readonly layoutMode = input<MasonryLayoutMode>('columns');
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('block w-full', this.classInput()),
  );

  protected readonly containerWidth = signal(0);
  protected readonly containerHeight = signal(0);

  readonly currentColumns = computed(() => {
    const width = this.containerWidth();
    const bps = [...this.breakpoints()].sort((a, b) => b.minWidth - a.minWidth);

    for (const bp of bps) {
      if (width >= bp.minWidth) {
        return bp.columns;
      }
    }

    return this.columns();
  });

  constructor() {
    afterNextRender(() => {
      this.observeResize();
      this.updateContainerWidth();

      if (this.layoutMode() === 'absolute') {
        this.calculateLayout();
      }
    });
  }

  private observeResize(): void {
    if (typeof ResizeObserver === 'undefined') return;

    this.resizeObserver = new ResizeObserver(() => {
      this.updateContainerWidth();
      if (this.layoutMode() === 'absolute') {
        this.calculateLayout();
      }
    });

    this.resizeObserver.observe(this.elementRef.nativeElement);

    this.destroyRef.onDestroy(() => {
      this.resizeObserver?.disconnect();
    });
  }

  private updateContainerWidth(): void {
    this.containerWidth.set(this.elementRef.nativeElement.offsetWidth);
  }

  private calculateLayout(): void {
    const itemsList = this.items();

    if (itemsList.length === 0) return;

    const cols = this.currentColumns();
    const gapSize = this.gap();
    const containerW = this.containerWidth();
    const columnWidth = (containerW - (cols - 1) * gapSize) / cols;

    const columnHeights = new Array(cols).fill(0);

    itemsList.forEach((item) => {
      const element = item.getElement();

      const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
      const left = shortestColumn * (columnWidth + gapSize);
      const top = columnHeights[shortestColumn];

      element.style.position = 'absolute';
      element.style.left = `${left}px`;
      element.style.top = `${top}px`;
      element.style.width = `${columnWidth}px`;

      const itemHeight = element.offsetHeight;
      columnHeights[shortestColumn] += itemHeight + gapSize;
    });

    this.containerHeight.set(Math.max(...columnHeights) - gapSize);
  }

  /** Recalculate the layout manually */
  relayout(): void {
    this.updateContainerWidth();
    if (this.layoutMode() === 'absolute') {
      this.calculateLayout();
    }
  }
}
