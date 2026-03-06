import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
  viewChild,
} from '@angular/core';
import { ScVirtualList } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-scroll-controls-virtual-list-demo',
  imports: [ScVirtualList],
  template: `
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
    <div class="overflow-hidden rounded-lg border">
      <sc-virtual-list
        #controlledList
        [items]="items()"
        [itemHeight]="40"
        height="250px"
      >
        <ng-template let-item let-index="index">
          <div
            class="hover:bg-muted/50 flex h-full items-center border-b px-4 transition-colors"
          >
            <span class="text-muted-foreground w-20 font-mono text-sm">
              #{{ (index + 1).toString().padStart(5, '0') }}
            </span>
            <span class="flex-1">{{ item }}</span>
          </div>
        </ng-template>
      </sc-virtual-list>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollControlsVirtualListDemo {
  readonly controlledList = viewChild<ScVirtualList<string>>('controlledList');

  readonly items = signal<string[]>(
    Array.from(
      { length: 10000 },
      (_, i) => `Item ${i + 1} - Lorem ipsum dolor sit amet`,
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
}
