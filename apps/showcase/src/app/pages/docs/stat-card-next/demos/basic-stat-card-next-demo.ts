import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScStatCardNext,
  ScStatCardNextChange,
  ScStatCardNextDescription,
  ScStatCardNextLabel,
  ScStatCardNextValue,
} from '@semantic-components/ui-lab';
import { SiTrendingUpIcon } from '@semantic-icons/lucide-icons';

/** One figure on a description list: its label, its value in the app’s language, how it changed — signed, green for good news — and from when. */
@Component({
  selector: 'app-basic-stat-card-next-demo',
  imports: [
    ScStatCardNext,
    ScStatCardNextLabel,
    ScStatCardNextValue,
    ScStatCardNextChange,
    ScStatCardNextDescription,
    SiTrendingUpIcon,
  ],
  template: `
    <dl scStatCardNext class="w-64">
      <dt scStatCardNextLabel>Revenue</dt>
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicStatCardNextDemo {}
