import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ScInputPhone } from '@semantic-components/ui';

@Component({
  selector: 'app-input-phone-demo',
  imports: [ScInputPhone, ReactiveFormsModule],
  template: `
    <sc-input-phone
      [required]="true"
      (phoneChange)="onPhoneChange($event)"
      label="Phone Number"
      placeholder="Enter your phone number"
      defaultCountry="US"
      helperText="We'll use this to contact you"
    ></sc-input-phone>

    <br />
    <br />
    <br />

    <form [formGroup]="phoneForm">
      <sc-input-phone
        [required]="true"
        formControlName="phone"
        label="Phone Number"
      ></sc-input-phone>
    </form>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPhoneDemo {
  phoneForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.phoneForm = this.fb.group({
      phone: ['', [Validators.required]],
    });
  }

  onPhoneChange(phoneData: any) {
    console.log('Phone validation result:', phoneData);
    // phoneData contains: isValid, phoneNumber, formattedNumber, countryCode, nationalNumber
  }
}
