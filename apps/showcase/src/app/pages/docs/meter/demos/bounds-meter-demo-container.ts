import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BoundsMeterDemo } from './bounds-meter-demo';

@Component({
  selector: 'app-bounds-meter-demo-container',
  imports: [DemoContainer, BoundsMeterDemo],
  template: `
    <app-demo-container
      title="Bounds"
      [code]="code"
      demoUrl="/demos/meter/bounds-meter-demo"
    >
      <app-bounds-meter-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BoundsMeterDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScMeter,
  ScMeterIndicator,
  ScMeterLabel,
  ScMeterTrack,
  ScMeterValue,
} from '@semantic-components/ui';

/** min and max set where the value sits — a credit score, 300 to 850; format: the value itself, not a percent. */
@Component({
  selector: 'app-bounds-meter-demo',
  imports: [
    ScMeter,
    ScMeterIndicator,
    ScMeterLabel,
    ScMeterTrack,
    ScMeterValue,
  ],
  template: \`
    <div class="w-full max-w-sm">
      <div scMeter [value]="720" [min]="300" [max]="850" [format]="decimal">
        <span scMeterLabel>Credit score</span>
        <span scMeterValue></span>
        <div scMeterTrack><div scMeterIndicator></div></div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BoundsMeterDemo {
  private readonly decimal: Intl.NumberFormatOptions = { style: 'decimal' };
}`;
}
