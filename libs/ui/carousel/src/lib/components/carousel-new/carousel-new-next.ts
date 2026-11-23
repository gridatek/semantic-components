import { Directive, computed, inject, input } from '@angular/core';
import { ScButtonVariants, injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
import { ScCarouselNew } from './carousel-new';

/** To the next page: the style's button (outline, icon-sm), outside the carousel's end (below, vertical). At the last page (not looping) it is aria-disabled, still focusable. Write its icon and name it. */
@Directive({
  selector: 'button[scCarouselNewNext]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-disabled]': '!carousel.canNext() || null',
    '(click)': 'onClick()',
  },
})
export class ScCarouselNewNext {
  private readonly buttonStyles = injectStyle().button;
  /** The style's corners for these buttons. */
  private readonly corners = injectStyle().carousel.button;

  private readonly carousel = inject(ScCarouselNew);

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
        ? 'inset-y-0 -end-12 my-auto rtl:[&_svg]:rotate-180'
        : '-bottom-12 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 rotate-90',
      this.classInput(),
    );
  });

  private onClick(): void {
    if (this.carousel.canNext()) this.carousel.next();
  }
}
