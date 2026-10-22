import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DashboardStatCardNextDemo } from './dashboard-stat-card-next-demo';

@Component({
  selector: 'app-dashboard-stat-card-next-demo-container',
  imports: [DemoContainer, DashboardStatCardNextDemo],
  template: `
    <app-demo-container
      title="Dashboard"
      [code]="code"
      demoUrl="/demos/stat-card-next/dashboard-stat-card-next-demo"
    >
      <app-dashboard-stat-card-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DashboardStatCardNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScStatCardNext,
  ScStatCardNextChange,
  ScStatCardNextDescription,
  ScStatCardNextIcon,
  ScStatCardNextLabel,
  ScStatCardNextValue,
} from '@semantic-components/ui-lab';
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
  selector: 'app-dashboard-stat-card-next-demo',
  imports: [
    ScStatCardNext,
    ScStatCardNextLabel,
    ScStatCardNextValue,
    ScStatCardNextChange,
    ScStatCardNextDescription,
    ScStatCardNextIcon,
    SiDollarSignIcon,
    SiUsersIcon,
    SiCreditCardIcon,
    SiActivityIcon,
    SiTrendingUpIcon,
    SiTrendingDownIcon,
  ],
  template: \`
    <div class="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <dl scStatCardNext>
        <dt scStatCardNextLabel>
          Revenue <svg siDollarSignIcon scStatCardNextIcon></svg>
        </dt>
        <dd
          scStatCardNextValue
          [value]="45231.89"
          [format]="{ style: 'currency', currency: 'USD' }"
        ></dd>
        <dd
          scStatCardNextChange
          [value]="0.201"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        >
          <svg siTrendingUpIcon></svg>
        </dd>
        <dd scStatCardNextDescription>from last month</dd>
      </dl>
      <dl scStatCardNext>
        <dt scStatCardNextLabel>
          Subscriptions <svg siUsersIcon scStatCardNextIcon></svg>
        </dt>
        <dd scStatCardNextValue [value]="2350"></dd>
        <dd scStatCardNextChange [value]="180"><svg siTrendingUpIcon></svg></dd>
        <dd scStatCardNextDescription>from last month</dd>
      </dl>
      <dl scStatCardNext>
        <dt scStatCardNextLabel>
          Sales <svg siCreditCardIcon scStatCardNextIcon></svg>
        </dt>
        <dd scStatCardNextValue [value]="12234"></dd>
        <dd
          scStatCardNextChange
          [value]="-0.043"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        >
          <svg siTrendingDownIcon></svg>
        </dd>
        <dd scStatCardNextDescription>from last month</dd>
      </dl>
      <dl scStatCardNext>
        <dt scStatCardNextLabel>
          Active now <svg siActivityIcon scStatCardNextIcon></svg>
        </dt>
        <dd scStatCardNextValue [value]="573"></dd>
        <dd scStatCardNextChange [value]="201"><svg siTrendingUpIcon></svg></dd>
        <dd scStatCardNextDescription>since last hour</dd>
      </dl>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DashboardStatCardNextDemo {}`;
}
