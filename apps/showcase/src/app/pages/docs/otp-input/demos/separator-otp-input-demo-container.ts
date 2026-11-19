import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SeparatorOtpInputDemo } from './separator-otp-input-demo';

@Component({
  selector: 'app-separator-otp-input-demo-container',
  imports: [DemoContainer, SeparatorOtpInputDemo],
  template: `
    <app-demo-container
      title="Separator"
      demoUrl="/demos/otp-input/separator-otp-input-demo"
      [code]="code"
    >
      <app-separator-otp-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SeparatorOtpInputDemoContainer {
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

/** Chunks of two, separators between them. */
@Component({
  selector: 'app-separator-otp-input-demo',
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
      <label scLabel>Verification code</label>
      <div scOtpInput [formField]="otpForm.code">
        <div scOtpInputGroup>
          <input scOtpInputSlot />
          <input scOtpInputSlot aria-label="Character 2 of 6" />
        </div>
        <div scOtpInputSeparator>
          <svg siMinusIcon></svg>
        </div>
        <div scOtpInputGroup>
          <input scOtpInputSlot aria-label="Character 3 of 6" />
          <input scOtpInputSlot aria-label="Character 4 of 6" />
        </div>
        <div scOtpInputSeparator>
          <svg siMinusIcon></svg>
        </div>
        <div scOtpInputGroup>
          <input scOtpInputSlot aria-label="Character 5 of 6" />
          <input scOtpInputSlot aria-label="Character 6 of 6" />
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SeparatorOtpInputDemo {
  private readonly otpForm = form(signal({ code: '' }));
}`;
}
