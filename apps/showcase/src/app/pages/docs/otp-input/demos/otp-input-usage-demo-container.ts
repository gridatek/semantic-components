import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { OtpInputUsageDemo } from './otp-input-usage-demo';

@Component({
  selector: 'app-otp-input-usage-demo-container',
  imports: [UsageCode, OtpInputUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-otp-input-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class OtpInputUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScOtpInput,
  ScOtpInputGroup,
  ScOtpInputSlot,
  ScSeparator,
} from '@semantic-components/ui';
import { SiMinusIcon } from '@semantic-icons/lucide-icons';

/** Six characters, one input each: typed in order, pasted or autofilled from an SMS. */
@Component({
  selector: 'app-otp-input-usage-demo',
  imports: [
    ScField,
    FormField,
    ScLabel,
    ScOtpInput,
    ScOtpInputGroup,
    ScOtpInputSlot,
    ScSeparator,
  ],
  template: \`
    <div scField class="w-fit">
      <label scLabel>Verification code</label>
      <div scOtpInput slotLabel="Character {index} of {length}" [formField]="otpForm.code">
        <div scOtpInputGroup>
          <input scOtpInputSlot />
          <input scOtpInputSlot />
          <input scOtpInputSlot />
        </div>
        <div scSeparator></div>
        <div scOtpInputGroup>
          <input scOtpInputSlot />
          <input scOtpInputSlot />
          <input scOtpInputSlot />
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class OtpInputUsageDemo {
  private readonly otpForm = form(signal({ code: '123456' }));
}`;
}
