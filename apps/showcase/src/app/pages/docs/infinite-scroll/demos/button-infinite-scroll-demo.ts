import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScInfiniteScroll,
  ScInfiniteScrollMore,
  ScInfiniteScrollStatus,
} from '@semantic-components/ui';

interface Item {
  readonly id: number;
  readonly title: string;
}

/** auto off: only the button asks — the footer stays within reach, and the reader decides. */
@Component({
  selector: 'app-button-infinite-scroll-demo',
  imports: [ScInfiniteScroll, ScInfiniteScrollMore, ScInfiniteScrollStatus],
  template: `
    <div class="grid w-full max-w-lg gap-3">
      <ul
        scInfiniteScroll
        #results="scInfiniteScroll"
        [auto]="false"
        class="divide-y rounded-lg border"
        [loading]="loading()"
        [done]="done()"
        (more)="load()"
      >
        @for (item of items(); track item.id) {
          <li class="p-3 text-sm">{{ item.title }}</li>
        }
      </ul>
      <p scInfiniteScrollStatus>
        @if (loading()) {
          Loading…
        } @else if (done()) {
          No more results.
        } @else {
          {{ items().length }} results shown.
        }
      </p>
      <button [scInfiniteScrollMore]="results" class="justify-self-center">
        Load more
      </button>
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class ButtonInfiniteScrollDemo {
  readonly items = signal<Item[]>(
    Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      title: 'Result ' + (i + 1),
    })),
  );
  readonly loading = signal(false);
  readonly done = signal(false);

  async load(): Promise<void> {
    this.loading.set(true);
    const more = await this.fetch();
    this.items.update((items) => [...items, ...more]);
    this.done.set(this.items().length >= 15);
    this.loading.set(false);
  }

  /** A pretend server: 5 more after a moment, 15 in all. */
  private fetch(): Promise<Item[]> {
    const from = this.items().length;
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve(
            Array.from({ length: Math.min(5, 15 - from) }, (_, i) => ({
              id: from + i + 1,
              title: 'Result ' + (from + i + 1),
            })),
          ),
        600,
      ),
    );
  }
}
