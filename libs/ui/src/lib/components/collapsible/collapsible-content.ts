import { AccordionContent } from '@angular/aria/accordion';
import { Directive } from '@angular/core';

@Directive({
  selector: 'ng-template[scCollapsibleContent]',
  hostDirectives: [AccordionContent],
})
export class ScCollapsibleContent {}
