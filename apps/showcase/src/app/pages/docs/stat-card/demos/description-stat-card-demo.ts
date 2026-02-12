import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScStatCard,
  ScStatCardChange,
  ScStatCardDescription,
  ScStatCardIcon,
  ScStatCardLabel,
  ScStatCardValue,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-description-stat-card-demo',
  imports: [
    ScStatCard,
    ScStatCardLabel,
    ScStatCardValue,
    ScStatCardIcon,
    ScStatCardChange,
    ScStatCardDescription,
  ],
  template: `
    <div class="max-w-sm">
      <div sc-stat-card>
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <p sc-stat-card-label>Conversion Rate</p>
            <p sc-stat-card-value>3.24%</p>
          </div>
          <div sc-stat-card-icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="19" x2="5" y1="5" y2="19" />
              <circle cx="6.5" cy="6.5" r="2.5" />
              <circle cx="17.5" cy="17.5" r="2.5" />
            </svg>
          </div>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <span sc-stat-card-change trend="up">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
            <span>+2.4%</span>
          </span>
          <span class="text-xs text-muted-foreground">vs last week</span>
        </div>
        <p sc-stat-card-description>
          Percentage of visitors who completed a purchase
        </p>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionStatCardDemo {}
