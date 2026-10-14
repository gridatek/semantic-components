import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PinOtpFieldDemo } from './pin-otp-field-demo';

@Component({
  selector: 'app-pin-otp-field-demo-container',
  imports: [DemoContainer, PinOtpFieldDemo],
  template: `
    <app-demo-container
      title="PIN (4 digits)"
      demoUrl="/demos/otp-field/pin-otp-field-demo"
      [code]="code"
    >
      <app-pin-otp-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PinOtpFieldDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, minLength } from '@angular/forms/signals';
import {
  ScOtpField,
  ScOtpFieldGroup,
  ScOtpFieldInput,
} from '@semantic-components/ui';

@Component({
  selector: 'app-pin-otp-field-demo',
  imports: [FormField, ScOtpField, ScOtpFieldGroup, ScOtpFieldInput],
  template: \`
    <div class="space-y-4">
      <div scOtpField [formField]="otpForm.code">
        <div scOtpFieldGroup>
          <input scOtpFieldInput aria-label="Digit 1 of 4" />
          <input scOtpFieldInput aria-label="Digit 2 of 4" />
          <input scOtpFieldInput aria-label="Digit 3 of 4" />
          <input scOtpFieldInput aria-label="Digit 4 of 4" />
        </div>
      </div>
      <p class="text-muted-foreground text-sm">
        Value: {{ otpForm.code().value() || 'empty' }}
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PinOtpFieldDemo {
  readonly otpForm = form(signal({ code: '' }), (path) => {
    minLength(path.code, 4);
  });
}`;
}
