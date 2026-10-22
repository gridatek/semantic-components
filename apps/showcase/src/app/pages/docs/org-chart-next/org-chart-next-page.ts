import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AcrossOrgChartNextDemoContainer } from './demos/across-org-chart-next-demo-container';
import { AvatarsOrgChartNextDemoContainer } from './demos/avatars-org-chart-next-demo-container';
import { BasicOrgChartNextDemoContainer } from './demos/basic-org-chart-next-demo-container';
import { CollapsibleOrgChartNextDemoContainer } from './demos/collapsible-org-chart-next-demo-container';
import { DataOrgChartNextDemoContainer } from './demos/data-org-chart-next-demo-container';
import { SelectionOrgChartNextDemoContainer } from './demos/selection-org-chart-next-demo-container';

@Component({
  selector: 'app-org-chart-next-page',
  imports: [
    BasicOrgChartNextDemoContainer,
    AvatarsOrgChartNextDemoContainer,
    AcrossOrgChartNextDemoContainer,
    CollapsibleOrgChartNextDemoContainer,
    SelectionOrgChartNextDemoContainer,
    DataOrgChartNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Org Chart Next</h1>
        <p class="text-muted-foreground">
          The org chart, rebuilt: your people as nested lists, laid out as a
          chart and joined by lines — a tree for the keyboard and screen
          readers, collapsible and selectable.
        </p>
        <app-component-badges path="org-chart-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Basic</h2>
        <p class="text-muted-foreground">
          People and their reports, as nested lists — one Tab stop, then ↑ ↓
          between people, → ← to open and close, Home and End, or type a name.
        </p>
        <app-basic-org-chart-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Avatars</h2>
        <p class="text-muted-foreground">
          A card is yours to fill: here, the lib’s avatar beside the name.
        </p>
        <app-avatars-org-chart-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Across</h2>
        <p class="text-muted-foreground">
          direction="across": reports at the inline end — on the right, or on
          the left in a right-to-left page.
        </p>
        <app-across-org-chart-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Collapsible</h2>
        <p class="text-muted-foreground">
          A click, or → and ←, opens and closes a person. Your chevron
          (scOrgChartNextExpandIcon) turns; [expanded]="false" starts closed.
        </p>
        <app-collapsible-org-chart-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Selection</h2>
        <p class="text-muted-foreground">
          The selected person, two-way through [(value)] — Enter, Space or a
          click — and their details beside the chart.
        </p>
        <app-selection-org-chart-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>From data</h2>
        <p class="text-muted-foreground">
          From your own data: a template that writes a person, then — for each
          report — itself, with the outlet’s injector (so each report finds its
          group). Any shape; here, those below the second level start closed.
        </p>
        <app-data-org-chart-next-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class OrgChartNextPage {}
