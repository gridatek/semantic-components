import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScOtpField,
  ScOtpFieldGroup,
  ScOtpFieldInput,
  ScOtpFieldSeparator,
} from '@semantic-components/ui';
import { SiMinusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-separator-otp-field-demo',
  imports: [
    ScOtpField,
    ScOtpFieldGroup,
    ScOtpFieldSeparator,
    ScOtpFieldInput,
    SiMinusIcon,
  ],
  template: `
    <div class="space-y-4">
      <div scOtpField [(value)]="otp">
        <div scOtpFieldGroup>
          <input scOtpFieldInput aria-label="Digit 1 of 6" />
          <input scOtpFieldInput aria-label="Digit 2 of 6" />
          <input scOtpFieldInput aria-label="Digit 3 of 6" />
          <div scOtpFieldSeparator>
            <svg siMinusIcon class="size-4"></svg>
          </div>
          <input scOtpFieldInput aria-label="Digit 4 of 6" />
          <input scOtpFieldInput aria-label="Digit 5 of 6" />
          <input scOtpFieldInput aria-label="Digit 6 of 6" />
        </div>
      </div>
      <p class="text-muted-foreground text-sm">Value: {{ otp() || 'empty' }}</p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SeparatorOtpFieldDemo {
  readonly otp = signal('');
}
