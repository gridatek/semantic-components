import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScOrgChartNext,
  ScOrgChartNextCard,
  ScOrgChartNextGroup,
  ScOrgChartNextItem,
} from '@semantic-components/ui-lab';

/** The selected person, two-way through [(value)] — Enter, Space or a click — and their details beside the chart. */
@Component({
  selector: 'app-selection-org-chart-next-demo',
  imports: [
    ScOrgChartNext,
    ScOrgChartNextItem,
    ScOrgChartNextCard,
    ScOrgChartNextGroup,
  ],
  template: `
    <ul scOrgChartNext aria-label="Leadership" [(value)]="selected">
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
    <p class="bg-muted w-80 rounded-md p-4 text-sm" aria-live="polite">
      {{ people[selected()[0]] ?? 'No one selected.' }}
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class SelectionOrgChartNextDemo {
  readonly selected = signal<string[]>(['grace']);
  readonly people: Record<string, string> = {
    ada: 'Ada Lovelace, Chief Executive — since 2019.',
    grace: 'Grace Hopper, Chief Technology Officer — 42 engineers.',
    alan: 'Alan Turing, Platform Lead — 12 engineers.',
    katherine: 'Katherine Johnson, Data Lead — 9 analysts.',
    margaret: 'Margaret Hamilton, Chief Financial Officer — 6 people.',
    hedy: 'Hedy Lamarr, Chief Operating Officer — 18 people.',
    linus: 'Linus Torvalds, Operations Lead — 7 people.',
  };
}
