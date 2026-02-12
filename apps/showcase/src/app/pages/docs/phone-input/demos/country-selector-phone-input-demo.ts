import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScPhoneInput, Country } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-country-selector-phone-input-demo',
  imports: [ScPhoneInput],
  template: `
    <div class="max-w-sm">
      <sc-phone-input
        [(value)]="phoneWithCountry"
        [(countryCode)]="selectedCountry"
        (countryChange)="onCountryChange($event)"
      />
    </div>
    <p class="text-sm text-muted-foreground mt-2">
      Value: {{ phoneWithCountry() || 'Empty' }}
    </p>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySelectorPhoneInputDemo {
  readonly phoneWithCountry = signal('');
  readonly selectedCountry = signal('US');

  onCountryChange(country: Country): void {
    console.log('Country changed:', country);
  }
}
