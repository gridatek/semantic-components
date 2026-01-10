import { AccordionContent } from '@angular/aria/accordion';
import { Directive } from '@angular/core';

@Directive({
  selector: '[scAccordionContent]',
  hostDirectives: [AccordionContent],
  host: {
    'data-slot': 'accordion-content',
  },
})
export class ScAccordionContent {}
