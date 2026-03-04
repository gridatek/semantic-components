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
        ? '-end-12 top-1/2 -translate-y-1/2'
        : 'start-1/2 -bottom-12 -translate-x-1/2 rotate-90 rtl:translate-x-1/2',
      this.classInput(),
    );
  });
}
