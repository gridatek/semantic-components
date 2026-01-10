import { AccordionContent } from '@angular/aria/accordion';
import { Directive } from '@angular/core';

@Directive({
  selector: '[scNewAccordionContent]',
  hostDirectives: [AccordionContent],
})
export class ScNewAccordionContent {}
