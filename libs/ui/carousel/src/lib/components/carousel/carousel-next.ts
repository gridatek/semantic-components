import { Directive, computed, inject, input } from '@angular/core';
import { ScButtonVariants, cn, injectPreset } from '@semantic-components/ui';
import { ScCarousel } from './carousel';

/** To the next slide: the preset's button (outline, icon-sm), outside the carousel's end (below, vertical); disabled at the last. Write its icon and name it. */
@Directive({
  selector: 'button[scCarouselNext]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!carousel.canScrollNext()',
    '(click)': 'carousel.scrollNext()',
  },
})
export class ScCarouselNext {
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
        ? 'inset-y-0 -end-12 my-auto rtl:[&_svg]:rotate-180'
        : '-bottom-12 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 rotate-90',
      this.classInput(),
    );
  });
}
