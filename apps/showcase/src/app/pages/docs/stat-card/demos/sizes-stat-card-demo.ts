import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScStatCard,
  ScStatCardIcon,
  ScStatCardLabel,
  ScStatCardValue,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-sizes-stat-card-demo',
  imports: [ScStatCard, ScStatCardLabel, ScStatCardValue, ScStatCardIcon],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div sc-stat-card size="sm">
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <p sc-stat-card-label size="sm">Small</p>
            <p sc-stat-card-value size="sm">1,234</p>
          </div>
          <div sc-stat-card-icon size="sm">
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
              <line x1="12" x2="12" y1="20" y2="10" />
              <line x1="18" x2="18" y1="20" y2="4" />
              <line x1="6" x2="6" y1="20" y2="16" />
            </svg>
          </div>
        </div>
      </div>

      <div sc-stat-card size="md">
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <p sc-stat-card-label size="md">Medium</p>
            <p sc-stat-card-value size="md">5,678</p>
          </div>
          <div sc-stat-card-icon size="md">
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
              <line x1="12" x2="12" y1="20" y2="10" />
              <line x1="18" x2="18" y1="20" y2="4" />
              <line x1="6" x2="6" y1="20" y2="16" />
            </svg>
          </div>
        </div>
      </div>

      <div sc-stat-card size="lg">
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <p sc-stat-card-label size="lg">Large</p>
            <p sc-stat-card-value size="lg">9,012</p>
          </div>
          <div sc-stat-card-icon size="lg">
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
              <line x1="12" x2="12" y1="20" y2="10" />
              <line x1="18" x2="18" y1="20" y2="4" />
              <line x1="6" x2="6" y1="20" y2="16" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesStatCardDemo {}
