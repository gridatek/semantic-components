import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InvalidOtpInputDemo } from './invalid-otp-input-demo';

@Component({
  selector: 'app-invalid-otp-input-demo-container',
  imports: [DemoContainer, InvalidOtpInputDemo],
  template: `
    <app-demo-container
      title="Invalid"
      demoUrl="/demos/otp-input/invalid-otp-input-demo"
      [code]="code"
    >
      <app-invalid-otp-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InvalidOtpInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, minLength, required } from '@angular/forms/signals';
import {
  ScField,
  ScFieldErrors,
  ScLabel,
  ScOtpInput,
  ScOtpInputGroup,
  ScOtpInputSlot,
  ScSeparator,
} from '@semantic-components/ui';

/** Required and six long, touched and short: marked invalid, its errors shown (Signal Forms). */
@Component({
  selector: 'app-invalid-otp-input-demo',
  imports: [
    ScField,
    FormField,
    ScFieldErrors,
    ScLabel,
    ScOtpInput,
    ScOtpInputGroup,
    ScOtpInputSlot,
    ScSeparator,
  ],
  template: \`
    <div scField class="w-fit">
      <label scLabel>Verification code</label>
      <div
        scOtpInput
        slotLabel="Character {index} of {length}"
        [formField]="otpForm.code"
      >
        <div scOtpInputGroup>
          <input scOtpInputSlot />
          <input scOtpInputSlot />
        </div>
        <div scSeparator></div>
        <div scOtpInputGroup>
          <input scOtpInputSlot />
          <input scOtpInputSlot />
        </div>
        <div scSeparator></div>
        <div scOtpInputGroup>
          <input scOtpInputSlot />
          <input scOtpInputSlot />
        </div>
      </div>
      <p scFieldErrors></p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InvalidOtpInputDemo {
  private readonly otpForm = form(signal({ code: '12' }), (path) => {
    required(path.code, { message: 'Enter the code.' });
    minLength(path.code, 6, { message: 'Enter all 6 digits.' });
  });

  constructor() {
    // Touched already, to show it invalid.
    this.otpForm.code().markAsTouched();
  }
}`;
}
