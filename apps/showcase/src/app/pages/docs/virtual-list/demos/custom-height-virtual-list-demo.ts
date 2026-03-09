import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScVirtualList } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-custom-height-virtual-list-demo',
  imports: [ScVirtualList],
  template: `
    <div
      scVirtualList
      #vl="scVirtualList"
      class="h-[200px] overflow-auto rounded-lg border"
      [items]="items()"
      [itemHeight]="36"
      height="200px"
    >
      <div [style.height.px]="vl.totalHeight()" class="relative">
        <div
          [style.transform]="'translateY(' + vl.offsetY() + 'px)'"
          class="absolute inset-x-0 top-0"
        >
          @for (item of vl.visibleItems(); track item.index) {
            <div
              [style.height.px]="36"
              class="hover:bg-muted/50 flex items-center border-b px-4 text-sm transition-colors"
            >
              <span class="text-muted-foreground w-12">
                {{ item.index + 1 }}
              </span>
              <span class="flex-1">{{ item.data }}</span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomHeightVirtualListDemo {
  readonly items = signal<string[]>(
    Array.from(
      { length: 500 },
      (_, i) => `Item ${i + 1} - Lorem ipsum dolor sit amet`,
    ),
  );
}
