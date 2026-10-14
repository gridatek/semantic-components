import { Component, ViewEncapsulation } from '@angular/core';
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
})
export class DisabledOtpFieldDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, disabled, form, minLength } from '@angular/forms/signals';
import {
  ScOtpField,
  ScOtpFieldGroup,
  ScOtpFieldInput,
} from '@semantic-components/ui';

/** Disabled by the schema (\`disabled()\`), like any field. */
@Component({
  selector: 'app-disabled-otp-field-demo',
  imports: [FormField, ScOtpField, ScOtpFieldGroup, ScOtpFieldInput],
  template: \`
    <div scOtpField [formField]="otpForm.code">
      <div scOtpFieldGroup>
        <input scOtpFieldInput aria-label="Digit 1 of 6" />
        <input scOtpFieldInput aria-label="Digit 2 of 6" />
        <input scOtpFieldInput aria-label="Digit 3 of 6" />
        <input scOtpFieldInput aria-label="Digit 4 of 6" />
        <input scOtpFieldInput aria-label="Digit 5 of 6" />
        <input scOtpFieldInput aria-label="Digit 6 of 6" />
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledOtpFieldDemo {
  readonly otpForm = form(signal({ code: '123456' }), (path) => {
    minLength(path.code, 6);
    disabled(path.code);
  });
}`;
}
