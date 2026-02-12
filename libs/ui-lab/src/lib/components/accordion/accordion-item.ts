import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-accordion-item]',
  host: {
    'data-slot': 'accordion-item',
    '[class]': 'class()',
  },
})
export class ScAccordionItem {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('not-last:border-b', this.classInput()),
  );
}
