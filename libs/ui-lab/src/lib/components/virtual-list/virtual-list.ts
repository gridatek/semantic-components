import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  InjectionToken,
  ViewEncapsulation,
  afterNextRender,
  computed,
  contentChild,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScVirtualListItem } from './virtual-list-item';
import type { VirtualListItem, VirtualListRange } from './virtual-list-types';

export const SC_VIRTUAL_LIST = new InjectionToken<ScVirtualList<unknown>>(
  'SC_VIRTUAL_LIST',
);

@Component({
  selector: 'div[scVirtualList]',
  imports: [NgTemplateOutlet],
  exportAs: 'scVirtualList',
  providers: [{ provide: SC_VIRTUAL_LIST, useExisting: ScVirtualList }],
  template: `
    <div [style.height.px]="totalHeight()" class="relative">
      <div
        [style.transform]="'translateY(' + offsetY() + 'px)'"
        class="absolute inset-x-0 top-0"
      >
        @for (
          item of visibleItems();
          track trackByFn()(item.index, item.data)
        ) {
          <div [style.height.px]="itemHeight()">
            <ng-container
              [ngTemplateOutlet]="itemTemplateRef()"
              [ngTemplateOutletContext]="{
                $implicit: item.data,
                index: item.index,
              }"
            />
          </div>
        }
      </div>
    </div>
  `,
  host: {
    'data-slot': 'virtual-list',
    '[class]': 'class()',
    '[style.height]': 'containerHeight()',
    '(scroll)': 'onScroll()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScVirtualList<T> {
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly itemTemplate = contentChild.required(ScVirtualListItem);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly items = input<T[]>([]);
  readonly itemHeight = input(48);
  readonly overscan = input(3);
  readonly height = input<string | number>('400px');
  readonly trackByFn = input<(index: number, item: T) => unknown>(
    (index) => index,
  );

  readonly rangeChange = output<VirtualListRange>();

  protected readonly class = computed(() =>
    cn('overflow-auto', this.classInput()),
  );

  protected readonly itemTemplateRef = computed(
    () => this.itemTemplate().templateRef,
  );

  protected readonly scrollTop = signal(0);

  protected readonly containerHeight = computed(() => {
    const h = this.height();
    return typeof h === 'number' ? `${h}px` : h;
  });

  protected readonly totalHeight = computed(() => {
    return this.items().length * this.itemHeight();
  });

  protected readonly visibleCount = computed(() => {
    const h = this.height();
    const heightPx = typeof h === 'number' ? h : parseInt(h, 10) || 400;
    return Math.ceil(heightPx / this.itemHeight()) + 1;
  });

  protected readonly startIndex = computed(() => {
    const index = Math.floor(this.scrollTop() / this.itemHeight());
    return Math.max(0, index - this.overscan());
  });

  protected readonly endIndex = computed(() => {
    const start = this.startIndex();
    const visible = this.visibleCount();
    const overscan = this.overscan();
    const total = this.items().length;
    return Math.min(total, start + visible + overscan * 2);
  });

  protected readonly offsetY = computed(() => {
    return this.startIndex() * this.itemHeight();
  });

  protected readonly visibleItems = computed<VirtualListItem<T>[]>(() => {
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
