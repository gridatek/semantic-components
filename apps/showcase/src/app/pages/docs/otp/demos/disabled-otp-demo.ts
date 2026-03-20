import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScOtp, ScOtpSlot, ScOtpSlotGroup } from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-otp-demo',
  imports: [ScOtp, ScOtpSlotGroup, ScOtpSlot],
  template: `
    <div scOtp [disabled]="true" value="123456">
      <div scOtpSlotGroup>
        <div scOtpSlot aria-label="Digit 1 of 6"></div>
        <div scOtpSlot aria-label="Digit 2 of 6"></div>
        <div scOtpSlot aria-label="Digit 3 of 6"></div>
        <div scOtpSlot aria-label="Digit 4 of 6"></div>
        <div scOtpSlot aria-label="Digit 5 of 6"></div>
        <div scOtpSlot aria-label="Digit 6 of 6"></div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledOtpDemo {}
