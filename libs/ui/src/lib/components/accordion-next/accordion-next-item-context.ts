import type { AccordionPanel, AccordionTrigger } from '@angular/aria/accordion';
import { InjectionToken } from '@angular/core';

/** An item, for its trigger and panel to register as they are created. */
export interface ScAccordionNextItemContext {
  registerTrigger(trigger: AccordionTrigger): void;
  registerPanel(panel: AccordionPanel): void;
}

export const SC_ACCORDION_NEXT_ITEM =
  new InjectionToken<ScAccordionNextItemContext>('ScAccordionNextItem');
