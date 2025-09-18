import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScInputPhone } from '@semantic-components/ui';

@Component({
  selector: 'app-input-phone-demo',
  imports: [ScInputPhone],
  template: `
    <sc-input-phone
      [required]="true"
      (phoneChange)="onPhoneChange($event)"
      label="Phone Number"
      placeholder="Enter your phone number"
      defaultCountry="US"
      helperText="We'll use this to contact you"
    ></sc-input-phone>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPhoneDemo {
  onPhoneChange(phoneData: any) {
    console.log('Phone validation result:', phoneData);
    // phoneData contains: isValid, phoneNumber, formattedNumber, countryCode, nationalNumber
  }
}
