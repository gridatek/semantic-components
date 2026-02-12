import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'sc-virtual-scroll',
  exportAs: 'scVirtualScroll',
  template: `
    <div #viewport [class]="viewportClass()" (scroll)="onScroll()">
      <div [style.height.px]="totalHeight()" [style.position]="'relative'">
        <div [style.transform]="'translateY(' + offsetY() + 'px)'">
          @for (item of visibleItems(); track trackByFn()(item, $index)) {
            <div [style.height.px]="itemHeight()">
              <ng-content />
            </div>
          }
        </div>
      </div>
    </div>
  `,
  host: {
    'data-slot': 'virtual-scroll',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScVirtualScroll<T> {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly items = input<T[]>([]);
  readonly itemHeight = input<number>(50);
  readonly overscan = input<number>(3);
  readonly trackByFn = input<(item: T, index: number) => unknown>((_, i) => i);

  private readonly scrollTop = signal(0);
  private viewportEl: HTMLElement | null = null;

  protected readonly viewportClass = computed(() =>
    cn('overflow-auto', this.classInput()),
  );

  protected readonly totalHeight = computed(
    () => this.items().length * this.itemHeight(),
  );

  protected readonly visibleRange = computed(() => {
    const viewportHeight = this.viewportEl?.clientHeight || 400;
    const start = Math.floor(this.scrollTop() / this.itemHeight());
    const visibleCount = Math.ceil(viewportHeight / this.itemHeight());
    const overscan = this.overscan();

    return {
      start: Math.max(0, start - overscan),
      end: Math.min(this.items().length, start + visibleCount + overscan),
    };
  });

  protected readonly visibleItems = computed(() => {
    const { start, end } = this.visibleRange();
    return this.items().slice(start, end);
  });

  protected readonly offsetY = computed(() => {
    return this.visibleRange().start * this.itemHeight();
  });

  onScroll(): void {
    if (this.viewportEl) {
      this.scrollTop.set(this.viewportEl.scrollTop);
    }
  }

  scrollToIndex(index: number): void {
    if (this.viewportEl) {
      this.viewportEl.scrollTop = index * this.itemHeight();
    }
  }
}
