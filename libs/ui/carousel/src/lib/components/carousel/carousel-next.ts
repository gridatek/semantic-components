import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { ScButtonVariants, cn, injectPreset } from '@semantic-components/ui';
import { ScCarousel } from './carousel';

@Component({
  selector: 'button[scCarouselNext]',
  template: ` <ng-content /> `,
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!carousel.canScrollNext()',
    '[attr.aria-disabled]': '!carousel.canScrollNext() || null',
    '(click)': 'carousel.scrollNext()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScCarouselNext {
  private readonly buttonStyles = injectPreset().button;

  readonly carousel = inject(ScCarousel);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() => {
    const isHorizontal = this.carousel.orientation() === 'horizontal';
    return cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'rounded-full absolute touch-manipulation',
      isHorizontal
        ? 'inset-y-0 -end-12 my-auto'
        : '-bottom-12 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 rotate-90',
      this.classInput(),
    );
  });
}
