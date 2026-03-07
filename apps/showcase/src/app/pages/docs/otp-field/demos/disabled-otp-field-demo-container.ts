import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledOtpFieldDemo } from './disabled-otp-field-demo';

@Component({
  selector: 'app-disabled-otp-field-demo-container',
  imports: [DemoContainer, DisabledOtpFieldDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/otp-field/disabled-otp-field-demo"
      [code]="code"
    >
      <app-disabled-otp-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledOtpFieldDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScOtpField,
  ScOtpFieldSlot,
  ScOtpFieldSlotGroup,
} from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-otp-field-demo',
  imports: [ScOtpField, ScOtpFieldSlotGroup, ScOtpFieldSlot],
  template: \`
    <div scOtpField [disabled]="true" value="123456">
      <div scOtpFieldSlotGroup>
        <div scOtpFieldSlot></div>
        <div scOtpFieldSlot></div>
        <div scOtpFieldSlot></div>
        <div scOtpFieldSlot></div>
        <div scOtpFieldSlot></div>
        <div scOtpFieldSlot></div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledOtpFieldDemo {}`;
}
