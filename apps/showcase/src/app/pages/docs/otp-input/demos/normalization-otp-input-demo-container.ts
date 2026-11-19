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
  ScOtpInputSeparator,
} from '@semantic-components/ui';
import { SiMinusIcon } from '@semantic-icons/lucide-icons';

/** normalizeValue: accepted text uppercased before it is kept. */
@Component({
  selector: 'app-normalization-otp-input-demo',
  imports: [
    ScField,
    FormField,
    ScLabel,
    ScOtpInput,
    ScOtpInputGroup,
    ScOtpInputSlot,
    ScOtpInputSeparator,
    SiMinusIcon,
  ],
  template: \`
    <div scField class="w-fit">
      <label scLabel>Invite code</label>
      <div
        scOtpInput
        validationType="alphanumeric"
        [normalizeValue]="uppercase"
        [formField]="otpForm.code"
      >
        <div scOtpInputGroup>
          <input scOtpInputSlot />
          <input scOtpInputSlot aria-label="Character 2 of 6" />
          <input scOtpInputSlot aria-label="Character 3 of 6" />
        </div>
        <div scOtpInputSeparator>
          <svg siMinusIcon></svg>
        </div>
        <div scOtpInputGroup>
          <input scOtpInputSlot aria-label="Character 4 of 6" />
          <input scOtpInputSlot aria-label="Character 5 of 6" />
          <input scOtpInputSlot aria-label="Character 6 of 6" />
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
