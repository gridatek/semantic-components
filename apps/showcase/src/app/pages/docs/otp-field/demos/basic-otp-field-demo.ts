import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScOtpField,
  ScOtpFieldSlot,
  ScOtpFieldSlotGroup,
} from '@semantic-components/ui';

@Component({
  selector: 'app-basic-otp-field-demo',
  imports: [ScOtpField, ScOtpFieldSlotGroup, ScOtpFieldSlot],
  template: `
    <div class="space-y-4">
      <div scOtpField [(value)]="otp">
        <div scOtpFieldSlotGroup>
          <div scOtpFieldSlot aria-label="Digit 1 of 6"></div>
          <div scOtpFieldSlot aria-label="Digit 2 of 6"></div>
          <div scOtpFieldSlot aria-label="Digit 3 of 6"></div>
          <div scOtpFieldSlot aria-label="Digit 4 of 6"></div>
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
export class BasicOtpFieldDemo {
  readonly otp = signal('');
}
