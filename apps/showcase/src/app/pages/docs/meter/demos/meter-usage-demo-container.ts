import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MeterUsageDemo } from './meter-usage-demo';

@Component({
  selector: 'app-meter-usage-demo-container',
  imports: [DemoContainer, MeterUsageDemo],
  template: `
    <app-demo-container
      title="Usage"
      [code]="code"
      demoUrl="/demos/meter/meter-usage-demo"
    >
      <app-meter-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MeterUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScMeter,
  ScMeterIndicator,
  ScMeterLabel,
  ScMeterTrack,
  ScMeterValue,
} from '@semantic-components/ui';

/** A measurement in a known range: the bar filled to it, the value as a percent of the range (in the app’s language). */
@Component({
  selector: 'app-meter-usage-demo',
  imports: [
    ScMeter,
    ScMeterIndicator,
    ScMeterLabel,
    ScMeterTrack,
    ScMeterValue,
  ],
  template: \`
    <div class="w-full max-w-sm">
      <div scMeter [value]="68">
        <span scMeterLabel>Storage used</span>
        <span scMeterValue></span>
        <div scMeterTrack><div scMeterIndicator></div></div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MeterUsageDemo {}`;
}
