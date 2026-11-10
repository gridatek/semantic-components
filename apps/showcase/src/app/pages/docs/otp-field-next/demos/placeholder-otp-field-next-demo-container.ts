import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PlaceholderOtpFieldNextDemo } from './placeholder-otp-field-next-demo';

@Component({
  selector: 'app-placeholder-otp-field-next-demo-container',
  imports: [DemoContainer, PlaceholderOtpFieldNextDemo],
  template: `
    <app-demo-container
      title="Placeholder hints"
      demoUrl="/demos/otp-field-next/placeholder-otp-field-next-demo"
      [code]="code"
    >
      <app-placeholder-otp-field-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PlaceholderOtpFieldNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScOtpFieldNext,
  ScOtpFieldNextGroup,
  ScOtpFieldNextInput,
} from '@semantic-components/ui';

/** Real inputs: a native placeholder in each, hidden on the focused one (Base UI's example). */
@Component({
  selector: 'app-placeholder-otp-field-next-demo',
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
      <label scLabel>Verification code</label>
      <div scOtpFieldNext [formField]="otpForm.code">
        <div scOtpFieldNextGroup>
          <input
            scOtpFieldNextInput
            placeholder="•"
            class="focus:placeholder:text-transparent"
          />
          <input
            scOtpFieldNextInput
            aria-label="Character 2 of 6"
            placeholder="•"
            class="focus:placeholder:text-transparent"
          />
          <input
            scOtpFieldNextInput
            aria-label="Character 3 of 6"
            placeholder="•"
            class="focus:placeholder:text-transparent"
          />
          <input
            scOtpFieldNextInput
            aria-label="Character 4 of 6"
            placeholder="•"
            class="focus:placeholder:text-transparent"
          />
          <input
            scOtpFieldNextInput
            aria-label="Character 5 of 6"
            placeholder="•"
            class="focus:placeholder:text-transparent"
          />
          <input
            scOtpFieldNextInput
            aria-label="Character 6 of 6"
            placeholder="•"
            class="focus:placeholder:text-transparent"
          />
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PlaceholderOtpFieldNextDemo {
  protected readonly otpForm = form(signal({ code: '' }));
}`;
}
