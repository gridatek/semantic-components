import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScStatCard,
  ScStatCardChange,
  ScStatCardDescription,
  ScStatCardLabel,
  ScStatCardValue,
} from '@semantic-components/ui-lab';
import { SiTrendingUpIcon } from '@semantic-icons/lucide-icons';

/** One figure on a description list: its label, its value in the app’s language, how it changed — signed, green for good news — and from when. */
@Component({
  selector: 'app-basic-stat-card-demo',
  imports: [
    ScStatCard,
    ScStatCardLabel,
    ScStatCardValue,
    ScStatCardChange,
    ScStatCardDescription,
    SiTrendingUpIcon,
  ],
  template: `
    <dl scStatCard class="w-64">
      <dt scStatCardLabel>Revenue</dt>
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicStatCardDemo {}
