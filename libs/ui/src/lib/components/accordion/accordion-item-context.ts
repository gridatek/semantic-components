import type { AccordionPanel, AccordionTrigger } from '@angular/aria/accordion';
import { InjectionToken } from '@angular/core';

/** An item, for its trigger and panel to register as they are created. */
export interface ScAccordionItemContext {
  registerTrigger(trigger: AccordionTrigger): void;
  registerPanel(panel: AccordionPanel): void;
}

export const SC_ACCORDION_ITEM = new InjectionToken<ScAccordionItemContext>(
  'ScAccordionItem',
);
