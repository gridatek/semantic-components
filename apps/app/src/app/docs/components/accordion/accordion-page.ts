import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { NewAccordionDemoSection } from './new-accordion-demo-section';
import { NewAccordionMultiDemoSection } from './new-accordion-multi-demo-section';

@Component({
  selector: 'app-accordion-page',
  imports: [NewAccordionDemoSection, NewAccordionMultiDemoSection],
  template: `
    <app-new-accordion-demo-section title="Angular ARIA Accordion (Single Expansion)" />
    <app-new-accordion-multi-demo-section title="Angular ARIA Accordion (Multi Expansion)" />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AccordionPage {}
