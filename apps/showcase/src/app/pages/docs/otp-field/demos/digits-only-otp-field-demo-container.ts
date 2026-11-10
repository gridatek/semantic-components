import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DigitsOnlyOtpFieldDemo } from './digits-only-otp-field-demo';

@Component({
  selector: 'app-digits-only-otp-field-demo-container',
  imports: [DemoContainer, DigitsOnlyOtpFieldDemo],
  template: `
    <app-demo-container
      title="Digits only"
      demoUrl="/demos/otp-field/digits-only-otp-field-demo"
      [code]="code"
    >
      <app-digits-only-otp-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DigitsOnlyOtpFieldDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScOtpField,
  ScOtpFieldGroup,
  ScOtpFieldInput,
} from '@semantic-components/ui';

/** validationType="numeric" (the default): digits only, a numeric keypad. */
@Component({
  selector: 'app-digits-only-otp-field-demo',
  imports: [
    ScField,
    FormField,
    ScLabel,
    ScOtpField,
    ScOtpFieldGroup,
    ScOtpFieldInput,
  ],
  template: \`
    <div scField class="w-fit">
      <label scLabel>Digits Only</label>
      <div scOtpField [formField]="otpForm.code">
        <div scOtpFieldGroup>
          <input scOtpFieldInput />
          <input scOtpFieldInput aria-label="Character 2 of 6" />
          <input scOtpFieldInput aria-label="Character 3 of 6" />
          <input scOtpFieldInput aria-label="Character 4 of 6" />
          <input scOtpFieldInput aria-label="Character 5 of 6" />
          <input scOtpFieldInput aria-label="Character 6 of 6" />
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DigitsOnlyOtpFieldDemo {
  protected readonly otpForm = form(signal({ code: '' }));
}`;
}
