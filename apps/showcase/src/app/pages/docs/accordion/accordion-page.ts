import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicAccordionDemoContainer } from './demos/basic-accordion-demo-container';
import { DisabledAccordionDemoContainer } from './demos/disabled-accordion-demo-container';
import { MultipleAccordionDemoContainer } from './demos/multiple-accordion-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-accordion-page',
  imports: [
    BasicAccordionDemoContainer,
    DisabledAccordionDemoContainer,
    MultipleAccordionDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Accordion</h1>
        <p class="text-muted-foreground">
          A vertically stacked set of interactive headings that reveal or hide
          associated content.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-accordion-demo-container />
        <app-disabled-accordion-demo-container />
        <app-multiple-accordion-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AccordionPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'accordion')!
    .status;
}
