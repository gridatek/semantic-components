import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScMasonryItem } from './masonry-item';
import { DEFAULT_BREAKPOINTS, type MasonryBreakpoint } from './masonry-types';

export type MasonryLayoutMode = 'columns' | 'absolute';

@Component({
  selector: 'sc-masonry-grid',
  template: `
    <div
      #container
      [class]="containerClass()"
      [style.column-count]="
        layoutMode() === 'columns' ? currentColumns() : null
      "
      [style.column-gap.px]="layoutMode() === 'columns' ? gap() : null"
      [style.position]="layoutMode() === 'absolute' ? 'relative' : null"
      [style.height.px]="layoutMode() === 'absolute' ? containerHeight() : null"
    >
      <ng-content />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    :host ::ng-deep sc-masonry-item {
      margin-bottom: var(--masonry-gap, 16px);
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMasonryGrid {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private resizeObserver: ResizeObserver | null = null;

  readonly containerRef = viewChild<ElementRef<HTMLDivElement>>('container');
  readonly items = contentChildren(ScMasonryItem);

  readonly columns = input(4);
  readonly gap = input(16);
  readonly breakpoints = input<MasonryBreakpoint[]>(DEFAULT_BREAKPOINTS);
  readonly layoutMode = input<MasonryLayoutMode>('columns');
  readonly class = input<string>('');

  protected readonly containerWidth = signal(0);
  protected readonly containerHeight = signal(0);

  protected readonly currentColumns = computed(() => {
    const width = this.containerWidth();
    const bps = [...this.breakpoints()].sort((a, b) => b.minWidth - a.minWidth);

    for (const bp of bps) {
      if (width >= bp.minWidth) {
        return bp.columns;
      }
    }

    return this.columns();
  });

  protected readonly containerClass = computed(() =>
    cn('w-full', this.class()),
  );

  constructor() {
    // Set CSS variable for gap
    this.elementRef.nativeElement.style.setProperty(
      '--masonry-gap',
      `${this.gap()}px`,
    );

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

    const container = this.containerRef()?.nativeElement;
    if (container) {
      this.resizeObserver.observe(container);
    }

    this.destroyRef.onDestroy(() => {
      this.resizeObserver?.disconnect();
    });
  }

  private updateContainerWidth(): void {
    const container = this.containerRef()?.nativeElement;
    if (container) {
      this.containerWidth.set(container.offsetWidth);
      // Update gap CSS variable
      this.elementRef.nativeElement.style.setProperty(
        '--masonry-gap',
        `${this.gap()}px`,
      );
    }
  }

  private calculateLayout(): void {
    const container = this.containerRef()?.nativeElement;
    const itemsList = this.items();

    if (!container || itemsList.length === 0) return;

    const cols = this.currentColumns();
    const gapSize = this.gap();
    const containerW = this.containerWidth();
    const columnWidth = (containerW - (cols - 1) * gapSize) / cols;

    // Track height of each column
    const columnHeights = new Array(cols).fill(0);

    itemsList.forEach((item) => {
      const element = item.getElement();

      // Find the shortest column
      const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));

      // Calculate position
      const left = shortestColumn * (columnWidth + gapSize);
      const top = columnHeights[shortestColumn];

      // Apply styles
      element.style.position = 'absolute';
      element.style.left = `${left}px`;
      element.style.top = `${top}px`;
      element.style.width = `${columnWidth}px`;

      // Update column height
      const itemHeight = element.offsetHeight;
      columnHeights[shortestColumn] += itemHeight + gapSize;
    });

    // Set container height
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
