import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScStatCardNext,
  ScStatCardNextChange,
  ScStatCardNextDescription,
  ScStatCardNextLabel,
  ScStatCardNextValue,
} from '@semantic-components/ui-lab';
import {
  SiTrendingDownIcon,
  SiTrendingUpIcon,
} from '@semantic-icons/lucide-icons';

/** When down is good news — costs, errors, wait times — say so with good="down": the colour follows the meaning, the sign the number. Unchanged is neither. */
@Component({
  selector: 'app-good-stat-card-next-demo',
  imports: [
    ScStatCardNext,
    ScStatCardNextLabel,
    ScStatCardNextValue,
    ScStatCardNextChange,
    ScStatCardNextDescription,
    SiTrendingUpIcon,
    SiTrendingDownIcon,
  ],
  template: `
    <dl scStatCardNext class="w-56">
      <dt scStatCardNextLabel>Cloud costs</dt>
      <dd
        scStatCardNextValue
        [value]="8420"
        [format]="{
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }"
      ></dd>
      <dd
        scStatCardNextChange
        [value]="-0.12"
        [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        good="down"
      >
        <svg siTrendingDownIcon></svg>
        <span class="sr-only">, good</span>
      </dd>
      <dd scStatCardNextDescription>from last month</dd>
    </dl>
    <dl scStatCardNext class="w-56">
      <dt scStatCardNextLabel>Error rate</dt>
      <dd
        scStatCardNextValue
        [value]="0.031"
        [format]="{ style: 'percent', maximumFractionDigits: 1 }"
      ></dd>
      <dd
        scStatCardNextChange
        [value]="0.008"
        [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        good="down"
      >
        <svg siTrendingUpIcon></svg>
        <span class="sr-only">, bad</span>
      </dd>
      <dd scStatCardNextDescription>from last week</dd>
    </dl>
    <dl scStatCardNext class="w-56">
      <dt scStatCardNextLabel>Open tickets</dt>
      <dd scStatCardNextValue [value]="42"></dd>
      <dd scStatCardNextChange [value]="0"></dd>
      <dd scStatCardNextDescription>from yesterday</dd>
    </dl>
  `,
  host: { class: 'flex w-full flex-wrap justify-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class GoodStatCardNextDemo {}
