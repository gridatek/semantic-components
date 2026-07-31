import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledOtpDemo } from './disabled-otp-demo';

@Component({
  selector: 'app-disabled-otp-demo-container',
  imports: [DemoContainer, DisabledOtpDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/otp/disabled-otp-demo"
      [code]="code"
    >
      <app-disabled-otp-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledOtpDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScOtp, ScOtpSlot, ScOtpSlotGroup } from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-otp-demo',
  imports: [ScOtp, ScOtpSlotGroup, ScOtpSlot],
  template: \`
    <div scOtp [disabled]="true" value="123456">
      <div scOtpSlotGroup>
        <div scOtpSlot aria-label="Digit 1 of 6"></div>
        <div scOtpSlot aria-label="Digit 2 of 6"></div>
        <div scOtpSlot aria-label="Digit 3 of 6"></div>
        <div scOtpSlot aria-label="Digit 4 of 6"></div>
        <div scOtpSlot aria-label="Digit 5 of 6"></div>
        <div scOtpSlot aria-label="Digit 6 of 6"></div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledOtpDemo {}`;
}
