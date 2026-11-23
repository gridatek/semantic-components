import { Directive, computed, inject, input } from '@angular/core';
import { ScButtonVariants, injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
import { ScCarouselNew } from './carousel-new';

/**
 * Starts and stops the rotation: the style's button (outline, icon-sm), placed
 * where you put it. Write its icon and a name that follows the state, from
 * the carousel's `playing()` ("Pause" while it rotates, "Play" otherwise).
 */
@Directive({
  selector: 'button[scCarouselNewPlayToggle]',
  host: {
    type: 'button',
    '[attr.data-playing]': 'carousel.playing() || null',
    '[class]': 'class()',
    '(click)': 'carousel.playing.set(!carousel.playing())',
  },
})
export class ScCarouselNewPlayToggle {
  private readonly buttonStyles = injectStyle().button;
  /** The style's corners for the carousel's buttons. */
  private readonly corners = injectStyle().carousel.button;

  private readonly carousel = inject(ScCarouselNew);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'touch-manipulation',
      this.corners,
      this.classInput(),
    ),
  );
}
