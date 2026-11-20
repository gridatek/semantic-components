import { Directive, computed, inject, input } from '@angular/core';
import { injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
import { ScCarousel } from './carousel';

/**
 * A position's dot: a click goes there, the current one is marked
 * (`aria-current`, wider, not only darker). A 24px target (WCAG 2.5.8) that
 * draws its mark itself; write its name (`<span class="sr-only">Slide 2</span>`)
 * and put the dots in a group of yours, inside the carousel.
 */
@Directive({
  selector: 'button[scCarouselDot]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-current]': 'current() || null',
    '(click)': 'carousel.activeIndex.set(index())',
  },
})
export class ScCarouselDot {
  private readonly carousel = inject(ScCarousel);
  /** The style's corners for the dot: its focus ring and its mark. */
  private readonly corners = injectStyle().carousel.dot;

  readonly classInput = input<string>('', { alias: 'class' });

  /** The position it goes to (0 … the carousel's count − 1). */
  readonly index = input.required<number>();

  private readonly current = computed(
    () => this.carousel.activeIndex() === this.index(),
  );

  private readonly class = computed(() =>
    cn(
      'focus-visible:ring-ring/50 flex h-6 min-w-6 touch-manipulation items-center justify-center outline-none focus-visible:ring-[3px]',
      this.corners,
      "after:content-[''] after:transition-all motion-reduce:after:transition-none",
      this.corners
        .split(' ')
        .filter(Boolean)
        .map((corner) => `after:${corner}`),
      this.current()
        ? 'after:bg-primary after:h-2 after:w-4 forced-colors:after:bg-[Highlight]'
        : 'after:bg-muted-foreground/50 after:size-2 forced-colors:after:bg-[ButtonText]',
      this.classInput(),
    ),
  );
}
