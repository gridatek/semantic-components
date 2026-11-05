import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** The heading around an item's trigger: its level is yours. */
@Directive({
  selector:
    'h2[scAccordionHeader], h3[scAccordionHeader], h4[scAccordionHeader], h5[scAccordionHeader], h6[scAccordionHeader]',
  host: {
    '[class]': 'class()',
  },
})
export class ScAccordionHeader {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('flex', this.classInput()));
}
