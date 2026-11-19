import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DigitsOnlyOtpInputDemo } from './digits-only-otp-input-demo';

@Component({
  selector: 'app-digits-only-otp-input-demo-container',
  imports: [DemoContainer, DigitsOnlyOtpInputDemo],
  template: `
    <app-demo-container
      title="Digits only"
      demoUrl="/demos/otp-input/digits-only-otp-input-demo"
      [code]="code"
    >
      <app-digits-only-otp-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DigitsOnlyOtpInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScOtpInput,
  ScOtpInputGroup,
  ScOtpInputSlot,
} from '@semantic-components/ui';

/** validationType="numeric" (the default): digits only, a numeric keypad. */
@Component({
  selector: 'app-digits-only-otp-input-demo',
  imports: [
    ScField,
    FormField,
    ScLabel,
    ScOtpInput,
    ScOtpInputGroup,
    ScOtpInputSlot,
  ],
  template: \`
    <div scField class="w-fit">
      <label scLabel>Digits Only</label>
      <div scOtpInput [formField]="otpForm.code">
        <div scOtpInputGroup>
          <input scOtpInputSlot />
          <input scOtpInputSlot aria-label="Character 2 of 6" />
          <input scOtpInputSlot aria-label="Character 3 of 6" />
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
export class DigitsOnlyOtpInputDemo {
  private readonly otpForm = form(signal({ code: '' }));
}`;
}
