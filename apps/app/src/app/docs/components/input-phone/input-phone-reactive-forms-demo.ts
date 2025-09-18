import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { ScInputPhone } from '@semantic-components/ui';

@Component({
  selector: 'app-input-phone-reactive-forms-demo',
  imports: [ScInputPhone, ReactiveFormsModule],
  template: `
    <sc-input-phone
      [formControl]="phoneControl"
      label="Phone Number"
      placeholder="Enter your phone number"
    ></sc-input-phone>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPhoneReactiveFormsDemo {
  phoneControl = new FormControl('');
}
