import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScCarousel } from './carousel';
import { buttonVariants, ScButtonVariants } from '../button';

@Component({
  selector: 'button[sc-carousel-previous]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'carousel-previous',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!carousel.canScrollPrev()',
    '(click)': 'carousel.scrollPrev()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCarouselPrevious {
  readonly carousel = inject(ScCarousel);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() => {
    const isHorizontal = this.carousel.orientation() === 'horizontal';
    return cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'rounded-full absolute touch-manipulation',
      isHorizontal
        ? 'top-1/2 -left-12 -translate-y-1/2'
        : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
      this.classInput(),
    );
  });
}
