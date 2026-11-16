import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { TocHeading } from '../../../components/toc/toc-heading';
import { CountrySelectorPhoneInputDemoContainer } from './demos/country-selector-phone-input-demo-container';

@Component({
  selector: 'app-phone-input-page',
  imports: [
    EntryInstall,
    CountrySelectorPhoneInputDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scTypeset>Phone Input</h1>
        <p class="text-muted-foreground">
          An international phone number: a country picker and a number field
          that formats as you type. The value is the full number (+33612345678).
        </p>
        <app-component-badges path="phone-input" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Installation</h2>
        <app-entry-install
          entry="phone-input"
          library="libphonenumber-js"
          href="https://gitlab.com/catamphetamine/libphonenumber-js"
          names="ScPhoneInput, ScPhoneInputCountry, ScPhoneInputNumber"
        />
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-country-selector-phone-input-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class PhoneInputPage {}
