import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicOrgChartDemo } from './basic-org-chart-demo';

@Component({
  selector: 'app-basic-org-chart-demo-container',
  imports: [DemoContainer, BasicOrgChartDemo],
  template: `
    <app-demo-container
      title="Basic"
      [code]="code"
      demoUrl="/demos/org-chart/basic-org-chart-demo"
    >
      <app-basic-org-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicOrgChartDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScOrgChart,
  ScOrgChartCard,
  ScOrgChartGroup,
  ScOrgChartItem,
} from '@semantic-components/ui-lab';

/** People and their reports, as nested lists — one Tab stop, then ↑ ↓ between people, → ← to open and close, Home and End, or type a name. */
@Component({
  selector: 'app-basic-org-chart-demo',
  imports: [ScOrgChart, ScOrgChartItem, ScOrgChartCard, ScOrgChartGroup],
  template: \`
    <ul scOrgChart aria-label="Leadership">
      <li scOrgChartItem value="ada">
        <div scOrgChartCard>
          <div class="grid">
            <span class="font-medium">Ada Lovelace</span>
            <span class="text-muted-foreground text-xs">Chief Executive</span>
          </div>
        </div>
        <ul scOrgChartGroup>
          <li scOrgChartItem value="grace">
            <div scOrgChartCard>
              <div class="grid">
                <span class="font-medium">Grace Hopper</span>
                <span class="text-muted-foreground text-xs"
                  >Chief Technology Officer</span
                >
              </div>
            </div>
            <ul scOrgChartGroup>
              <li scOrgChartItem value="alan">
                <div scOrgChartCard>
                  <div class="grid">
                    <span class="font-medium">Alan Turing</span>
                    <span class="text-muted-foreground text-xs"
                      >Platform Lead</span
                    >
                  </div>
                </div>
              </li>
              <li scOrgChartItem value="katherine">
                <div scOrgChartCard>
                  <div class="grid">
                    <span class="font-medium">Katherine Johnson</span>
                    <span class="text-muted-foreground text-xs">Data Lead</span>
                  </div>
                </div>
              </li>
            </ul>
          </li>
          <li scOrgChartItem value="margaret">
            <div scOrgChartCard>
              <div class="grid">
                <span class="font-medium">Margaret Hamilton</span>
                <span class="text-muted-foreground text-xs"
                  >Chief Financial Officer</span
                >
              </div>
            </div>
          </li>
          <li scOrgChartItem value="hedy">
            <div scOrgChartCard>
              <div class="grid">
                <span class="font-medium">Hedy Lamarr</span>
                <span class="text-muted-foreground text-xs"
                  >Chief Operating Officer</span
                >
              </div>
            </div>
            <ul scOrgChartGroup>
              <li scOrgChartItem value="linus">
                <div scOrgChartCard>
                  <div class="grid">
                    <span class="font-medium">Linus Torvalds</span>
                    <span class="text-muted-foreground text-xs"
                      >Operations Lead</span
                    >
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicOrgChartDemo {}`;
}
