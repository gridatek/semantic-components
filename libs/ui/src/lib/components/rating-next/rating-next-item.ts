import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { ScRatingNext } from './rating-next';

/**
 * A star: your icon twice — empty, then full. The full one is drawn over the
 * empty one up to the star's fill (`--sc-rating-fill`, 0 to 1: whole, half or
 * part of a star). Its place gives its score (the first is 1); hidden from
 * screen readers, the rating reads the value. Its colour is the full one's
 * (`class="text-amber-500"`).
 */
@Directive({
  selector: '[scRatingNextItem]',
  host: {
    'data-slot': 'rating-item',
    'aria-hidden': 'true',
    '[style.--sc-rating-fill]': 'fill()',
    '[class]': 'class()',
  },
})
export class ScRatingNextItem {
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly rating = inject(ScRatingNext);

  readonly classInput = input<string>('', { alias: 'class' });

  /** How much of it is filled, 0 to 1. */
  private readonly fill = computed(() => {
    const index = this.rating.indexOf(this.element);
    return Math.min(1, Math.max(0, this.rating.shown() - (index - 1)));
  });

  private readonly class = computed(() =>
    cn(
      'text-primary grid shrink-0 place-items-center',
      // Both icons in one cell; yours unsized are the rating's size.
      "[&>svg]:col-start-1 [&>svg]:row-start-1 [&>svg:not([class*='size-'])]:size-5",
      // The empty one: an outline, quieter.
      '[&>svg:first-child]:text-muted-foreground',
      // The full one: filled, cut at the fill (from the right, right to left).
      '[&>svg:last-child:not(:first-child)]:fill-current [&>svg:last-child:not(:first-child)]:[clip-path:inset(0_calc((1_-_var(--sc-rating-fill))_*_100%)_0_0)] rtl:[&>svg:last-child:not(:first-child)]:[clip-path:inset(0_0_0_calc((1_-_var(--sc-rating-fill))_*_100%))]',
      this.classInput(),
    ),
  );

  constructor() {
    const leave = this.rating.register(this.element);
    inject(DestroyRef).onDestroy(leave);
  }
}
