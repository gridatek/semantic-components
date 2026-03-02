import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicAccordionDemoContainer } from './demos/basic-accordion-demo-container';
import { DisabledAccordionDemoContainer } from './demos/disabled-accordion-demo-container';
import { MultipleAccordionDemoContainer } from './demos/multiple-accordion-demo-container';

@Component({
  selector: 'app-accordion-page',
  imports: [
    BasicAccordionDemoContainer,
    DisabledAccordionDemoContainer,
    MultipleAccordionDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Accordion</h1>
        <p class="text-muted-foreground">
          A vertically stacked set of interactive headings that reveal or hide
          associated content.
        </p>
        <app-component-badges path="accordion" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-basic-accordion-demo-container />
        <app-disabled-accordion-demo-container />
        <app-multiple-accordion-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AccordionPage {}
