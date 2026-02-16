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
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollControlsVirtualListDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ScVirtualList } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-scroll-controls-virtual-list-demo',
  imports: [ScVirtualList],
  template: \`
    <div class="flex gap-2 mb-4">
      <button
        class="px-3 py-1.5 text-sm border rounded-md hover:bg-muted transition-colors"
        (click)="scrollToTop()"
      >
        Scroll to Top
      </button>
      <button
        class="px-3 py-1.5 text-sm border rounded-md hover:bg-muted transition-colors"
        (click)="scrollToMiddle()"
      >
        Scroll to Middle
      </button>
      <button
        class="px-3 py-1.5 text-sm border rounded-md hover:bg-muted transition-colors"
        (click)="scrollToBottom()"
      >
        Scroll to Bottom
      </button>
      <input
        type="number"
        placeholder="Index"
        class="w-24 px-3 py-1.5 text-sm border rounded-md"
        #indexInput
      />
      <button
        class="px-3 py-1.5 text-sm border rounded-md hover:bg-muted transition-colors"
        (click)="scrollToIndex(indexInput.value)"
      >
        Go
      </button>
    </div>
    <div class="border rounded-lg overflow-hidden">
      <sc-virtual-list
        #controlledList
        [items]="items()"
        [itemHeight]="40"
        height="250px"
      >
        <ng-template let-item let-index="index">
          <div
            class="flex items-center px-4 h-full border-b hover:bg-muted/50 transition-colors"
          >
            <span class="w-20 text-muted-foreground text-sm font-mono">
              #{{ (index + 1).toString().padStart(5, '0') }}
            </span>
            <span class="flex-1">{{ item }}</span>
          </div>
        </ng-template>
      </sc-virtual-list>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollControlsVirtualListDemo {
  readonly controlledList = viewChild<ScVirtualList<string>>('controlledList');

  readonly items = signal<string[]>(
    Array.from(
      { length: 10000 },
      (_, i) => \`Item \${i + 1} - Lorem ipsum dolor sit amet\`,
    ),
  );

  scrollToTop(): void {
    this.controlledList()?.scrollToTop('smooth');
  }

  scrollToMiddle(): void {
    const middleIndex = Math.floor(this.items().length / 2);
    this.controlledList()?.scrollToIndex(middleIndex, 'smooth');
  }

  scrollToBottom(): void {
    this.controlledList()?.scrollToBottom('smooth');
  }

  scrollToIndex(value: string): void {
    const index = parseInt(value, 10);
    if (!isNaN(index) && index >= 0) {
      this.controlledList()?.scrollToIndex(index, 'smooth');
    }
  }
}`;
}
