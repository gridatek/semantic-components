import { AccordionContent } from '@angular/aria/accordion';
import { Directive, computed, input } from '@angular/core';

import { cn } from '@semantic-components/utils';

@Directive({
  selector: '[scNewAccordionContent]',
  hostDirectives: [AccordionContent],
  host: {
    '[class]': 'class()',
    'animate.enter': 'animate-accordion-down',
    'animate.leave': 'animate-accordion-up',
  },
})
export class ScNewAccordionContent {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() => cn('pb-4 pt-0 px-4', this.classInput()));
}
