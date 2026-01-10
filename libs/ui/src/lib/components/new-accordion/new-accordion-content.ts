import { AccordionContent } from '@angular/aria/accordion';
import { Directive } from '@angular/core';

@Directive({
  selector: '[scNewAccordionContent]',
  hostDirectives: [AccordionContent],
  host: {
    class: 'pb-4 pt-0 px-4',
    'animate.enter': 'animate-accordion-down',
    'animate.leave': 'animate-accordion-up',
  },
})
export class ScNewAccordionContent {}
