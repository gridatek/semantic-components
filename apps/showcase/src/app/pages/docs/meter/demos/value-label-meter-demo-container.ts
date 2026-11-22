import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ValueLabelMeterDemo } from './value-label-meter-demo';

@Component({
  selector: 'app-value-label-meter-demo-container',
  imports: [DemoContainer, ValueLabelMeterDemo],
  template: `
    <app-demo-container
      title="Value label"
      [code]="code"
      demoUrl="/demos/meter/value-label-meter-demo"
    >
      <app-value-label-meter-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ValueLabelMeterDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
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
  template: \`
    <div class="w-full max-w-sm">
      <div scMeter [value]="750" [max]="1000" [valueLabel]="requests">
        <span scMeterLabel>API requests</span>
        <span scMeterValue>750 / 1,000</span>
        <div scMeterTrack><div scMeterIndicator></div></div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ValueLabelMeterDemo {
  private readonly requests = (
    value: number,
    { formatted, max }: ScMeterValueLabelDetails,
  ) => \`\${value} of \${max} requests, \${formatted}\`;
}`;
}
