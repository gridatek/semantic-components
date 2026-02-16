import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
} from '@semantic-components/ui';

@Component({
  selector: 'app-stats-card-demo',
  imports: [ScCard, ScCardBody, ScCardDescription, ScCardHeader, ScCardTitle],
  template: `
    <div class="grid gap-4 md:grid-cols-3">
      <div scCard>
        <div scCardHeader class="pb-2">
          <p scCardDescription>Total Revenue</p>
          <h3 scCardTitle class="text-2xl">$45,231.89</h3>
        </div>
        <div scCardBody>
          <p class="text-xs text-muted-foreground">+20.1% from last month</p>
        </div>
      </div>
      <div scCard>
        <div scCardHeader class="pb-2">
          <p scCardDescription>Subscriptions</p>
          <h3 scCardTitle class="text-2xl">+2,350</h3>
        </div>
        <div scCardBody>
          <p class="text-xs text-muted-foreground">+180.1% from last month</p>
        </div>
      </div>
      <div scCard>
        <div scCardHeader class="pb-2">
          <p scCardDescription>Active Now</p>
          <h3 scCardTitle class="text-2xl">+573</h3>
        </div>
        <div scCardBody>
          <p class="text-xs text-muted-foreground">+201 since last hour</p>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsCardDemo {}
