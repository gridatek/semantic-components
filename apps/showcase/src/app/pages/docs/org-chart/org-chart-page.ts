import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicOrgChartDemoContainer } from './demos/basic-org-chart-demo-container';
import { HorizontalOrgChartDemoContainer } from './demos/horizontal-org-chart-demo-container';
import { AvatarsOrgChartDemoContainer } from './demos/avatars-org-chart-demo-container';
import { CompactOrgChartDemoContainer } from './demos/compact-org-chart-demo-container';
import { NonCollapsibleOrgChartDemoContainer } from './demos/non-collapsible-org-chart-demo-container';
import { LargeOrgChartDemoContainer } from './demos/large-org-chart-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

import { ScHeading } from '@semantic-components/ui';

@Component({
  selector: 'app-org-chart-page',
  imports: [
    BasicOrgChartDemoContainer,
    HorizontalOrgChartDemoContainer,
    AvatarsOrgChartDemoContainer,
    CompactOrgChartDemoContainer,
    NonCollapsibleOrgChartDemoContainer,
    LargeOrgChartDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>OrgChart</h1>
        <p class="text-muted-foreground">
          A hierarchical organization chart for visualizing company structures.
        </p>
        <app-component-badges path="org-chart" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-basic-org-chart-demo-container />
        <app-horizontal-org-chart-demo-container />
        <app-avatars-org-chart-demo-container />
        <app-compact-org-chart-demo-container />
        <app-non-collapsible-org-chart-demo-container />
        <app-large-org-chart-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrgChartPage {}
