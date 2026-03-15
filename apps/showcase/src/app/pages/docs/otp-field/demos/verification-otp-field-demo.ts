import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScOtpField,
  ScOtpFieldSeparator,
  ScOtpFieldSlot,
  ScOtpFieldSlotGroup,
} from '@semantic-components/ui';
import { SiMinusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-verification-otp-field-demo',
  imports: [
    ScOtpField,
    ScOtpFieldSlotGroup,
    ScOtpFieldSeparator,
    ScOtpFieldSlot,
    SiMinusIcon,
  ],
  template: `
    <div class="max-w-sm rounded-lg border p-6">
      <div class="space-y-4">
        <div class="space-y-2 text-center">
          <h4 class="font-semibold">Enter verification code</h4>
          <p class="text-muted-foreground text-sm">
            We sent a code to your email address
          </p>
        </div>
        <div class="flex justify-center">
          <div scOtpField [(value)]="code">
            <div scOtpFieldSlotGroup>
              <div scOtpFieldSlot aria-label="Digit 1 of 6"></div>
              <div scOtpFieldSlot aria-label="Digit 2 of 6"></div>
              <div scOtpFieldSlot aria-label="Digit 3 of 6"></div>
            </div>
            <div scOtpFieldSeparator>
              <svg siMinusIcon class="size-4"></svg>
            </div>
            <div scOtpFieldSlotGroup>
              <div scOtpFieldSlot aria-label="Digit 4 of 6"></div>
              <div scOtpFieldSlot aria-label="Digit 5 of 6"></div>
              <div scOtpFieldSlot aria-label="Digit 6 of 6"></div>
            </div>
          </div>
        </div>
        <p class="text-muted-foreground text-center text-sm">
          @if (code().length === 6) {
            Code entered: {{ code() }}
          } @else {
            Enter all 6 digits
          }
        </p>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerificationOtpFieldDemo {
  readonly code = signal('');
}
