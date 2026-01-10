import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { AccordionDemoSection } from './accordion-demo-section';
import { AccordionMultiDemoSection } from './accordion-multi-demo-section';

@Component({
  selector: 'app-accordion-page',
  imports: [AccordionDemoSection, AccordionMultiDemoSection],
  template: `
    <app-accordion-demo-section title="Angular ARIA Accordion (Single Expansion)" />
    <app-accordion-multi-demo-section title="Angular ARIA Accordion (Multi Expansion)" />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AccordionPage {}
