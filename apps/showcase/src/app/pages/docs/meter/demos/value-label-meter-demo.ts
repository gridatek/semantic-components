import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScMeter,
  ScMeterIndicator,
  ScMeterLabel,
  ScMeterTrack,
  ScMeterValue,
  type ScMeterValueLabelDetails,
} from '@semantic-components/ui';

/** valueLabel: what screen readers hear when the value shown isn’t enough — here “750 of 1000 requests, 75%” for “750 / 1,000”. */
@Component({
  selector: 'app-value-label-meter-demo',
  imports: [
    ScMeter,
    ScMeterIndicator,
    ScMeterLabel,
    ScMeterTrack,
    ScMeterValue,
  ],
  template: `
    <div class="w-full max-w-sm">
      <div scMeter [value]="750" [max]="1000" [valueLabel]="requests">
        <span scMeterLabel>API requests</span>
        <span scMeterValue>750 / 1,000</span>
        <div scMeterTrack><div scMeterIndicator></div></div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ValueLabelMeterDemo {
  private readonly requests = (
    value: number,
    { formatted, max }: ScMeterValueLabelDetails,
  ) => `${value} of ${max} requests, ${formatted}`;
}
