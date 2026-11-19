import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PlaceholderOtpInputDemo } from './placeholder-otp-input-demo';

@Component({
  selector: 'app-placeholder-otp-input-demo-container',
  imports: [DemoContainer, PlaceholderOtpInputDemo],
  template: `
    <app-demo-container
      title="Placeholder hints"
      demoUrl="/demos/otp-input/placeholder-otp-input-demo"
      [code]="code"
    >
      <app-placeholder-otp-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PlaceholderOtpInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScOtpInput,
  ScOtpInputGroup,
  ScOtpInputSlot,
} from '@semantic-components/ui';

/** Real inputs: a native placeholder in each, hidden on the focused one (Base UI's example). */
@Component({
  selector: 'app-placeholder-otp-input-demo',
  imports: [
    ScField,
    FormField,
    ScLabel,
    ScOtpInput,
    ScOtpInputGroup,
    ScOtpInputSlot,
  ],
  template: \`
    <div scField class="w-fit">
      <label scLabel>Verification code</label>
      <div scOtpInput [formField]="otpForm.code">
        <div scOtpInputGroup>
          <input
            scOtpInputSlot
            placeholder="•"
            class="focus:placeholder:text-transparent"
          />
          <input
            scOtpInputSlot
            aria-label="Character 2 of 6"
            placeholder="•"
            class="focus:placeholder:text-transparent"
          />
          <input
            scOtpInputSlot
            aria-label="Character 3 of 6"
            placeholder="•"
            class="focus:placeholder:text-transparent"
          />
          <input
            scOtpInputSlot
            aria-label="Character 4 of 6"
            placeholder="•"
            class="focus:placeholder:text-transparent"
          />
          <input
            scOtpInputSlot
            aria-label="Character 5 of 6"
            placeholder="•"
            class="focus:placeholder:text-transparent"
          />
          <input
            scOtpInputSlot
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
export class PlaceholderOtpInputDemo {
  private readonly otpForm = form(signal({ code: '' }));
}`;
}
