import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-marquee-clone]',
  host: {
    'data-slot': 'marquee-clone',
    '[class]': 'class()',
  },
})
export class ScMarqueeClone {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex-shrink-0', this.classInput()),
  );
}
