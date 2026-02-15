import { Directive } from '@angular/core';
import { AccordionContent } from '@angular/aria/accordion';

@Directive({
  selector: 'ng-template[scAccordionContent]',
  hostDirectives: [AccordionContent],
})
export class ScAccordionContent {}
