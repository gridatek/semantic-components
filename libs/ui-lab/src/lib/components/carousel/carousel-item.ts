import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScCarousel } from './carousel';

@Directive({
  selector: 'div[sc-carousel-item]',
  host: {
    'data-slot': 'carousel-item',
    role: 'group',
    'aria-roledescription': 'slide',
    '[class]': 'class()',
  },
})
export class ScCarouselItem {
  private readonly carousel = inject(ScCarousel);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => {
    const isHorizontal = this.carousel.orientation() === 'horizontal';
    return cn(
      'min-w-0 shrink-0 grow-0 basis-full',
      isHorizontal ? 'pl-4' : 'pt-4',
      this.classInput(),
    );
  });
}
