import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  signal,
  TemplateRef,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { cn } from '../../utils';
import type { VirtualListItem, VirtualListRange } from './virtual-list-types';

@Component({
  selector: 'sc-virtual-list',
  imports: [NgTemplateOutlet],
  template: `
    <div
      #container
      [class]="containerClass()"
      [style.height]="containerHeight()"
      (scroll)="onScroll()"
    >
      <!-- Spacer for total content height -->
      <div [style.height.px]="totalHeight()" class="relative">
        <!-- Rendered items -->
        <div
          [style.transform]="'translateY(' + offsetY() + 'px)'"
          class="absolute top-0 left-0 right-0"
        >
          @for (
            item of visibleItems();
            track trackByFn()(item.index, item.data)
          ) {
            <div [style.height.px]="itemHeight()">
              <ng-container
                [ngTemplateOutlet]="itemTemplate()"
                [ngTemplateOutletContext]="{
                  $implicit: item.data,
                  index: item.index,
                }"
              />
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScVirtualList<T> {
  private readonly destroyRef = inject(DestroyRef);

  readonly containerRef = viewChild<ElementRef<HTMLDivElement>>('container');
  readonly itemTemplate =
    contentChild.required<TemplateRef<{ $implicit: T; index: number }>>(
      TemplateRef,
    );

  readonly items = input<T[]>([]);
  readonly itemHeight = input(48);
  readonly overscan = input(3);
  readonly height = input<string | number>('400px');
  readonly class = input<string>('');
  readonly trackByFn = input<(index: number, item: T) => unknown>(
    (index) => index,
  );

  readonly rangeChange = output<VirtualListRange>();

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

  protected readonly containerClass = computed(() =>
    cn('overflow-auto', this.class()),
  );

  constructor() {
    afterNextRender(() => {
      // Initial range emit
      this.emitRange();
    });
  }

  onScroll(): void {
    const container = this.containerRef()?.nativeElement;
    if (container) {
      this.scrollTop.set(container.scrollTop);
      this.emitRange();
    }
  }

  private emitRange(): void {
    this.rangeChange.emit({
      start: this.startIndex(),
      end: this.endIndex(),
    });
  }

  scrollToIndex(index: number, behavior: ScrollBehavior = 'auto'): void {
    const container = this.containerRef()?.nativeElement;
    if (container) {
      const top = index * this.itemHeight();
      container.scrollTo({ top, behavior });
    }
  }

  scrollToTop(behavior: ScrollBehavior = 'auto'): void {
    this.scrollToIndex(0, behavior);
  }

  scrollToBottom(behavior: ScrollBehavior = 'auto'): void {
    const lastIndex = Math.max(0, this.items().length - 1);
    this.scrollToIndex(lastIndex, behavior);
  }
}
