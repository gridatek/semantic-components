import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScOtpField,
  ScOtpFieldGroup,
  ScOtpFieldInput,
} from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-otp-field-demo',
  imports: [ScOtpField, ScOtpFieldGroup, ScOtpFieldInput],
  template: `
    <div scOtpField [disabled]="true" value="123456">
      <div scOtpFieldGroup>
        <input scOtpFieldInput aria-label="Digit 1 of 6" />
        <input scOtpFieldInput aria-label="Digit 2 of 6" />
        <input scOtpFieldInput aria-label="Digit 3 of 6" />
        <input scOtpFieldInput aria-label="Digit 4 of 6" />
        <input scOtpFieldInput aria-label="Digit 5 of 6" />
        <input scOtpFieldInput aria-label="Digit 6 of 6" />
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledOtpFieldDemo {}
