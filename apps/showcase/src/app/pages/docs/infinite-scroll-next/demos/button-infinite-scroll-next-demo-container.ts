import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ButtonInfiniteScrollNextDemo } from './button-infinite-scroll-next-demo';

@Component({
  selector: 'app-button-infinite-scroll-next-demo-container',
  imports: [DemoContainer, ButtonInfiniteScrollNextDemo],
  template: `
    <app-demo-container
      title="Load more button"
      [code]="code"
      demoUrl="/demos/infinite-scroll-next/button-infinite-scroll-next-demo"
    >
      <app-button-infinite-scroll-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ButtonInfiniteScrollNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScFrame,
  ScInfiniteScrollNext,
} from '@semantic-components/ui';

interface Item {
  readonly id: number;
  readonly title: string;
}

/** auto off: only the button asks — the footer stays within reach, and the reader decides. */
@Component({
  selector: 'app-button-infinite-scroll-next-demo',
  imports: [ScButton, ScFrame, ScInfiniteScrollNext],
  template: \`
    <div class="grid w-full max-w-lg gap-3">
      <ul
        scInfiniteScrollNext
        #results="scInfiniteScrollNext"
        [auto]="false"
        scFrame
        class="divide-y"
        [loading]="loading()"
        [done]="done()"
        (more)="load()"
      >
        @for (item of items(); track item.id) {
          <li class="p-3 text-sm">{{ item.title }}</li>
        }
      </ul>
      <p
        role="status"
        class="text-muted-foreground flex min-h-6 items-center justify-center gap-2 text-sm [&>svg]:size-4 [&>svg]:shrink-0"
      >
        @if (loading()) {
          Loading…
        } @else if (done()) {
          No more results.
        } @else {
          {{ items().length }} results shown.
        }
      </p>
      @if (!results.done()) {
        <button
          scButton
          variant="outline"
          class="justify-self-center"
          [disabled]="results.loading()"
          (click)="results.loadMore()"
        >
          Load more
        </button>
      }
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class ButtonInfiniteScrollNextDemo {
  private readonly items = signal<Item[]>(
    Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      title: 'Result ' + (i + 1),
    })),
  );
  private readonly loading = signal(false);
  private readonly done = signal(false);

  private async load(): Promise<void> {
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
}`;
}
