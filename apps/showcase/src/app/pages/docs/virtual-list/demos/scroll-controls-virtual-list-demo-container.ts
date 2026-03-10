import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ScrollControlsVirtualListDemo } from './scroll-controls-virtual-list-demo';

@Component({
  selector: 'app-scroll-controls-virtual-list-demo-container',
  imports: [DemoContainer, ScrollControlsVirtualListDemo],
  template: `
    <app-demo-container
      title="Scroll Controls"
      demoUrl="/demos/virtual-list/scroll-controls-virtual-list-demo"
      [code]="code"
    >
      <app-scroll-controls-virtual-list-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollControlsVirtualListDemoContainer {
  readonly code = `import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-scroll-controls-virtual-list-demo',
  imports: [
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
  ],
  template: \`
    <div class="mb-4 flex gap-2">
      <button
        class="hover:bg-muted rounded-md border px-3 py-1.5 text-sm transition-colors"
        (click)="scrollToTop()"
      >
        Scroll to Top
      </button>
      <button
        class="hover:bg-muted rounded-md border px-3 py-1.5 text-sm transition-colors"
        (click)="scrollToMiddle()"
      >
        Scroll to Middle
      </button>
      <button
        class="hover:bg-muted rounded-md border px-3 py-1.5 text-sm transition-colors"
        (click)="scrollToBottom()"
      >
        Scroll to Bottom
      </button>
      <input
        type="number"
        placeholder="Index"
        class="w-24 rounded-md border px-3 py-1.5 text-sm"
        #indexInput
      />
      <button
        class="hover:bg-muted rounded-md border px-3 py-1.5 text-sm transition-colors"
        (click)="scrollToIndex(indexInput.value)"
      >
        Go
      </button>
    </div>
    <cdk-virtual-scroll-viewport
      itemSize="40"
      class="h-[250px] rounded-lg border"
    >
      <div
        *cdkVirtualFor="let item of items(); let i = index"
        class="hover:bg-muted/50 flex h-10 items-center border-b px-4 transition-colors"
      >
        <span class="text-muted-foreground w-20 font-mono text-sm">
          #{{ (i + 1).toString().padStart(5, '0') }}
        </span>
        <span class="flex-1">{{ item }}</span>
      </div>
    </cdk-virtual-scroll-viewport>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollControlsVirtualListDemo {
  readonly viewport = viewChild(CdkVirtualScrollViewport);

  readonly items = signal<string[]>(
    Array.from(
      { length: 10000 },
      (_, i) => \`Item \${i + 1} - Lorem ipsum dolor sit amet\`,
    ),
  );

  scrollToTop(): void {
    this.viewport()?.scrollToIndex(0, 'smooth');
  }

  scrollToMiddle(): void {
    const middleIndex = Math.floor(this.items().length / 2);
    this.viewport()?.scrollToIndex(middleIndex, 'smooth');
  }

  scrollToBottom(): void {
    const lastIndex = Math.max(0, this.items().length - 1);
    this.viewport()?.scrollToIndex(lastIndex, 'smooth');
  }

  scrollToIndex(value: string): void {
    const index = parseInt(value, 10);
    if (!isNaN(index) && index >= 0) {
      this.viewport()?.scrollToIndex(index, 'smooth');
    }
  }
}`;
}
