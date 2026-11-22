import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScMeter,
  type ScMeterFormat,
  ScMeterIndicator,
  ScMeterLabel,
  ScMeterTrack,
  ScMeterValue,
} from '@semantic-components/ui';

/** format: number format options — a unit, a currency — or a function of the value. */
@Component({
  selector: 'app-format-meter-demo',
  imports: [
    ScMeter,
    ScMeterIndicator,
    ScMeterLabel,
    ScMeterTrack,
    ScMeterValue,
  ],
  template: `
    <div class="grid w-full max-w-sm gap-6">
      @for (item of meters; track item.label) {
        <div
          scMeter
          [value]="item.value"
          [max]="item.max"
          [format]="item.format"
        >
          <span scMeterLabel>{{ item.label }}</span>
          <span scMeterValue></span>
          <div scMeterTrack><div scMeterIndicator></div></div>
        </div>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormatMeterDemo {
  private readonly meters: {
    label: string;
    value: number;
    max: number;
    format: ScMeterFormat;
  }[] = [
    {
      label: 'Storage',
      value: 120,
      max: 250,
      format: { style: 'unit', unit: 'gigabyte' },
    },
    {
      label: 'Budget',
      value: 1840,
      max: 2500,
      format: { style: 'currency', currency: 'USD', maximumFractionDigits: 0 },
    },
    {
      label: 'Seats',
      value: 18,
      max: 25,
      format: (seats) => `${seats} of 25 seats`,
    },
  ];
}
