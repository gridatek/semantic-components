import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScStatCard,
  ScStatCardChange,
  ScStatCardLabel,
  ScStatCardValue,
} from '@semantic-components/ui-lab';
import {
  SiChevronDownIcon,
  SiChevronUpIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-variants-stat-card-demo',
  imports: [
    ScStatCard,
    ScStatCardLabel,
    ScStatCardValue,
    ScStatCardChange,
    SiChevronUpIcon,
    SiChevronDownIcon,
  ],
  template: `
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div scStatCard variant="default">
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <p scStatCardLabel>Default</p>
            <p scStatCardValue>1,234</p>
          </div>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <span scStatCardChange trend="up">
            <svg siChevronUpIcon class="size-3.5"></svg>
            <span>+12%</span>
          </span>
        </div>
      </div>

      <div scStatCard variant="outline">
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <p scStatCardLabel>Outline</p>
            <p scStatCardValue>5,678</p>
          </div>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <span scStatCardChange trend="down">
            <svg siChevronDownIcon class="size-3.5"></svg>
            <span>-5%</span>
          </span>
        </div>
      </div>

      <div scStatCard variant="filled">
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <p scStatCardLabel>Filled</p>
            <p scStatCardValue>9,012</p>
          </div>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <span scStatCardChange trend="up">
            <svg siChevronUpIcon class="size-3.5"></svg>
            <span>+8%</span>
          </span>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsStatCardDemo {}
