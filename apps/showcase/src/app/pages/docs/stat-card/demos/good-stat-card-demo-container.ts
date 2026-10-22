import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GoodStatCardDemo } from './good-stat-card-demo';

@Component({
  selector: 'app-good-stat-card-demo-container',
  imports: [DemoContainer, GoodStatCardDemo],
  template: `
    <app-demo-container
      title="Good direction"
      [code]="code"
      demoUrl="/demos/stat-card/good-stat-card-demo"
    >
      <app-good-stat-card-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GoodStatCardDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScStatCard,
  ScStatCardChange,
  ScStatCardDescription,
  ScStatCardLabel,
  ScStatCardValue,
} from '@semantic-components/ui-lab';
import {
  SiTrendingDownIcon,
  SiTrendingUpIcon,
} from '@semantic-icons/lucide-icons';

/** When down is good news — costs, errors, wait times — say so with good="down": the colour follows the meaning, the sign the number. Unchanged is neither. */
@Component({
  selector: 'app-good-stat-card-demo',
  imports: [
    ScStatCard,
    ScStatCardLabel,
    ScStatCardValue,
    ScStatCardChange,
    ScStatCardDescription,
    SiTrendingUpIcon,
    SiTrendingDownIcon,
  ],
  template: \`
    <dl scStatCard class="w-56">
      <dt scStatCardLabel>Cloud costs</dt>
      <dd
        scStatCardValue
        [value]="8420"
        [format]="{
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }"
      ></dd>
      <dd
        scStatCardChange
        [value]="-0.12"
        [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        good="down"
      >
        <svg siTrendingDownIcon></svg>
        <span class="sr-only">, good</span>
      </dd>
      <dd scStatCardDescription>from last month</dd>
    </dl>
    <dl scStatCard class="w-56">
      <dt scStatCardLabel>Error rate</dt>
      <dd
        scStatCardValue
        [value]="0.031"
        [format]="{ style: 'percent', maximumFractionDigits: 1 }"
      ></dd>
      <dd
        scStatCardChange
        [value]="0.008"
        [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        good="down"
      >
        <svg siTrendingUpIcon></svg>
        <span class="sr-only">, bad</span>
      </dd>
      <dd scStatCardDescription>from last week</dd>
    </dl>
    <dl scStatCard class="w-56">
      <dt scStatCardLabel>Open tickets</dt>
      <dd scStatCardValue [value]="42"></dd>
      <dd scStatCardChange [value]="0"></dd>
      <dd scStatCardDescription>from yesterday</dd>
    </dl>
  \`,
  host: { class: 'flex w-full flex-wrap justify-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class GoodStatCardDemo {}`;
}
