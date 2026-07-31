import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { Component, ViewEncapsulation, signal } from '@angular/core';

@Component({
  selector: 'app-custom-height-virtual-list-demo',
  imports: [
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
  ],
  template: `
    <cdk-virtual-scroll-viewport
      itemSize="36"
      class="h-[200px] rounded-lg border"
      tabindex="0"
    >
      <div
        *cdkVirtualFor="let item of items(); let i = index"
        class="hover:bg-muted/50 flex h-9 items-center border-b px-4 text-sm transition-colors"
      >
        <span class="text-muted-foreground w-12">{{ i + 1 }}</span>
        <span class="flex-1">{{ item }}</span>
      </div>
    </cdk-virtual-scroll-viewport>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomHeightVirtualListDemo {
  readonly items = signal<string[]>(
    Array.from(
      { length: 500 },
      (_, i) => `Item ${i + 1} - Lorem ipsum dolor sit amet`,
    ),
  );
}
