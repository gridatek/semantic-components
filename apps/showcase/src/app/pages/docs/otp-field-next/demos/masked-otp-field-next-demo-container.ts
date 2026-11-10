import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MaskedOtpFieldNextDemo } from './masked-otp-field-next-demo';

@Component({
  selector: 'app-masked-otp-field-next-demo-container',
  imports: [DemoContainer, MaskedOtpFieldNextDemo],
  template: `
    <app-demo-container
      title="Masked entry"
      demoUrl="/demos/otp-field-next/masked-otp-field-next-demo"
      [code]="code"
    >
      <app-masked-otp-field-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MaskedOtpFieldNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScOtpFieldNext,
  ScOtpFieldNextGroup,
  ScOtpFieldNextInput,
} from '@semantic-components/ui';

/** mask: the characters hidden as they are typed. */
@Component({
  selector: 'app-masked-otp-field-next-demo',
  imports: [
    ScField,
    FormField,
    ScLabel,
    ScOtpFieldNext,
    ScOtpFieldNextGroup,
    ScOtpFieldNextInput,
  ],
  template: \`
    <div scField class="w-fit">
      <label scLabel>PIN</label>
      <div scOtpFieldNext mask [formField]="otpForm.pin">
        <div scOtpFieldNextGroup>
          <input scOtpFieldNextInput />
          <input scOtpFieldNextInput aria-label="Character 2 of 4" />
          <input scOtpFieldNextInput aria-label="Character 3 of 4" />
          <input scOtpFieldNextInput aria-label="Character 4 of 4" />
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MaskedOtpFieldNextDemo {
  protected readonly otpForm = form(signal({ pin: '' }));
}`;
}
