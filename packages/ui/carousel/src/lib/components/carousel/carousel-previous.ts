import { Directive, computed, inject, input } from '@angular/core';
import { ScButtonVariants, injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
import { ScCarousel } from './carousel';

/** To the previous slide: the style's button (outline, icon-sm), outside the carousel's start (above, vertical); disabled at the first. Write its icon and name it. */
@Directive({
  selector: 'button[scCarouselPrevious]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!carousel.canScrollPrev()',
    '(click)': 'carousel.scrollPrev()',
  },
})
export class ScCarouselPrevious {
  private readonly buttonStyles = injectStyle().button;
  /** The style's corners for these buttons. */
  private readonly corners = injectStyle().carousel.button;

  private readonly carousel = inject(ScCarousel);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  private readonly class = computed(() => {
    const isHorizontal = this.carousel.orientation() === 'horizontal';
    return cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'absolute touch-manipulation',
      this.corners,
      isHorizontal
        ? // Centred on the slides (the viewport writes where it sits).
          'top-[var(--sc-carousel-viewport-top,0px)] bottom-[var(--sc-carousel-viewport-bottom,0px)] -start-12 my-auto rtl:[&_svg]:rotate-180'
        : '-top-12 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 rotate-90',
      this.classInput(),
    );
  });
}
