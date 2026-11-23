import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScFrame,
  ScInfiniteScrollNext,
  ScSpinner,
} from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

interface Item {
  readonly id: number;
  readonly title: string;
}

/** In a right-to-left page: the same feed, the same keys — your words in the reader's language. */
@Component({
  selector: 'app-rtl-infinite-scroll-next-demo',
  imports: [Dir, ScFrame, ScInfiniteScrollNext, ScSpinner, SiLoaderCircleIcon],
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  template: `
    <div dir="rtl" lang="ar" class="flex w-full flex-col items-center gap-3">
      <div scFrame class="h-72 w-full max-w-lg overflow-y-auto">
        <div
          scInfiniteScrollNext
          role="feed"
          aria-label="الأخبار"
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
              [attr.aria-labelledby]="'rtl-feed-' + item.id"
            >
              <h3 [id]="'rtl-feed-' + item.id" class="font-medium">
                {{ item.title }}
              </h3>
            </article>
          }
        </div>
      </div>
      <p
        role="status"
        class="text-muted-foreground flex min-h-6 items-center justify-center gap-2 text-sm [&>svg]:size-4 [&>svg]:shrink-0"
      >
        @if (loading()) {
          <svg scSpinner siLoaderCircleIcon aria-label="جارٍ التحميل"></svg>
          مقالات أخرى…
        } @else if (done()) {
          هذا كل شيء.
        }
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlInfiniteScrollNextDemo {
  private readonly items = signal<Item[]>(page(0));
  private readonly loading = signal(false);
  private readonly done = signal(false);

  private async load(): Promise<void> {
    this.loading.set(true);
    const from = this.items().length;
    const more = await new Promise<Item[]>((resolve) =>
      setTimeout(() => resolve(page(from)), 600),
    );
    this.items.update((items) => [...items, ...more]);
    this.done.set(this.items().length >= 24);
    this.loading.set(false);
  }
}

/** Up to 8 articles from `from`, 24 in all. */
function page(from: number): Item[] {
  return Array.from({ length: Math.min(8, 24 - from) }, (_, i) => ({
    id: from + i + 1,
    title: 'المقال ' + (from + i + 1),
  }));
}
