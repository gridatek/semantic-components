import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PlaceholderOtpFieldDemo } from './placeholder-otp-field-demo';

@Component({
  selector: 'app-placeholder-otp-field-demo-container',
  imports: [DemoContainer, PlaceholderOtpFieldDemo],
  template: `
    <app-demo-container
      title="Placeholder hints"
      demoUrl="/demos/otp-field/placeholder-otp-field-demo"
      [code]="code"
    >
      <app-placeholder-otp-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PlaceholderOtpFieldDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScOtpField,
  ScOtpFieldGroup,
  ScOtpFieldInput,
} from '@semantic-components/ui';

/** Real inputs: a native placeholder in each, hidden on the focused one (Base UI's example). */
@Component({
  selector: 'app-placeholder-otp-field-demo',
  imports: [
    ScField,
    FormField,
    ScLabel,
    ScOtpField,
    ScOtpFieldGroup,
    ScOtpFieldInput,
  ],
  template: \`
    <div scField class="w-fit">
      <label scLabel>Verification code</label>
      <div scOtpField [formField]="otpForm.code">
        <div scOtpFieldGroup>
          <input
            scOtpFieldInput
            placeholder="•"
            class="focus:placeholder:text-transparent"
          />
          <input
            scOtpFieldInput
            aria-label="Character 2 of 6"
            placeholder="•"
            class="focus:placeholder:text-transparent"
          />
          <input
            scOtpFieldInput
            aria-label="Character 3 of 6"
            placeholder="•"
            class="focus:placeholder:text-transparent"
          />
          <input
            scOtpFieldInput
            aria-label="Character 4 of 6"
            placeholder="•"
            class="focus:placeholder:text-transparent"
          />
          <input
            scOtpFieldInput
            aria-label="Character 5 of 6"
            placeholder="•"
            class="focus:placeholder:text-transparent"
          />
          <input
            scOtpFieldInput
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
export class PlaceholderOtpFieldDemo {
  protected readonly otpForm = form(signal({ code: '' }));
}`;
}
