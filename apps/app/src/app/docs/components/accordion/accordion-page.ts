import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { AccordionDemoSection } from './accordion-demo-section';
import { NewAccordionDemoSection } from './new-accordion-demo-section';

@Component({
  selector: 'app-accordion-page',
  imports: [AccordionDemoSection, NewAccordionDemoSection],
  template: `
    <app-accordion-demo-section />
    <app-new-accordion-demo-section title="Angular ARIA Accordion" />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AccordionPage {}
