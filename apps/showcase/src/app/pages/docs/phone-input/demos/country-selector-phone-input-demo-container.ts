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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySelectorPhoneInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { Country, ScPhoneInput } from '@semantic-components/ui-lab';

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
    <p class="text-muted-foreground mt-2 text-sm">
      Value: {{ phoneWithCountry() || 'Empty' }}
    </p>
  \`,
  host: { class: 'flex w-full justify-center' },
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
