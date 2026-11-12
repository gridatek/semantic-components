import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScItem,
  ScItemBody,
  ScItemDescription,
  ScItemFooter,
  ScItemGroup,
  ScProgress,
  ScProgressRange,
  ScProgressTrack,
} from '@semantic-components/ui';

/** Two goals, each its amount and a progress bar. */
@Component({
  selector: 'app-home-savings-targets',
  imports: [
    ScCard,
    ScCardContent,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScItem,
    ScItemBody,
    ScItemDescription,
    ScItemFooter,
    ScItemGroup,
    ScProgress,
    ScProgressRange,
    ScProgressTrack,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Savings Targets</h2>
        <p scCardDescription>
          Active milestones for 2024 across your portfolio. Monitor how close
          you are to each savings goal.
        </p>
      </div>
      <div scCardContent>
        <div scItemGroup role="list" class="gap-3">
          <div
            scItem
            role="listitem"
            variant="muted"
            class="flex-col items-stretch"
          >
            <div scItemBody class="gap-3">
              <p
                scItemDescription
                class="text-muted-foreground text-xs font-medium tracking-wider uppercase"
              >
                Retirement
              </p>
              <span class="text-3xl font-semibold tabular-nums">$420,000</span>
              <div
                scProgress
                [value]="65"
                aria-label="Retirement savings progress"
              >
                <div scProgressTrack><div scProgressRange></div></div>
              </div>
            </div>
            <div scItemFooter>
              <span class="text-muted-foreground text-sm">65% achieved</span>
              <span class="text-sm font-medium tabular-nums">$273,000</span>
            </div>
          </div>
          <div
            scItem
            role="listitem"
            variant="muted"
            class="flex-col items-stretch"
          >
            <div scItemBody class="gap-3">
              <p
                scItemDescription
                class="text-muted-foreground text-xs font-medium tracking-wider uppercase"
              >
                Real Estate
              </p>
              <span class="text-3xl font-semibold tabular-nums">$85,000</span>
              <div
                scProgress
                [value]="32"
                aria-label="Real estate savings progress"
              >
                <div scProgressTrack><div scProgressRange></div></div>
              </div>
            </div>
            <div scItemFooter>
              <span class="text-muted-foreground text-sm">32% achieved</span>
              <span class="text-sm font-medium tabular-nums">$27,200</span>
            </div>
          </div>
        </div>
      </div>
      <div scCardFooter>
        <p scCardDescription class="text-center">
          You have not met your targets for this year.
        </p>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HomeSavingsTargets {}
