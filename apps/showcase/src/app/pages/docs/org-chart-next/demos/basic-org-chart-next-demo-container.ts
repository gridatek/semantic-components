import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicOrgChartNextDemo } from './basic-org-chart-next-demo';

@Component({
  selector: 'app-basic-org-chart-next-demo-container',
  imports: [DemoContainer, BasicOrgChartNextDemo],
  template: `
    <app-demo-container
      title="Basic"
      [code]="code"
      demoUrl="/demos/org-chart-next/basic-org-chart-next-demo"
    >
      <app-basic-org-chart-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicOrgChartNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScOrgChartNext,
  ScOrgChartNextCard,
  ScOrgChartNextGroup,
  ScOrgChartNextItem,
} from '@semantic-components/ui-lab';

/** People and their reports, as nested lists — one Tab stop, then ↑ ↓ between people, → ← to open and close, Home and End, or type a name. */
@Component({
  selector: 'app-basic-org-chart-next-demo',
  imports: [
    ScOrgChartNext,
    ScOrgChartNextItem,
    ScOrgChartNextCard,
    ScOrgChartNextGroup,
  ],
  template: \`
    <ul scOrgChartNext aria-label="Leadership">
      <li scOrgChartNextItem value="ada">
        <div scOrgChartNextCard>
          <div class="grid">
            <span class="font-medium">Ada Lovelace</span>
            <span class="text-muted-foreground text-xs">Chief Executive</span>
          </div>
        </div>
        <ul scOrgChartNextGroup>
          <li scOrgChartNextItem value="grace">
            <div scOrgChartNextCard>
              <div class="grid">
                <span class="font-medium">Grace Hopper</span>
                <span class="text-muted-foreground text-xs"
                  >Chief Technology Officer</span
                >
              </div>
            </div>
            <ul scOrgChartNextGroup>
              <li scOrgChartNextItem value="alan">
                <div scOrgChartNextCard>
                  <div class="grid">
                    <span class="font-medium">Alan Turing</span>
                    <span class="text-muted-foreground text-xs"
                      >Platform Lead</span
                    >
                  </div>
                </div>
              </li>
              <li scOrgChartNextItem value="katherine">
                <div scOrgChartNextCard>
                  <div class="grid">
                    <span class="font-medium">Katherine Johnson</span>
                    <span class="text-muted-foreground text-xs">Data Lead</span>
                  </div>
                </div>
              </li>
            </ul>
          </li>
          <li scOrgChartNextItem value="margaret">
            <div scOrgChartNextCard>
              <div class="grid">
                <span class="font-medium">Margaret Hamilton</span>
                <span class="text-muted-foreground text-xs"
                  >Chief Financial Officer</span
                >
              </div>
            </div>
          </li>
          <li scOrgChartNextItem value="hedy">
            <div scOrgChartNextCard>
              <div class="grid">
                <span class="font-medium">Hedy Lamarr</span>
                <span class="text-muted-foreground text-xs"
                  >Chief Operating Officer</span
                >
              </div>
            </div>
            <ul scOrgChartNextGroup>
              <li scOrgChartNextItem value="linus">
                <div scOrgChartNextCard>
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
export class BasicOrgChartNextDemo {}`;
}
