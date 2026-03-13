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
import { SiDotIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-dot-separator-otp-field-demo',
  imports: [
    ScOtpField,
    ScOtpFieldSlotGroup,
    ScOtpFieldSeparator,
    ScOtpFieldSlot,
    SiDotIcon,
  ],
  template: `
    <div class="space-y-4">
      <div scOtpField [(value)]="otp">
        <div scOtpFieldSlotGroup>
          <div scOtpFieldSlot aria-label="Digit 1 of 6"></div>
          <div scOtpFieldSlot aria-label="Digit 2 of 6"></div>
        </div>
        <div scOtpFieldSeparator>
          <svg siDotIcon class="size-4"></svg>
        </div>
        <div scOtpFieldSlotGroup>
          <div scOtpFieldSlot aria-label="Digit 3 of 6"></div>
          <div scOtpFieldSlot aria-label="Digit 4 of 6"></div>
        </div>
        <div scOtpFieldSeparator>
          <svg siDotIcon class="size-4"></svg>
        </div>
        <div scOtpFieldSlotGroup>
          <div scOtpFieldSlot aria-label="Digit 5 of 6"></div>
          <div scOtpFieldSlot aria-label="Digit 6 of 6"></div>
        </div>
      </div>
      <p class="text-muted-foreground text-sm">Value: {{ otp() || 'empty' }}</p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DotSeparatorOtpFieldDemo {
  readonly otp = signal('');
}
