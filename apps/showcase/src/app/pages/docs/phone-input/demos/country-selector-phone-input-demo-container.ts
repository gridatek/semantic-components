import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CountrySelectorPhoneInputDemo } from './country-selector-phone-input-demo';

@Component({
  selector: 'app-country-selector-phone-input-demo-container',
  imports: [DemoContainer, CountrySelectorPhoneInputDemo],
  template: `
    <app-demo-container title="Country Selector" [code]="code">
      <app-country-selector-phone-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySelectorPhoneInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScPhoneInput, Country } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-country-selector-phone-input-demo',
  imports: [ScPhoneInput],
  template: \`
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
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySelectorPhoneInputDemo {
  readonly phoneWithCountry = signal('');
  readonly selectedCountry = signal('US');

  onCountryChange(country: Country): void {
    console.log('Country changed:', country);
  }
}`;
}
