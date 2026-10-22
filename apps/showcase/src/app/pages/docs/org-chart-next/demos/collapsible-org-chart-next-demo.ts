import { Component, ViewEncapsulation } from '@angular/core';
import { ScBadge } from '@semantic-components/ui';
import {
  ScOrgChartNext,
  ScOrgChartNextCard,
  ScOrgChartNextExpandIcon,
  ScOrgChartNextGroup,
  ScOrgChartNextItem,
} from '@semantic-components/ui-lab';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** A click, or → and ←, opens and closes a person. Your chevron (scOrgChartNextExpandIcon) turns; [expanded]="false" starts closed. */
@Component({
  selector: 'app-collapsible-org-chart-next-demo',
  imports: [
    ScOrgChartNext,
    ScOrgChartNextItem,
    ScOrgChartNextCard,
    ScOrgChartNextGroup,
    ScOrgChartNextExpandIcon,
    ScBadge,
    SiChevronDownIcon,
  ],
  template: `
    <ul scOrgChartNext aria-label="Leadership">
      <li scOrgChartNextItem value="ada">
        <div scOrgChartNextCard>
          <div class="grid">
            <span class="font-medium">Ada Lovelace</span>
            <span class="text-muted-foreground text-xs">Chief Executive</span>
          </div>
          <span scBadge variant="secondary"
            >3<span class="sr-only"> reports</span></span
          >
          <svg siChevronDownIcon scOrgChartNextExpandIcon></svg>
        </div>
        <ul scOrgChartNextGroup>
          <li scOrgChartNextItem value="grace" [expanded]="false">
            <div scOrgChartNextCard>
              <div class="grid">
                <span class="font-medium">Grace Hopper</span>
                <span class="text-muted-foreground text-xs"
                  >Chief Technology Officer</span
                >
              </div>
              <span scBadge variant="secondary"
                >2<span class="sr-only"> reports</span></span
              >
              <svg siChevronDownIcon scOrgChartNextExpandIcon></svg>
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
          <li scOrgChartNextItem value="hedy" [expanded]="false">
            <div scOrgChartNextCard>
              <div class="grid">
                <span class="font-medium">Hedy Lamarr</span>
                <span class="text-muted-foreground text-xs"
                  >Chief Operating Officer</span
                >
              </div>
              <span scBadge variant="secondary"
                >1<span class="sr-only"> reports</span></span
              >
              <svg siChevronDownIcon scOrgChartNextExpandIcon></svg>
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
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class CollapsibleOrgChartNextDemo {}
