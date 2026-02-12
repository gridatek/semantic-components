import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScCarousel } from './carousel';

@Directive({
  selector: 'div[sc-carousel-track]',
  host: {
    'data-slot': 'carousel-track',
    '[class]': 'class()',
  },
})
export class ScCarouselTrack {
  private readonly carousel = inject(ScCarousel);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => {
    const isHorizontal = this.carousel.orientation() === 'horizontal';
    return cn(
      'flex',
      isHorizontal ? '-ml-4' : '-mt-4 flex-col',
      this.classInput(),
    );
  });
}
