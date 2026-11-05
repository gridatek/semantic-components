import { AccordionContent } from '@angular/aria/accordion';
import { Directive } from '@angular/core';

/** A panel's content, in a template: created when the panel first opens. */
@Directive({
  selector: 'ng-template[scAccordionNextContent]',
  hostDirectives: [AccordionContent],
})
export class ScAccordionNextContent {}
