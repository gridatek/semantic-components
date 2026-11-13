import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScHeading, ScLink } from '@semantic-components/ui';
import { Anatomy } from '../../../../components/anatomy/anatomy';
import { TocHeading } from '../../../../components/toc/toc-heading';
import { DetailsPlanDemoContainer } from './demos/details-plan-demo-container';
import { PlanUsageDemoContainer } from './demos/plan-usage-demo-container';
import { RtlPlanDemoContainer } from './demos/rtl-plan-demo-container';

/** shadcn's Plan pattern: the steps the agent plans, and how far it has got. */
@Component({
  selector: 'app-plan-page',
  imports: [
    Anatomy,
    DetailsPlanDemoContainer,
    PlanUsageDemoContainer,
    RouterLink,
    RtlPlanDemoContainer,
    ScHeading,
    ScLink,
    TocHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Plan</h1>
        <p class="text-muted-foreground">
          The steps the agent decides on before it starts, and how far it has
          got. Each step is done, running or pending, and the title counts how
          many are done.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-plan-usage-demo-container />
        <p class="text-muted-foreground">
          A <a scLink routerLink="/docs/components/trace">Trace</a> whose
          collapsible line is the plan, its steps a Trace inside. When the steps
          are not known up front, use a
          <a scLink routerLink="/docs/ai-elements/task">Task</a> instead.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Updating in place</h2>
        <p class="text-muted-foreground">
          The plan streams as one piece of data, sent again whenever a step
          moves on: the page replaces it rather than adding a new one, so the
          same plan updates.
        </p>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <div class="space-y-4">
          <p class="text-muted-foreground">
            A description above the steps, inside the plan.
          </p>
          <app-details-plan-demo-container />
        </div>
        <app-rtl-plan-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          See the
          <a scLink routerLink="/docs/components/trace" fragment="api-reference"
            >Trace</a
          >.
        </p>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class PlanPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScTrace, ScTraceLine, ScTraceIcon, ScTraceTitle, ScTraceDescription,',
      '  ScTraceCollapsible, ScTraceCollapsibleTrigger, ScTraceCollapsiblePanelContent,',
      '  ScCollapsible, ScCollapsibleTrigger, ScCollapsiblePanel,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scTrace>',
      '  <div scCollapsible scTraceCollapsible [open]="true">',
      '    <button scCollapsibleTrigger scTraceCollapsibleTrigger>',
      '      <span scTraceLine status="running">',
      '        <span scTraceIcon><svg siRouteIcon></svg></span>',
      '        <span scTraceTitle>Plan: migrate to Base UI</span>',
      '        <span scTraceDescription>2 of 4 done</span>',
      '      </span>',
      '    </button>',
      '    <div scCollapsiblePanel>',
      '      <div scTraceCollapsiblePanelContent>',
      '        <div scTrace>',
      '          <span scTraceLine status="pending">…</span>',
      '        </div>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };
}
