import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScOtpField,
  ScOtpFieldGroup,
  ScOtpFieldSlot,
  ScOtpFieldSlotGroup,
} from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-otp-field-demo',
  imports: [ScOtpField, ScOtpFieldGroup, ScOtpFieldSlotGroup, ScOtpFieldSlot],
  template: `
    <div scOtpField [disabled]="true" value="123456">
      <div scOtpFieldGroup>
        <div scOtpFieldSlotGroup>
          <div scOtpFieldSlot aria-label="Digit 1 of 6"></div>
          <div scOtpFieldSlot aria-label="Digit 2 of 6"></div>
          <div scOtpFieldSlot aria-label="Digit 3 of 6"></div>
          <div scOtpFieldSlot aria-label="Digit 4 of 6"></div>
          <div scOtpFieldSlot aria-label="Digit 5 of 6"></div>
          <div scOtpFieldSlot aria-label="Digit 6 of 6"></div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledOtpFieldDemo {}
