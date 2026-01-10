import { AccordionPanel } from '@angular/aria/accordion';
import { Directive, computed, input } from '@angular/core';

import { cn } from '@semantic-components/utils';

@Directive({
  selector: '[scAccordionPanel]',
  hostDirectives: [
    {
      directive: AccordionPanel,
      inputs: ['panelId'],
    },
  ],
  host: {
    'data-slot': 'accordion-panel',
    '[class]': 'class()',
  },
})
export class ScAccordionPanel {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() => cn('overflow-hidden text-sm', this.classInput()));
}
