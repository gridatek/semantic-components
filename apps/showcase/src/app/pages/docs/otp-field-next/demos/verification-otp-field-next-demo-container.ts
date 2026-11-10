import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VerificationOtpFieldNextDemo } from './verification-otp-field-next-demo';

@Component({
  selector: 'app-verification-otp-field-next-demo-container',
  imports: [DemoContainer, VerificationOtpFieldNextDemo],
  template: `
    <app-demo-container
      title="Verification"
      demoUrl="/demos/otp-field-next/verification-otp-field-next-demo"
      [code]="code"
    >
      <app-verification-otp-field-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class VerificationOtpFieldNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, minLength, required } from '@angular/forms/signals';
import {
  ScField,
  ScFieldDescription,
  ScLabel,
  ScOtpFieldNext,
  ScOtpFieldNextGroup,
  ScOtpFieldNextInput,
  ScOtpFieldNextSeparator,
} from '@semantic-components/ui';
import { SiMinusIcon } from '@semantic-icons/lucide-icons';

/** Complete — every input filled — it can be checked: complete() and data-complete. */
@Component({
  selector: 'app-verification-otp-field-next-demo',
  imports: [
    ScField,
    FormField,
    ScFieldDescription,
    ScLabel,
    ScOtpFieldNext,
    ScOtpFieldNextGroup,
    ScOtpFieldNextInput,
    ScOtpFieldNextSeparator,
    SiMinusIcon,
  ],
  template: \`
    <div class="max-w-sm rounded-lg border p-6">
      <div scField>
        <label scLabel class="justify-center">Enter verification code</label>
        <p scFieldDescription class="text-center">
          We sent a code to your email address.
        </p>
        <div
          scOtpFieldNext
          #otp="scOtpFieldNext"
          [formField]="otpForm.code"
          class="mx-auto"
        >
          <div scOtpFieldNextGroup>
            <input scOtpFieldNextInput />
            <input scOtpFieldNextInput aria-label="Character 2 of 6" />
            <input scOtpFieldNextInput aria-label="Character 3 of 6" />
          </div>
          <div scOtpFieldNextSeparator>
            <svg siMinusIcon></svg>
          </div>
          <div scOtpFieldNextGroup>
            <input scOtpFieldNextInput aria-label="Character 4 of 6" />
            <input scOtpFieldNextInput aria-label="Character 5 of 6" />
            <input scOtpFieldNextInput aria-label="Character 6 of 6" />
          </div>
        </div>
        <p class="text-muted-foreground text-center text-sm" role="status">
          @if (otp.complete()) {
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
export class VerificationOtpFieldNextDemo {
  protected readonly otpForm = form(signal({ code: '' }), (path) => {
    required(path.code);
    minLength(path.code, 6);
  });
}`;
}
