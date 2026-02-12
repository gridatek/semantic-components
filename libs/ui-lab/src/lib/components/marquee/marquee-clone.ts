import { computed, Directive, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

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
