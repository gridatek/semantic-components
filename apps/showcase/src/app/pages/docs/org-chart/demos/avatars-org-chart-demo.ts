import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScOrgChart,
  ScOrgChartCard,
  ScOrgChartGroup,
  ScOrgChartItem,
} from '@semantic-components/ui';

/** A card is yours to fill: here, the lib’s avatar beside the name. */
@Component({
  selector: 'app-avatars-org-chart-demo',
  imports: [
    ScOrgChart,
    ScOrgChartItem,
    ScOrgChartCard,
    ScOrgChartGroup,
    ScAvatar,
    ScAvatarFallback,
  ],
  template: `
    <ul scOrgChart aria-label="Leadership">
      <li scOrgChartItem value="ada">
        <div scOrgChartCard>
          <span scAvatar aria-hidden="true"
            ><span scAvatarFallback>AL</span></span
          >
          <div class="grid">
            <span class="font-medium">Ada Lovelace</span>
            <span class="text-muted-foreground text-xs">Chief Executive</span>
          </div>
        </div>
        <ul scOrgChartGroup>
          <li scOrgChartItem value="grace">
            <div scOrgChartCard>
              <span scAvatar aria-hidden="true"
                ><span scAvatarFallback>GH</span></span
              >
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
                  <span scAvatar aria-hidden="true"
                    ><span scAvatarFallback>AT</span></span
                  >
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
                  <span scAvatar aria-hidden="true"
                    ><span scAvatarFallback>KJ</span></span
                  >
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
              <span scAvatar aria-hidden="true"
                ><span scAvatarFallback>MH</span></span
              >
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
              <span scAvatar aria-hidden="true"
                ><span scAvatarFallback>HL</span></span
              >
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
                  <span scAvatar aria-hidden="true"
                    ><span scAvatarFallback>LT</span></span
                  >
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
export class AvatarsOrgChartDemo {}
