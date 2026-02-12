import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-marquee-item]',
  host: {
    'data-slot': 'marquee-item',
    '[class]': 'class()',
  },
})
export class ScMarqueeItem {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex-shrink-0', this.classInput()),
  );
}
