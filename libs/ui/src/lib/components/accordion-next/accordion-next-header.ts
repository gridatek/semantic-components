import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** The heading around an item's trigger: its level is yours. */
@Directive({
  selector:
    'h2[scAccordionNextHeader], h3[scAccordionNextHeader], h4[scAccordionNextHeader], h5[scAccordionNextHeader], h6[scAccordionNextHeader]',
  host: {
    '[class]': 'class()',
  },
})
export class ScAccordionNextHeader {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('flex', this.classInput()));
}
