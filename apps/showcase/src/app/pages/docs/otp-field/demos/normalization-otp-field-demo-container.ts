import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NormalizationOtpFieldDemo } from './normalization-otp-field-demo';

@Component({
  selector: 'app-normalization-otp-field-demo-container',
  imports: [DemoContainer, NormalizationOtpFieldDemo],
  template: `
    <app-demo-container
      title="Custom normalization"
      demoUrl="/demos/otp-field/normalization-otp-field-demo"
      [code]="code"
    >
      <app-normalization-otp-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class NormalizationOtpFieldDemoContainer {
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

/** normalizeValue: accepted text uppercased before it is kept. */
@Component({
  selector: 'app-normalization-otp-field-demo',
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
      <label scLabel>Invite code</label>
      <div
        scOtpField
        validationType="alphanumeric"
        [normalizeValue]="uppercase"
        [formField]="otpForm.code"
      >
        <div scOtpFieldGroup>
          <input scOtpFieldInput />
          <input scOtpFieldInput aria-label="Character 2 of 6" />
          <input scOtpFieldInput aria-label="Character 3 of 6" />
        </div>
        <div scOtpFieldSeparator>
          <svg siMinusIcon></svg>
        </div>
        <div scOtpFieldGroup>
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
export class NormalizationOtpFieldDemo {
  protected readonly otpForm = form(signal({ code: '' }));
  protected readonly uppercase = (value: string) => value.toUpperCase();
}`;
}
