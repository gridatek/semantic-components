import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AlphanumericOtpInputDemo } from './alphanumeric-otp-input-demo';

@Component({
  selector: 'app-alphanumeric-otp-input-demo-container',
  imports: [DemoContainer, AlphanumericOtpInputDemo],
  template: `
    <app-demo-container
      title="Alphanumeric"
      demoUrl="/demos/otp-input/alphanumeric-otp-input-demo"
      [code]="code"
    >
      <app-alphanumeric-otp-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AlphanumericOtpInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScOtpInput,
  ScOtpInputGroup,
  ScOtpInputSlot,
  ScSeparator,
} from '@semantic-components/ui';
import { SiMinusIcon } from '@semantic-icons/lucide-icons';

/** validationType="alphanumeric": letters and digits — recovery and invite codes. */
@Component({
  selector: 'app-alphanumeric-otp-input-demo',
  imports: [
    SiMinusIcon,
    ScField,
    FormField,
    ScLabel,
    ScOtpInput,
    ScOtpInputGroup,
    ScOtpInputSlot,
    ScSeparator,
  ],
  template: \`
    <div scField class="w-fit">
      <label scLabel>Recovery code</label>
      <div
        scOtpInput
        slotLabel="Character {index} of {length}"
        validationType="alphanumeric"
        [formField]="otpForm.code"
      >
        <div scOtpInputGroup>
          <input scOtpInputSlot />
          <input scOtpInputSlot />
          <input scOtpInputSlot />
        </div>
        <div scSeparator><svg siMinusIcon></svg></div>
        <div scOtpInputGroup>
          <input scOtpInputSlot />
          <input scOtpInputSlot />
          <input scOtpInputSlot />
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AlphanumericOtpInputDemo {
  private readonly otpForm = form(signal({ code: '' }));
}`;
}
