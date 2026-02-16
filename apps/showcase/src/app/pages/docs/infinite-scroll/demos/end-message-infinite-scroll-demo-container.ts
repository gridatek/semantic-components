import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { EndMessageInfiniteScrollDemo } from './end-message-infinite-scroll-demo';

@Component({
  selector: 'app-end-message-infinite-scroll-demo-container',
  imports: [DemoContainer, EndMessageInfiniteScrollDemo],
  template: `
    <app-demo-container
      title="Custom End Message"
      demoUrl="/demos/infinite-scroll/end-message-infinite-scroll-demo"
      [code]="code"
    >
      <app-end-message-infinite-scroll-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EndMessageInfiniteScrollDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScInfiniteScroll } from '@semantic-components/ui-lab';

interface Item {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-end-message-infinite-scroll-demo',
  imports: [ScInfiniteScroll],
  template: \`
    <sc-infinite-scroll
      class="h-[300px] border rounded-lg"
      [loading]="loading()"
      [hasReachedEnd]="reachedEnd()"
      endMessage="You've reached the end! 🎉"
      (loadMore)="loadMore()"
    >
      <div class="p-4 space-y-2">
        @for (item of items(); track item.id) {
          <div class="p-3 border rounded">
            {{ item.title }}
          </div>
        }
      </div>
    </sc-infinite-scroll>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EndMessageInfiniteScrollDemo {
  readonly items = signal<Item[]>(this.generateItems(0, 5));
  readonly loading = signal(false);
  readonly reachedEnd = signal(false);

  private generateItems(start: number, count: number): Item[] {
    return Array.from({ length: count }, (_, i) => ({
      id: start + i + 1,
      title: \`Item \${start + i + 1}\`,
      description: \`This is the description for item \${start + i + 1}\`,
    }));
  }

  loadMore(): void {
    if (this.loading() || this.reachedEnd()) return;
    this.loading.set(true);

    setTimeout(() => {
      const currentLength = this.items().length;
      if (currentLength >= 15) {
        this.reachedEnd.set(true);
      } else {
        this.items.update((items) => [
          ...items,
          ...this.generateItems(currentLength, 5),
        ]);
      }
      this.loading.set(false);
    }, 800);
  }
}`;
}
