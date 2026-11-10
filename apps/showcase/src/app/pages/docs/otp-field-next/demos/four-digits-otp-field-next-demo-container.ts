import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FourDigitsOtpFieldNextDemo } from './four-digits-otp-field-next-demo';

@Component({
  selector: 'app-four-digits-otp-field-next-demo-container',
  imports: [DemoContainer, FourDigitsOtpFieldNextDemo],
  template: `
    <app-demo-container
      title="Four digits"
      demoUrl="/demos/otp-field-next/four-digits-otp-field-next-demo"
      [code]="code"
    >
      <app-four-digits-otp-field-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FourDigitsOtpFieldNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScOtpFieldNext,
  ScOtpFieldNextGroup,
  ScOtpFieldNextInput,
} from '@semantic-components/ui';

/** As many inputs as characters: four. */
@Component({
  selector: 'app-four-digits-otp-field-next-demo',
  imports: [
    ScField,
    FormField,
    ScLabel,
    ScOtpFieldNext,
    ScOtpFieldNextGroup,
    ScOtpFieldNextInput,
  ],
  template: \`
    <div scField>
      <label scLabel>PIN</label>
      <div scOtpFieldNext [formField]="otpForm.pin">
        <div scOtpFieldNextGroup>
          <input scOtpFieldNextInput />
          <input scOtpFieldNextInput aria-label="Character 2 of 4" />
          <input scOtpFieldNextInput aria-label="Character 3 of 4" />
          <input scOtpFieldNextInput aria-label="Character 4 of 4" />
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FourDigitsOtpFieldNextDemo {
  protected readonly otpForm = form(signal({ pin: '' }));
}`;
}
