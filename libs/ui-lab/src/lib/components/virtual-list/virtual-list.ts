import {
  Directive,
  ElementRef,
  InjectionToken,
  afterNextRender,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import type { VirtualListItem, VirtualListRange } from './virtual-list-types';

export const SC_VIRTUAL_LIST = new InjectionToken<ScVirtualList<unknown>>(
  'SC_VIRTUAL_LIST',
);

@Directive({
  selector: 'div[scVirtualList]',
  exportAs: 'scVirtualList',
  providers: [{ provide: SC_VIRTUAL_LIST, useExisting: ScVirtualList }],
  host: {
    'data-slot': 'virtual-list',
    '[class]': 'class()',
    '(scroll)': 'onScroll()',
  },
})
export class ScVirtualList<T> {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly items = input<T[]>([]);
  readonly itemHeight = input(48);
  readonly overscan = input(3);
  readonly height = input<string | number>('400px');

  readonly rangeChange = output<VirtualListRange>();

  protected readonly class = computed(() =>
    cn('overflow-auto', this.classInput()),
  );

  readonly scrollTop = signal(0);

  readonly totalHeight = computed(() => {
    return this.items().length * this.itemHeight();
  });

  private readonly visibleCount = computed(() => {
    const h = this.height();
    const heightPx = typeof h === 'number' ? h : parseInt(h, 10) || 400;
    return Math.ceil(heightPx / this.itemHeight()) + 1;
  });

  readonly startIndex = computed(() => {
    const index = Math.floor(this.scrollTop() / this.itemHeight());
    return Math.max(0, index - this.overscan());
  });

  readonly endIndex = computed(() => {
    const start = this.startIndex();
    const visible = this.visibleCount();
    const overscan = this.overscan();
    const total = this.items().length;
    return Math.min(total, start + visible + overscan * 2);
  });

  readonly offsetY = computed(() => {
    return this.startIndex() * this.itemHeight();
  });

  readonly visibleItems = computed<VirtualListItem<T>[]>(() => {
    const allItems = this.items();
    const start = this.startIndex();
    const end = this.endIndex();

    const result: VirtualListItem<T>[] = [];
    for (let i = start; i < end; i++) {
      if (allItems[i] !== undefined) {
        result.push({ index: i, data: allItems[i] });
      }
    }
    return result;
  });

  constructor() {
    afterNextRender(() => {
      this.emitRange();
    });
  }

  onScroll(): void {
    this.scrollTop.set(this.elementRef.nativeElement.scrollTop);
    this.emitRange();
  }

  private emitRange(): void {
    this.rangeChange.emit({
      start: this.startIndex(),
      end: this.endIndex(),
    });
  }

  scrollToIndex(index: number, behavior: ScrollBehavior = 'auto'): void {
    const top = index * this.itemHeight();
    this.elementRef.nativeElement.scrollTo({ top, behavior });
  }

  scrollToTop(behavior: ScrollBehavior = 'auto'): void {
    this.scrollToIndex(0, behavior);
  }

  scrollToBottom(behavior: ScrollBehavior = 'auto'): void {
    const lastIndex = Math.max(0, this.items().length - 1);
    this.scrollToIndex(lastIndex, behavior);
  }
}
