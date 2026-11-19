import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NormalizationOtpInputDemo } from './normalization-otp-input-demo';

@Component({
  selector: 'app-normalization-otp-input-demo-container',
  imports: [DemoContainer, NormalizationOtpInputDemo],
  template: `
    <app-demo-container
      title="Custom normalization"
      demoUrl="/demos/otp-input/normalization-otp-input-demo"
      [code]="code"
    >
      <app-normalization-otp-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class NormalizationOtpInputDemoContainer {
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

/** normalizeValue: accepted text uppercased before it is kept. */
@Component({
  selector: 'app-normalization-otp-input-demo',
  imports: [
    SiMinusIcon,
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
      <label scLabel>Invite code</label>
      <div
        scOtpInput
        slotLabel="Character {index} of {length}"
        validationType="alphanumeric"
        [normalizeValue]="uppercase"
        [formField]="otpForm.code"
      >
        <div scOtpInputGroup>
          <input scOtpInputSlot />
          <input scOtpInputSlot />
          <input scOtpInputSlot />
        </div>
        <div scSeparator><svg siMinusIcon></svg></div>
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
export class NormalizationOtpInputDemo {
  private readonly otpForm = form(signal({ code: '' }));
  private readonly uppercase = (value: string) => value.toUpperCase();
}`;
}
