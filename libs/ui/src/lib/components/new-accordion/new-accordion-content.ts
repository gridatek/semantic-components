import { AccordionContent } from '@angular/aria/accordion';
import { Directive } from '@angular/core';

@Directive({
  selector: '[scNewAccordionContent]',
  hostDirectives: [AccordionContent],
  host: {
    'data-slot': 'accordion-content',
  },
})
export class ScNewAccordionContent {}
