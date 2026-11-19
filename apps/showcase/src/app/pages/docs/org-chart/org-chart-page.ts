import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AcrossOrgChartDemoContainer } from './demos/across-org-chart-demo-container';
import { AvatarsOrgChartDemoContainer } from './demos/avatars-org-chart-demo-container';
import { BasicOrgChartDemoContainer } from './demos/basic-org-chart-demo-container';
import { CollapsibleOrgChartDemoContainer } from './demos/collapsible-org-chart-demo-container';
import { DataOrgChartDemoContainer } from './demos/data-org-chart-demo-container';
import { SelectionOrgChartDemoContainer } from './demos/selection-org-chart-demo-container';

@Component({
  selector: 'app-org-chart-page',
  imports: [
    ScKbd,
    BasicOrgChartDemoContainer,
    AvatarsOrgChartDemoContainer,
    AcrossOrgChartDemoContainer,
    CollapsibleOrgChartDemoContainer,
    SelectionOrgChartDemoContainer,
    DataOrgChartDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scTypeset>Org Chart</h1>
        <p class="text-muted-foreground">
          Your people as nested lists, laid out as a chart and joined by lines —
          a tree for the keyboard and screen readers, collapsible and
          selectable.
        </p>
        <app-component-badges path="org-chart" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Basic</h2>
        <p class="text-muted-foreground">
          People and their reports, as nested lists — one
          <kbd scKbd>Tab</kbd> stop, then <kbd scKbd>↑</kbd>
          <kbd scKbd>↓</kbd> between people, <kbd scKbd>→</kbd>
          <kbd scKbd>←</kbd> to open and close, <kbd scKbd>Home</kbd> and
          <kbd scKbd>End</kbd>, or type a name.
        </p>
        <app-basic-org-chart-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Avatars</h2>
        <p class="text-muted-foreground">
          A card is yours to fill: here, the lib’s avatar beside the name.
        </p>
        <app-avatars-org-chart-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Across</h2>
        <p class="text-muted-foreground">
          direction="across": reports at the inline end — on the right, or on
          the left in a right-to-left page.
        </p>
        <app-across-org-chart-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Collapsible</h2>
        <p class="text-muted-foreground">
          A click, or <kbd scKbd>→</kbd> and <kbd scKbd>←</kbd>, opens and
          closes a person. Your chevron (scOrgChartExpandIcon) turns;
          [expanded]="false" starts closed.
        </p>
        <app-collapsible-org-chart-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Selection</h2>
        <p class="text-muted-foreground">
          The selected person, two-way through [(value)] —
          <kbd scKbd>Enter</kbd>, <kbd scKbd>Space</kbd> or a click — and their
          details beside the chart.
        </p>
        <app-selection-org-chart-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>From data</h2>
        <p class="text-muted-foreground">
          From your own data: a template that writes a person, then — for each
          report — itself, with the outlet’s injector (so each report finds its
          group). Any shape; here, those below the second level start closed.
        </p>
        <app-data-org-chart-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class OrgChartPage {}
