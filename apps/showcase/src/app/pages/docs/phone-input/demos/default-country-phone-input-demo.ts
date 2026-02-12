import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScPhoneInput } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-default-country-phone-input-demo',
  imports: [ScPhoneInput],
  template: `
    <div class="max-w-sm">
      <sc-phone-input defaultCountry="GB" />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultCountryPhoneInputDemo {}
