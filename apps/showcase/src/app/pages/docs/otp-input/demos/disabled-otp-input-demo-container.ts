import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledOtpInputDemo } from './disabled-otp-input-demo';

@Component({
  selector: 'app-disabled-otp-input-demo-container',
  imports: [DemoContainer, DisabledOtpInputDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/otp-input/disabled-otp-input-demo"
      [code]="code"
    >
      <app-disabled-otp-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledOtpInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, disabled, form } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScOtpInput,
  ScOtpInputGroup,
  ScOtpInputSlot,
  ScOtpInputSeparator,
} from '@semantic-components/ui';
import { SiMinusIcon } from '@semantic-icons/lucide-icons';

/** Disabled in the schema: dimmed, out of reach. */
@Component({
  selector: 'app-disabled-otp-input-demo',
  imports: [
    ScField,
    FormField,
    ScLabel,
    ScOtpInput,
    ScOtpInputGroup,
    ScOtpInputSlot,
    ScOtpInputSeparator,
    SiMinusIcon,
  ],
  template: \`
    <div scField class="w-fit">
      <label scLabel>Verification code</label>
      <div scOtpInput [formField]="otpForm.code">
        <div scOtpInputGroup>
          <input scOtpInputSlot />
          <input scOtpInputSlot aria-label="Character 2 of 6" />
          <input scOtpInputSlot aria-label="Character 3 of 6" />
        </div>
        <div scOtpInputSeparator>
          <svg siMinusIcon></svg>
        </div>
        <div scOtpInputGroup>
          <input scOtpInputSlot aria-label="Character 4 of 6" />
          <input scOtpInputSlot aria-label="Character 5 of 6" />
          <input scOtpInputSlot aria-label="Character 6 of 6" />
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledOtpInputDemo {
  private readonly otpForm = form(signal({ code: '123456' }), (path) => {
    disabled(path.code);
  });
}`;
}
