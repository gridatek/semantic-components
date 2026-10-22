import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ErrorInfiniteScrollDemo } from './error-infinite-scroll-demo';

@Component({
  selector: 'app-error-infinite-scroll-demo-container',
  imports: [DemoContainer, ErrorInfiniteScrollDemo],
  template: `
    <app-demo-container
      title="Error and retry"
      [code]="code"
      demoUrl="/demos/infinite-scroll/error-infinite-scroll-demo"
    >
      <app-error-infinite-scroll-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ErrorInfiniteScrollDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScInfiniteScroll,
  ScInfiniteScrollMore,
  ScInfiniteScrollStatus,
} from '@semantic-components/ui-lab';

interface Item {
  readonly id: number;
  readonly title: string;
}

/** A load fails: auto off, so it does not ask again by itself; the status says so and the button tries again. */
@Component({
  selector: 'app-error-infinite-scroll-demo',
  imports: [
    ScInfiniteScroll,
    ScInfiniteScrollMore,
    ScInfiniteScrollStatus,
  ],
  template: \`
    <div
      class="h-80 w-full max-w-lg overflow-y-auto rounded-lg border"
      tabindex="0"
      role="region"
      aria-label="Orders"
    >
      <ul
        scInfiniteScroll
        #orders="scInfiniteScroll"
        class="divide-y"
        [auto]="!failed()"
        [loading]="loading()"
        [done]="done()"
        (more)="load()"
      >
        @for (item of items(); track item.id) {
          <li class="p-3 text-sm">{{ item.title }}</li>
        }
      </ul>
      <div class="grid justify-items-center gap-2 p-3">
        <p scInfiniteScrollStatus [class.text-destructive]="failed()">
          @if (loading()) {
            Loading…
          } @else if (failed()) {
            The orders could not be loaded.
          } @else if (done()) {
            All {{ items().length }} orders.
          }
        </p>
        @if (failed()) {
          <button [scInfiniteScrollMore]="orders">Try again</button>
        }
      </div>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class ErrorInfiniteScrollDemo {
  readonly items = signal<Item[]>([]);
  readonly loading = signal(false);
  readonly done = signal(false);
  readonly failed = signal(false);
  private calls = 0;

  async load(): Promise<void> {
    this.loading.set(true);
    try {
      const more = await this.fetch();
      this.failed.set(false);
      this.items.update((items) => [...items, ...more]);
      this.done.set(this.items().length >= 40);
    } catch {
      this.failed.set(true);
    } finally {
      this.loading.set(false);
    }
  }

  /** A pretend server that fails every third call. */
  private fetch(): Promise<Item[]> {
    const from = this.items().length;
    const fails = ++this.calls % 3 === 0;
    return new Promise((resolve, reject) =>
      setTimeout(
        () =>
          fails
            ? reject(new Error('offline'))
            : resolve(
                Array.from({ length: 10 }, (_, i) => ({
                  id: from + i + 1,
                  title: 'Order #' + (1000 + from + i + 1),
                })),
              ),
        600,
      ),
    );
  }
}`;
}
