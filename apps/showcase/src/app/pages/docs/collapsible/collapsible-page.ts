import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicCollapsibleDemoContainer } from './demos/basic-collapsible-demo-container';
import { DisabledCollapsibleDemoContainer } from './demos/disabled-collapsible-demo-container';
import { OpenCollapsibleDemoContainer } from './demos/open-collapsible-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-collapsible-page',
  imports: [
    BasicCollapsibleDemoContainer,
    OpenCollapsibleDemoContainer,
    DisabledCollapsibleDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Collapsible</h1>
        <p class="text-muted-foreground">
          An interactive component which expands/collapses a panel.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-collapsible-demo-container />
        <app-open-collapsible-demo-container />
        <app-disabled-collapsible-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CollapsiblePage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'collapsible')!
    .status;
}
