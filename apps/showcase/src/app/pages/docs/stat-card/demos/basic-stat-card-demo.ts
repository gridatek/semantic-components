import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScStatCard,
  ScStatCardChange,
  ScStatCardIcon,
  ScStatCardLabel,
  ScStatCardValue,
} from '@semantic-components/ui-lab';
import {
  SiActivityIcon,
  SiChevronDownIcon,
  SiChevronUpIcon,
  SiDollarSignIcon,
  SiUsersIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-stat-card-demo',
  imports: [
    ScStatCard,
    ScStatCardLabel,
    ScStatCardValue,
    ScStatCardIcon,
    ScStatCardChange,
    SiDollarSignIcon,
    SiUsersIcon,
    SiActivityIcon,
    SiChevronUpIcon,
    SiChevronDownIcon,
  ],
  template: `
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div scStatCard>
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <p scStatCardLabel>Total Revenue</p>
            <p scStatCardValue>$45,231.89</p>
          </div>
          <div scStatCardIcon>
            <svg siDollarSignIcon></svg>
          </div>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <span scStatCardChange trend="up">
            <svg siChevronUpIcon class="size-3.5"></svg>
            <span>+20.1%</span>
          </span>
          <span class="text-muted-foreground text-xs">from last month</span>
        </div>
      </div>

      <div scStatCard>
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <p scStatCardLabel>Subscriptions</p>
            <p scStatCardValue>2,350</p>
          </div>
          <div scStatCardIcon>
            <svg siUsersIcon></svg>
          </div>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <span scStatCardChange trend="down">
            <svg siChevronDownIcon class="size-3.5"></svg>
            <span>-10.1%</span>
          </span>
          <span class="text-muted-foreground text-xs">from last month</span>
        </div>
      </div>

      <div scStatCard>
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <p scStatCardLabel>Active Now</p>
            <p scStatCardValue>573</p>
          </div>
          <div scStatCardIcon>
            <svg siActivityIcon></svg>
          </div>
        </div>
        <div class="mt-3">
          <span class="text-muted-foreground text-xs">since last hour</span>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicStatCardDemo {}
