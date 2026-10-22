import { Directive, computed, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { ScInfiniteScrollNext } from './infinite-scroll-next';

/**
 * "Load more", for those who would rather ask — and the keyboard's way past
 * the list: `[scInfiniteScrollNextMore]="feed"`, the infinite scroll it asks
 * (`#feed="scInfiniteScrollNext"`), wherever it is. Disabled while loading,
 * hidden when done. Write its text.
 */
@Directive({
  selector: 'button[scInfiniteScrollNextMore]',
  host: {
    'data-slot': 'infinite-scroll-more',
    type: 'button',
    '[disabled]': 'scroll().loading()',
    '[hidden]': 'scroll().done()',
    '[class]': 'class()',
    '(click)': 'scroll().loadMore()',
  },
})
export class ScInfiniteScrollNextMore {
  /** The infinite scroll it asks for more. */
  readonly scroll = input.required<ScInfiniteScrollNext>({
    alias: 'scInfiniteScrollNextMore',
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
