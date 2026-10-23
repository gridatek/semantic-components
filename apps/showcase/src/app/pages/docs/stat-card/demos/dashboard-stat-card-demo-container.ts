import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DashboardStatCardDemo } from './dashboard-stat-card-demo';

@Component({
  selector: 'app-dashboard-stat-card-demo-container',
  imports: [DemoContainer, DashboardStatCardDemo],
  template: `
    <app-demo-container
      title="Dashboard"
      [code]="code"
      demoUrl="/demos/stat-card/dashboard-stat-card-demo"
    >
      <app-dashboard-stat-card-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DashboardStatCardDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScStatCard,
  ScStatCardChange,
  ScStatCardDescription,
  ScStatCardIcon,
  ScStatCardLabel,
  ScStatCardValue,
} from '@semantic-components/ui';
import {
  SiActivityIcon,
  SiCreditCardIcon,
  SiDollarSignIcon,
  SiTrendingDownIcon,
  SiTrendingUpIcon,
  SiUsersIcon,
} from '@semantic-icons/lucide-icons';

/** A row of cards, each with an icon at the end of its label — two columns, then four as there is room. */
@Component({
  selector: 'app-dashboard-stat-card-demo',
  imports: [
    ScStatCard,
    ScStatCardLabel,
    ScStatCardValue,
    ScStatCardChange,
    ScStatCardDescription,
    ScStatCardIcon,
    SiDollarSignIcon,
    SiUsersIcon,
    SiCreditCardIcon,
    SiActivityIcon,
    SiTrendingUpIcon,
    SiTrendingDownIcon,
  ],
  template: \`
    <div class="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <dl scStatCard>
        <dt scStatCardLabel>
          Revenue <svg siDollarSignIcon scStatCardIcon></svg>
        </dt>
        <dd
          scStatCardValue
          [value]="45231.89"
          [format]="{ style: 'currency', currency: 'USD' }"
        ></dd>
        <dd
          scStatCardChange
          [value]="0.201"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        >
          <svg siTrendingUpIcon></svg>
        </dd>
        <dd scStatCardDescription>from last month</dd>
      </dl>
      <dl scStatCard>
        <dt scStatCardLabel>
          Subscriptions <svg siUsersIcon scStatCardIcon></svg>
        </dt>
        <dd scStatCardValue [value]="2350"></dd>
        <dd scStatCardChange [value]="180"><svg siTrendingUpIcon></svg></dd>
        <dd scStatCardDescription>from last month</dd>
      </dl>
      <dl scStatCard>
        <dt scStatCardLabel>
          Sales <svg siCreditCardIcon scStatCardIcon></svg>
        </dt>
        <dd scStatCardValue [value]="12234"></dd>
        <dd
          scStatCardChange
          [value]="-0.043"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        >
          <svg siTrendingDownIcon></svg>
        </dd>
        <dd scStatCardDescription>from last month</dd>
      </dl>
      <dl scStatCard>
        <dt scStatCardLabel>
          Active now <svg siActivityIcon scStatCardIcon></svg>
        </dt>
        <dd scStatCardValue [value]="573"></dd>
        <dd scStatCardChange [value]="201"><svg siTrendingUpIcon></svg></dd>
        <dd scStatCardDescription>since last hour</dd>
      </dl>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DashboardStatCardDemo {}`;
}
