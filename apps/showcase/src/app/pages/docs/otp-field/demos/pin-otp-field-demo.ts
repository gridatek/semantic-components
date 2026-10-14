import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScOtpField,
  ScOtpFieldGroup,
  ScOtpFieldInput,
} from '@semantic-components/ui';

@Component({
  selector: 'app-pin-otp-field-demo',
  imports: [ScOtpField, ScOtpFieldGroup, ScOtpFieldInput],
  template: `
    <div class="space-y-4">
      <div scOtpField [(value)]="otp">
        <div scOtpFieldGroup>
          <input scOtpFieldInput aria-label="Digit 1 of 4" />
          <input scOtpFieldInput aria-label="Digit 2 of 4" />
          <input scOtpFieldInput aria-label="Digit 3 of 4" />
          <input scOtpFieldInput aria-label="Digit 4 of 4" />
        </div>
      </div>
      <p class="text-muted-foreground text-sm">Value: {{ otp() || 'empty' }}</p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PinOtpFieldDemo {
  readonly otp = signal('');
}
