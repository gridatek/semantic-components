import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScVirtualList,
  type VirtualListRange,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-virtual-list-demo',
  imports: [ScVirtualList],
  template: `
    <div
      scVirtualList
      #vl="scVirtualList"
      class="h-[300px] overflow-auto rounded-lg border"
      [items]="items()"
      [itemHeight]="48"
      height="300px"
      (rangeChange)="onRangeChange($event)"
    >
      <div [style.height.px]="vl.totalHeight()" class="relative">
        <div
          [style.transform]="'translateY(' + vl.offsetY() + 'px)'"
          class="absolute inset-x-0 top-0"
        >
          @for (item of vl.visibleItems(); track item.index) {
            <div
              [style.height.px]="48"
              class="hover:bg-muted/50 flex items-center border-b px-4 transition-colors"
            >
              <span class="text-muted-foreground w-16 text-sm">
                {{ item.index + 1 }}
              </span>
              <span class="flex-1">{{ item.data }}</span>
            </div>
          }
        </div>
      </div>
    </div>
    <p class="text-muted-foreground mt-2 text-sm">
      Rendering {{ items().length.toLocaleString() }} items. Visible range:
      {{ visibleRange().start }} - {{ visibleRange().end }}
    </p>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicVirtualListDemo {
  readonly visibleRange = signal<VirtualListRange>({ start: 0, end: 0 });

  readonly items = signal<string[]>(
    Array.from(
      { length: 10000 },
      (_, i) => `Item ${i + 1} - Lorem ipsum dolor sit amet`,
    ),
  );

  onRangeChange(range: VirtualListRange): void {
    this.visibleRange.set(range);
  }
}
