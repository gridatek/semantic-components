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
  selector: 'app-pin-otp-field-demo',
  imports: [ScOtpField, ScOtpFieldSlotGroup, ScOtpFieldSlot],
  template: `
    <div class="space-y-4">
      <div scOtpField [(value)]="otp">
        <div scOtpFieldSlotGroup>
          <div scOtpFieldSlot></div>
          <div scOtpFieldSlot></div>
          <div scOtpFieldSlot></div>
          <div scOtpFieldSlot></div>
        </div>
      </div>
      <p class="text-muted-foreground text-sm">Value: {{ otp() || 'empty' }}</p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PinOtpFieldDemo {
  readonly otp = signal('');
}
