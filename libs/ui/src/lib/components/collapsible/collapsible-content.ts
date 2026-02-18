import { Directive } from '@angular/core';
import { AccordionContent } from '@angular/aria/accordion';

@Directive({
  selector: 'ng-template[scCollapsibleContent]',
  hostDirectives: [AccordionContent],
})
export class ScCollapsibleContent {}
