import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScCarouselNew } from './carousel-new';

/**
 * The row (or column, vertical) of slides that moves in the viewport. A polite
 * live region while the carousel isn't rotating: a page the user brings in is
 * announced.
 */
@Directive({
  selector: 'div[scCarouselNewTrack]',
  host: {
    '[attr.aria-live]': 'carousel.playing() ? "off" : "polite"',
    '[class]': 'class()',
  },
})
export class ScCarouselNewTrack {
  private readonly carousel = inject(ScCarouselNew);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => {
    const isHorizontal = this.carousel.orientation() === 'horizontal';
    return cn(
      'flex',
      isHorizontal ? '-ms-4' : '-mt-4 flex-col',
      this.classInput(),
    );
  });
}
