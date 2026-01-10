import { AccordionTrigger } from '@angular/aria/accordion';
import { Directive, computed, input } from '@angular/core';

import { cn } from '@semantic-components/utils';

@Directive({
  selector: 'button[scAccordionTrigger]',
  hostDirectives: [
    {
      directive: AccordionTrigger,
      inputs: ['panelId', 'expanded', 'disabled'],
    },
  ],
  host: {
    'data-slot': 'accordion-trigger',
    '[class]': 'class()',
  },
})
export class ScAccordionTrigger {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      'flex flex-1 items-center justify-between py-4 px-4 text-sm font-medium transition-all hover:underline [&[aria-expanded=true]>svg]:rotate-180',
      this.classInput(),
    ),
  );
}
