import { AccordionPanel } from '@angular/aria/accordion';
import { Directive } from '@angular/core';

@Directive({
  selector: '[scNewAccordionPanel]',
  hostDirectives: [
    {
      directive: AccordionPanel,
      inputs: ['panelId'],
    },
  ],
  host: {
    class: 'overflow-hidden text-sm',
  },
})
export class ScNewAccordionPanel {}
