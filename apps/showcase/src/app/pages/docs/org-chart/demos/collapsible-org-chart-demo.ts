import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBadge,
  ScOrgChart,
  ScOrgChartCard,
  ScOrgChartExpandIcon,
  ScOrgChartGroup,
  ScOrgChartItem,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** A click, or → and ←, opens and closes a person. Your chevron (scOrgChartExpandIcon) turns; [expanded]="false" starts closed. */
@Component({
  selector: 'app-collapsible-org-chart-demo',
  imports: [
    ScOrgChart,
    ScOrgChartItem,
    ScOrgChartCard,
    ScOrgChartGroup,
    ScOrgChartExpandIcon,
    ScBadge,
    SiChevronDownIcon,
  ],
  template: `
    <ul scOrgChart aria-label="Leadership">
      <li scOrgChartItem value="ada">
        <div scOrgChartCard>
          <div class="grid">
            <span class="font-medium">Ada Lovelace</span>
            <span class="text-muted-foreground text-xs">Chief Executive</span>
          </div>
          <span scBadge variant="secondary"
            >3<span class="sr-only"> reports</span></span
          >
          <svg siChevronDownIcon scOrgChartExpandIcon></svg>
        </div>
        <ul scOrgChartGroup>
          <li scOrgChartItem value="grace" [expanded]="false">
            <div scOrgChartCard>
              <div class="grid">
                <span class="font-medium">Grace Hopper</span>
                <span class="text-muted-foreground text-xs"
                  >Chief Technology Officer</span
                >
              </div>
              <span scBadge variant="secondary"
                >2<span class="sr-only"> reports</span></span
              >
              <svg siChevronDownIcon scOrgChartExpandIcon></svg>
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
          <li scOrgChartItem value="hedy" [expanded]="false">
            <div scOrgChartCard>
              <div class="grid">
                <span class="font-medium">Hedy Lamarr</span>
                <span class="text-muted-foreground text-xs"
                  >Chief Operating Officer</span
                >
              </div>
              <span scBadge variant="secondary"
                >1<span class="sr-only"> reports</span></span
              >
              <svg siChevronDownIcon scOrgChartExpandIcon></svg>
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
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class CollapsibleOrgChartDemo {}
