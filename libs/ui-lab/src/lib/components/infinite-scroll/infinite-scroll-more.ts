import { Directive, computed, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { ScInfiniteScroll } from './infinite-scroll';

/**
 * "Load more", for those who would rather ask — and the keyboard's way past
 * the list: `[scInfiniteScrollMore]="feed"`, the infinite scroll it asks
 * (`#feed="scInfiniteScroll"`), wherever it is. Disabled while loading,
 * hidden when done. Write its text.
 */
@Directive({
  selector: 'button[scInfiniteScrollMore]',
  host: {
    'data-slot': 'infinite-scroll-more',
    type: 'button',
    '[disabled]': 'scroll().loading()',
    '[hidden]': 'scroll().done()',
    '[class]': 'class()',
    '(click)': 'scroll().loadMore()',
  },
})
export class ScInfiniteScrollMore {
  /** The infinite scroll it asks for more. */
  readonly scroll = input.required<ScInfiniteScroll>({
    alias: 'scInfiniteScrollMore',
  });

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('default');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
