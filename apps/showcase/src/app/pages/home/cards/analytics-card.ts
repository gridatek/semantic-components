import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBadge,
  ScButton,
  ScCard,
  ScCardAction,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
} from '@semantic-components/ui';

/** A number, its trend as an area under the card. */
@Component({
  selector: 'app-home-analytics-card',
  imports: [
    ScBadge,
    ScButton,
    ScCard,
    ScCardAction,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
  ],
  template: `
    <div scCard size="sm" class="mx-auto w-full max-w-sm pb-0">
      <div scCardHeader>
        <h2 scCardTitle>Analytics</h2>
        <p scCardDescription>418.2K Visitors <span scBadge>+10%</span></p>
        <div scCardAction>
          <button scButton variant="outline" size="sm">View Analytics</button>
        </div>
      </div>
      <svg
        viewBox="0 0 100 86"
        preserveAspectRatio="none"
        class="text-chart-1 aspect-[1/0.35] w-full"
        role="img"
        aria-label="Visitor trend"
      >
        <path
          d="M0 52L18 40L36 46L54 70L72 50L100 49V86H0Z"
          fill="currentColor"
          opacity="0.28"
        />
        <path
          d="M0 52L18 40L36 46L54 70L72 50L100 49"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HomeAnalyticsCard {}
