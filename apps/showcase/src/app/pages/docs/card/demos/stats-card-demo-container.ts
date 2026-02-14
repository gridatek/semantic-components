import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { StatsCardDemo } from './stats-card-demo';

@Component({
  selector: 'app-stats-card-demo-container',
  imports: [DemoContainer, StatsCardDemo],
  template: `
    <app-demo-container
      title="Stats Cards"
      demoUrl="/demos/card/stats-card-demo"
      [code]="code"
    >
      <app-stats-card-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsCardDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
} from '@semantic-components/ui';

@Component({
  selector: 'app-stats-card-demo',
  imports: [
    ScCard,
    ScCardContent,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
  ],
  template: \`
    <div class="grid gap-4 md:grid-cols-3">
      <div sc-card>
        <div sc-card-header class="pb-2">
          <p sc-card-description>Total Revenue</p>
          <h3 sc-card-title class="text-4xl">$45,231.89</h3>
        </div>
        <div sc-card-content>
          <p class="text-xs text-muted-foreground">+20.1% from last month</p>
        </div>
      </div>
      <div sc-card>
        <div sc-card-header class="pb-2">
          <p sc-card-description>Subscriptions</p>
          <h3 sc-card-title class="text-4xl">+2,350</h3>
        </div>
        <div sc-card-content>
          <p class="text-xs text-muted-foreground">+180.1% from last month</p>
        </div>
      </div>
      <div sc-card>
        <div sc-card-header class="pb-2">
          <p sc-card-description>Active Now</p>
          <h3 sc-card-title class="text-4xl">+573</h3>
        </div>
        <div sc-card-content>
          <p class="text-xs text-muted-foreground">+201 since last hour</p>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsCardDemo {}`;
}
