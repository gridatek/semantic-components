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
import { SiChartBarBigIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-sizes-stat-card-demo',
  imports: [
    ScStatCard,
    ScStatCardLabel,
    ScStatCardValue,
    ScStatCardIcon,
    SiChartBarBigIcon,
  ],
  template: `
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div scStatCard size="sm">
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <p scStatCardLabel size="sm">Small</p>
            <p scStatCardValue size="sm">1,234</p>
          </div>
          <div scStatCardIcon size="sm">
            <svg siChartBarBigIcon></svg>
          </div>
        </div>
      </div>

      <div scStatCard size="md">
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <p scStatCardLabel size="md">Medium</p>
            <p scStatCardValue size="md">5,678</p>
          </div>
          <div scStatCardIcon size="md">
            <svg siChartBarBigIcon></svg>
          </div>
        </div>
      </div>

      <div scStatCard size="lg">
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <p scStatCardLabel size="lg">Large</p>
            <p scStatCardValue size="lg">9,012</p>
          </div>
          <div scStatCardIcon size="lg">
            <svg siChartBarBigIcon></svg>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesStatCardDemo {}
