import { computed, Directive, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scAccordionHeader]',
  host: {
    'data-slot': 'accordion-header',
    '[class]': 'class()',
  },
})
export class ScAccordionHeader {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('flex', this.classInput()));
}
