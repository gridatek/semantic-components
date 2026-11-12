import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScCarouselNext } from './carousel-next';

/** The row (or column, vertical) of slides that moves in the viewport. */
@Directive({
  selector: 'div[scCarouselNextTrack]',
  host: {
    '[class]': 'class()',
  },
})
export class ScCarouselNextTrack {
  private readonly carousel = inject(ScCarouselNext);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => {
    const isHorizontal = this.carousel.orientation() === 'horizontal';
    return cn(
      'flex',
      isHorizontal ? '-ms-4' : '-mt-4 flex-col',
      this.classInput(),
    );
  });
}
