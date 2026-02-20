import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { buttonVariants, cn, ScButtonVariants } from '@semantic-components/ui';
import { ScCarousel } from './carousel';

@Component({
  selector: 'button[scCarouselNext]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'carousel-next',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!carousel.canScrollNext()',
    '[attr.aria-disabled]': '!carousel.canScrollNext() || null',
    '(click)': 'carousel.scrollNext()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCarouselNext {
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
        ? 'top-1/2 -right-12 -translate-y-1/2'
        : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
      this.classInput(),
    );
  });
}
