import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FeedInfiniteScrollDemo } from './feed-infinite-scroll-demo';

@Component({
  selector: 'app-feed-infinite-scroll-demo-container',
  imports: [DemoContainer, FeedInfiniteScrollDemo],
  template: `
    <app-demo-container
      title="Feed"
      [code]="code"
      demoUrl="/demos/infinite-scroll/feed-infinite-scroll-demo"
    >
      <app-feed-infinite-scroll-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FeedInfiniteScrollDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScInfiniteScroll,
  ScInfiniteScrollStatus,
  ScSpinner,
} from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

interface Item {
  readonly id: number;
  readonly title: string;
  readonly text: string;
}

/** Articles in a feed (role="feed"), more as the reader nears the end of the box: aria-busy while loading, and your words in the status — then “That’s all”. */
@Component({
  selector: 'app-feed-infinite-scroll-demo',
  imports: [
    ScInfiniteScroll,
    ScInfiniteScrollStatus,
    ScSpinner,
    SiLoaderCircleIcon,
  ],
  template: \`
    <div class="h-96 w-full max-w-lg overflow-y-auto rounded-lg border">
      <div
        scInfiniteScroll
        role="feed"
        aria-label="News"
        class="grid gap-2 p-3"
        [loading]="loading()"
        [done]="done()"
        (more)="load()"
      >
        @for (item of items(); track item.id) {
          <article
            tabindex="0"
            class="focus-visible:ring-ring/50 rounded-lg border p-3 outline-none focus-visible:ring-3"
            [attr.aria-posinset]="$index + 1"
            [attr.aria-setsize]="done() ? items().length : -1"
            [attr.aria-labelledby]="'feed-' + item.id"
          >
            <h3 [id]="'feed-' + item.id" class="font-medium">
              {{ item.title }}
            </h3>
            <p class="text-muted-foreground text-sm">{{ item.text }}</p>
          </article>
        }
      </div>
    </div>
    <p scInfiniteScrollStatus>
      @if (loading()) {
        <svg scSpinner siLoaderCircleIcon></svg> Loading more articles…
      } @else if (done()) {
        That’s all: {{ items().length }} articles.
      }
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class FeedInfiniteScrollDemo {
  readonly items = signal<Item[]>([]);
  readonly loading = signal(false);
  readonly done = signal(false);

  async load(): Promise<void> {
    this.loading.set(true);
    const more = await this.fetch();
    this.items.update((items) => [...items, ...more]);
    this.done.set(this.items().length >= 40);
    this.loading.set(false);
  }

  /** A pretend server: 8 more after a moment, 40 in all. */
  private fetch(): Promise<Item[]> {
    const from = this.items().length;
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve(
            Array.from({ length: Math.min(8, 40 - from) }, (_, i) => ({
              id: from + i + 1,
              title: 'Article ' + (from + i + 1),
              text: 'What happened today, in a few words.',
            })),
          ),
        600,
      ),
    );
  }
}`;
}
