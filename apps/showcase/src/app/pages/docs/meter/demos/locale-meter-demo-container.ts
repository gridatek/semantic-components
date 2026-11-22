import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LocaleMeterDemo } from './locale-meter-demo';

@Component({
  selector: 'app-locale-meter-demo-container',
  imports: [DemoContainer, LocaleMeterDemo],
  template: `
    <app-demo-container
      title="Locale"
      [code]="code"
      demoUrl="/demos/meter/locale-meter-demo"
    >
      <app-locale-meter-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleMeterDemoContainer {
  private readonly code = `import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScMeter,
  ScMeterIndicator,
  ScMeterLabel,
  ScMeterTrack,
  ScMeterValue,
} from '@semantic-components/ui';

/** LOCALE_ID provided as ‘de’: the percent written in German (40 %, with a space before the sign). */
@Component({
  selector: 'app-locale-meter-demo',
  imports: [
    ScMeter,
    ScMeterIndicator,
    ScMeterLabel,
    ScMeterTrack,
    ScMeterValue,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de' }],
  template: \`
    <div lang="de" class="w-full max-w-sm">
      <div scMeter [value]="40">
        <span scMeterLabel>Auslastung</span>
        <span scMeterValue></span>
        <div scMeterTrack><div scMeterIndicator></div></div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleMeterDemo {}`;
}
