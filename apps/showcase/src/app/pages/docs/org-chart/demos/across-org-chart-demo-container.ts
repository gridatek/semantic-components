import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AcrossOrgChartDemo } from './across-org-chart-demo';

@Component({
  selector: 'app-across-org-chart-demo-container',
  imports: [DemoContainer, AcrossOrgChartDemo],
  template: `
    <app-demo-container
      title="Across"
      [code]="code"
      demoUrl="/demos/org-chart/across-org-chart-demo"
    >
      <app-across-org-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AcrossOrgChartDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScOrgChart,
  ScOrgChartCard,
  ScOrgChartGroup,
  ScOrgChartItem,
} from '@semantic-components/ui-lab';

/** direction="across": reports at the inline end — on the right, or on the left in a right-to-left page. */
@Component({
  selector: 'app-across-org-chart-demo',
  imports: [
    ScOrgChart,
    ScOrgChartItem,
    ScOrgChartCard,
    ScOrgChartGroup,
  ],
  template: \`
    <ul scOrgChart aria-label="Leadership" direction="across">
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
export class AcrossOrgChartDemo {}`;
}
