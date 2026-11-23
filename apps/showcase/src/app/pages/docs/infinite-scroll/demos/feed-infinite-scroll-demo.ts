import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScFrame, ScInfiniteScroll, ScSpinner } from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

interface Item {
  readonly id: number;
  readonly title: string;
  readonly text: string;
}

/** Articles in a feed (role="feed"), more as the reader nears the end of the box: aria-busy while loading, your words in a status. The feed’s keys: Page Down / Page Up between articles (on the last, more), Ctrl+End / Ctrl+Home out of it. */
@Component({
  selector: 'app-feed-infinite-scroll-demo',
  imports: [ScFrame, ScInfiniteScroll, ScSpinner, SiLoaderCircleIcon],
  template: `
    <div scFrame class="h-96 w-full max-w-lg overflow-y-auto">
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
            scFrame
            class="focus-visible:ring-ring/50 p-3 outline-none focus-visible:ring-3"
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
    <p
      role="status"
      class="text-muted-foreground flex min-h-6 items-center justify-center gap-2 text-sm [&>svg]:size-4 [&>svg]:shrink-0"
    >
      @if (loading()) {
        <svg scSpinner siLoaderCircleIcon aria-label="Loading"></svg> More
        articles…
      } @else if (done()) {
        That’s all: {{ items().length }} articles.
      }
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class FeedInfiniteScrollDemo {
  // The first page comes with the page (rendered on the server too): a feed
  // is never empty — the rest as you scroll.
  private readonly items = signal<Item[]>(page(0));
  private readonly loading = signal(false);
  private readonly done = signal(false);

  private async load(): Promise<void> {
    this.loading.set(true);
    const more = await this.fetch();
    this.items.update((items) => [...items, ...more]);
    this.done.set(this.items().length >= 40);
    this.loading.set(false);
  }

  /** A pretend server: 8 more after a moment, 40 in all. */
  private fetch(): Promise<Item[]> {
    const from = this.items().length;
    return new Promise((resolve) => setTimeout(() => resolve(page(from)), 600));
  }
}

/** Up to 8 articles from `from`, 40 in all. */
function page(from: number): Item[] {
  return Array.from({ length: Math.min(8, 40 - from) }, (_, i) => ({
    id: from + i + 1,
    title: 'Article ' + (from + i + 1),
    text: 'What happened today, in a few words.',
  }));
}
