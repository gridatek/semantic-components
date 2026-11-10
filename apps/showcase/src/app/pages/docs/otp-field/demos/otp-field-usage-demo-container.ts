import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { OtpFieldUsageDemo } from './otp-field-usage-demo';

@Component({
  selector: 'app-otp-field-usage-demo-container',
  imports: [UsageCode, OtpFieldUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-otp-field-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class OtpFieldUsageDemoContainer {
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

/** Six characters, one input each: typed in order, pasted or autofilled from an SMS. */
@Component({
  selector: 'app-otp-field-usage-demo',
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
export class OtpFieldUsageDemo {
  protected readonly otpForm = form(signal({ code: '123456' }));
}`;
}
