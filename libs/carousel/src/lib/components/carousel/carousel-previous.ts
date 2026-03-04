import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { ScButtonVariants, buttonVariants, cn } from '@semantic-components/ui';
import { ScCarousel } from './carousel';

@Component({
  selector: 'button[scCarouselPrevious]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'carousel-previous',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!carousel.canScrollPrev()',
    '[attr.aria-disabled]': '!carousel.canScrollPrev() || null',
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
        ? '-start-12 top-1/2 -translate-y-1/2'
        : 'start-1/2 -top-12 -translate-x-1/2 rotate-90 rtl:translate-x-1/2',
      this.classInput(),
    );
  });
}
