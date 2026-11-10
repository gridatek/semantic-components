import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DigitsOnlyOtpFieldNextDemo } from './digits-only-otp-field-next-demo';

@Component({
  selector: 'app-digits-only-otp-field-next-demo-container',
  imports: [DemoContainer, DigitsOnlyOtpFieldNextDemo],
  template: `
    <app-demo-container
      title="Digits only"
      demoUrl="/demos/otp-field-next/digits-only-otp-field-next-demo"
      [code]="code"
    >
      <app-digits-only-otp-field-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DigitsOnlyOtpFieldNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScOtpFieldNext,
  ScOtpFieldNextGroup,
  ScOtpFieldNextInput,
} from '@semantic-components/ui';

/** validationType="numeric" (the default): digits only, a numeric keypad. */
@Component({
  selector: 'app-digits-only-otp-field-next-demo',
  imports: [
    ScField,
    FormField,
    ScLabel,
    ScOtpFieldNext,
    ScOtpFieldNextGroup,
    ScOtpFieldNextInput,
  ],
  template: \`
    <div scField class="w-fit">
      <label scLabel>Digits Only</label>
      <div scOtpFieldNext [formField]="otpForm.code">
        <div scOtpFieldNextGroup>
          <input scOtpFieldNextInput />
          <input scOtpFieldNextInput aria-label="Character 2 of 6" />
          <input scOtpFieldNextInput aria-label="Character 3 of 6" />
          <input scOtpFieldNextInput aria-label="Character 4 of 6" />
          <input scOtpFieldNextInput aria-label="Character 5 of 6" />
          <input scOtpFieldNextInput aria-label="Character 6 of 6" />
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DigitsOnlyOtpFieldNextDemo {
  protected readonly otpForm = form(signal({ code: '' }));
}`;
}
