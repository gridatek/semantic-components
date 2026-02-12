import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-accordion-header]',
  host: {
    'data-slot': 'accordion-header',
    '[class]': 'class()',
  },
})
export class ScAccordionHeader {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('flex', this.classInput()));
}
