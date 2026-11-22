import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlMeterDemo } from './rtl-meter-demo';

@Component({
  selector: 'app-rtl-meter-demo-container',
  imports: [DemoContainer, RtlMeterDemo],
  template: `
    <app-demo-container
      title="RTL"
      [code]="code"
      demoUrl="/demos/meter/rtl-meter-demo"
    >
      <app-rtl-meter-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlMeterDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScMeter,
  ScMeterIndicator,
  ScMeterLabel,
  ScMeterTrack,
  ScMeterValue,
} from '@semantic-components/ui';

/** In a right-to-left page: the bar fills from the right; the percent in the locale’s digits. */
@Component({
  selector: 'app-rtl-meter-demo',
  imports: [
    Dir,
    ScMeter,
    ScMeterIndicator,
    ScMeterLabel,
    ScMeterTrack,
    ScMeterValue,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  template: \`
    <div dir="rtl" lang="ar" class="w-full max-w-sm">
      <div scMeter [value]="68">
        <span scMeterLabel>المساحة المستخدمة</span>
        <span scMeterValue></span>
        <div scMeterTrack><div scMeterIndicator></div></div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlMeterDemo {}`;
}
