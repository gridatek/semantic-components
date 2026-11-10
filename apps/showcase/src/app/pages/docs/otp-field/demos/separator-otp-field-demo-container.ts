import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SeparatorOtpFieldDemo } from './separator-otp-field-demo';

@Component({
  selector: 'app-separator-otp-field-demo-container',
  imports: [DemoContainer, SeparatorOtpFieldDemo],
  template: `
    <app-demo-container
      title="Separator"
      demoUrl="/demos/otp-field/separator-otp-field-demo"
      [code]="code"
    >
      <app-separator-otp-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SeparatorOtpFieldDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScOtpField,
  ScOtpFieldGroup,
  ScOtpFieldInput,
  ScOtpFieldSeparator,
} from '@semantic-components/ui';
import { SiMinusIcon } from '@semantic-icons/lucide-icons';

/** Chunks of two, separators between them. */
@Component({
  selector: 'app-separator-otp-field-demo',
  imports: [
    ScField,
    FormField,
    ScLabel,
    ScOtpField,
    ScOtpFieldGroup,
    ScOtpFieldInput,
    ScOtpFieldSeparator,
    SiMinusIcon,
  ],
  template: \`
    <div scField class="w-fit">
      <label scLabel>Verification code</label>
      <div scOtpField [formField]="otpForm.code">
        <div scOtpFieldGroup>
          <input scOtpFieldInput />
          <input scOtpFieldInput aria-label="Character 2 of 6" />
        </div>
        <div scOtpFieldSeparator>
          <svg siMinusIcon></svg>
        </div>
        <div scOtpFieldGroup>
          <input scOtpFieldInput aria-label="Character 3 of 6" />
          <input scOtpFieldInput aria-label="Character 4 of 6" />
        </div>
        <div scOtpFieldSeparator>
          <svg siMinusIcon></svg>
        </div>
        <div scOtpFieldGroup>
          <input scOtpFieldInput aria-label="Character 5 of 6" />
          <input scOtpFieldInput aria-label="Character 6 of 6" />
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SeparatorOtpFieldDemo {
  protected readonly otpForm = form(signal({ code: '' }));
}`;
}
