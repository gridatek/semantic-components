import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicStatCardDemo } from './basic-stat-card-demo';

@Component({
  selector: 'app-basic-stat-card-demo-container',
  imports: [DemoContainer, BasicStatCardDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/stat-card/basic-stat-card-demo"
      [code]="code"
    >
      <app-basic-stat-card-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicStatCardDemoContainer {
  readonly code = `import {
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

@Component({
  selector: 'app-basic-stat-card-demo',
  imports: [
    ScStatCard,
    ScStatCardLabel,
    ScStatCardValue,
    ScStatCardIcon,
    ScStatCardChange,
  ],
  template: \`
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div sc-stat-card>
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <p sc-stat-card-label>Total Revenue</p>
            <p sc-stat-card-value>$45,231.89</p>
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
              <line x1="12" x2="12" y1="2" y2="22" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
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
            <span>+20.1%</span>
          </span>
          <span class="text-xs text-muted-foreground">from last month</span>
        </div>
      </div>

      <div sc-stat-card>
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <p sc-stat-card-label>Subscriptions</p>
            <p sc-stat-card-value>2,350</p>
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <span sc-stat-card-change trend="down">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
            <span>-10.1%</span>
          </span>
          <span class="text-xs text-muted-foreground">from last month</span>
        </div>
      </div>

      <div sc-stat-card>
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <p sc-stat-card-label>Active Now</p>
            <p sc-stat-card-value>573</p>
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
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
        </div>
        <div class="mt-3">
          <span class="text-xs text-muted-foreground">since last hour</span>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicStatCardDemo {}`;
}
