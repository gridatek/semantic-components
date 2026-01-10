import { AccordionGroup } from '@angular/aria/accordion';
import { Directive } from '@angular/core';

@Directive({
  selector: '[scNewAccordionGroup]',
  hostDirectives: [
    {
      directive: AccordionGroup,
      inputs: ['multiExpandable'],
    },
  ],
  host: {
    class: 'w-full divide-y divide-border rounded-md border',
  },
})
export class ScNewAccordionGroup {}
