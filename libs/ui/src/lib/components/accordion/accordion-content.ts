import { AccordionContent } from '@angular/aria/accordion';
import { Directive } from '@angular/core';

@Directive({
  selector: 'ng-template[scAccordionContent]',
  hostDirectives: [AccordionContent],
})
export class ScAccordionContent {}
