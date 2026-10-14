import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VerificationOtpFieldDemo } from './verification-otp-field-demo';

@Component({
  selector: 'app-verification-otp-field-demo-container',
  imports: [DemoContainer, VerificationOtpFieldDemo],
  template: `
    <app-demo-container
      title="Verification Code Example"
      demoUrl="/demos/otp-field/verification-otp-field-demo"
      [code]="code"
    >
      <app-verification-otp-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class VerificationOtpFieldDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, minLength, required } from '@angular/forms/signals';
import {
  ScFieldDescription,
  ScLabel,
  ScOtpField,
  ScOtpFieldGroup,
  ScOtpFieldInput,
  ScOtpFieldSeparator,
} from '@semantic-components/ui';
import { SiMinusIcon } from '@semantic-icons/lucide-icons';

/**
 * The label names the first input (it takes the field's id), the others
 * name themselves; once the code is complete — valid for its schema — it
 * can be checked.
 */
@Component({
  selector: 'app-verification-otp-field-demo',
  imports: [
    FormField,
    ScFieldDescription,
    ScLabel,
    ScOtpField,
    ScOtpFieldGroup,
    ScOtpFieldInput,
    ScOtpFieldSeparator,
    SiMinusIcon,
  ],
  template: \`
    <div class="max-w-sm rounded-lg border p-6">
      <div scOtpField [formField]="otpForm.code">
        <label scLabel class="justify-center">Enter verification code</label>
        <p scFieldDescription class="text-center">
          We sent a code to your email address.
        </p>
        <div scOtpFieldGroup class="justify-center">
          <input scOtpFieldInput />
          <input scOtpFieldInput aria-label="Digit 2 of 6" />
          <input scOtpFieldInput aria-label="Digit 3 of 6" />
          <div scOtpFieldSeparator>
            <svg siMinusIcon></svg>
          </div>
          <input scOtpFieldInput aria-label="Digit 4 of 6" />
          <input scOtpFieldInput aria-label="Digit 5 of 6" />
          <input scOtpFieldInput aria-label="Digit 6 of 6" />
        </div>
        <p class="text-muted-foreground text-center text-sm" role="status">
          @if (otpForm.code().valid()) {
            Verifying {{ otpForm.code().value() }}…
          } @else {
            Enter all 6 digits.
          }
        </p>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VerificationOtpFieldDemo {
  readonly otpForm = form(signal({ code: '' }), (path) => {
    required(path.code);
    minLength(path.code, 6);
  });
}`;
}
