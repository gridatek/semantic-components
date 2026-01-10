import { AccordionTrigger } from '@angular/aria/accordion';
import { Directive, input } from '@angular/core';

@Directive({
  selector: 'button[scNewAccordionTrigger]',
  hostDirectives: [
    {
      directive: AccordionTrigger,
      inputs: ['panelId', 'expanded', 'disabled', 'softDisabled'],
    },
  ],
  host: {
    class:
      'flex flex-1 items-center justify-between py-4 px-4 text-sm font-medium transition-all hover:underline [&[aria-expanded=true]>svg]:rotate-180',
  },
})
export class ScNewAccordionTrigger {}
