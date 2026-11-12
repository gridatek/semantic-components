import { Directive, computed, inject, input } from '@angular/core';
import { ScButtonVariants, injectPreset } from '@semantic-components/ui';
import { cn } from 'cn';
import { ScCarousel } from './carousel';

/** To the previous slide: the preset's button (outline, icon-sm), outside the carousel's start (above, vertical); disabled at the first. Write its icon and name it. */
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
  private readonly buttonStyles = injectPreset().button;
  /** The preset's corners for these buttons. */
  private readonly corners = injectPreset().carousel;

  readonly carousel = inject(ScCarousel);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() => {
    const isHorizontal = this.carousel.orientation() === 'horizontal';
    return cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'absolute touch-manipulation',
      this.corners,
      isHorizontal
        ? 'inset-y-0 -start-12 my-auto rtl:[&_svg]:rotate-180'
        : '-top-12 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 rotate-90',
      this.classInput(),
    );
  });
}
