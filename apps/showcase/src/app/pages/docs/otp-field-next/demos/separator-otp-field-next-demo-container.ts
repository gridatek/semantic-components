import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SeparatorOtpFieldNextDemo } from './separator-otp-field-next-demo';

@Component({
  selector: 'app-separator-otp-field-next-demo-container',
  imports: [DemoContainer, SeparatorOtpFieldNextDemo],
  template: `
    <app-demo-container
      title="Separator"
      demoUrl="/demos/otp-field-next/separator-otp-field-next-demo"
      [code]="code"
    >
      <app-separator-otp-field-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SeparatorOtpFieldNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScOtpFieldNext,
  ScOtpFieldNextGroup,
  ScOtpFieldNextInput,
  ScOtpFieldNextSeparator,
} from '@semantic-components/ui';
import { SiMinusIcon } from '@semantic-icons/lucide-icons';

/** Chunks of two, separators between them. */
@Component({
  selector: 'app-separator-otp-field-next-demo',
  imports: [
    ScField,
    FormField,
    ScLabel,
    ScOtpFieldNext,
    ScOtpFieldNextGroup,
    ScOtpFieldNextInput,
    ScOtpFieldNextSeparator,
    SiMinusIcon,
  ],
  template: \`
    <div scField class="w-fit">
      <label scLabel>Verification code</label>
      <div scOtpFieldNext [formField]="otpForm.code">
        <div scOtpFieldNextGroup>
          <input scOtpFieldNextInput />
          <input scOtpFieldNextInput aria-label="Character 2 of 6" />
        </div>
        <div scOtpFieldNextSeparator>
          <svg siMinusIcon></svg>
        </div>
        <div scOtpFieldNextGroup>
          <input scOtpFieldNextInput aria-label="Character 3 of 6" />
          <input scOtpFieldNextInput aria-label="Character 4 of 6" />
        </div>
        <div scOtpFieldNextSeparator>
          <svg siMinusIcon></svg>
        </div>
        <div scOtpFieldNextGroup>
          <input scOtpFieldNextInput aria-label="Character 5 of 6" />
          <input scOtpFieldNextInput aria-label="Character 6 of 6" />
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SeparatorOtpFieldNextDemo {
  protected readonly otpForm = form(signal({ code: '' }));
}`;
}
