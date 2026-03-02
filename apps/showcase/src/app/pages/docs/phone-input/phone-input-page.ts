import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { CountrySelectorPhoneInputDemoContainer } from './demos/country-selector-phone-input-demo-container';
import { DefaultCountryPhoneInputDemoContainer } from './demos/default-country-phone-input-demo-container';
import { DisabledPhoneInputDemoContainer } from './demos/disabled-phone-input-demo-container';
import { FormPhoneInputDemoContainer } from './demos/form-phone-input-demo-container';
import { InternationalFormatPhoneInputDemoContainer } from './demos/international-format-phone-input-demo-container';
import { UsFormatPhoneInputDemoContainer } from './demos/us-format-phone-input-demo-container';
import { WithoutIconPhoneInputDemoContainer } from './demos/without-icon-phone-input-demo-container';

@Component({
  selector: 'app-phone-input-page',
  imports: [
    CountrySelectorPhoneInputDemoContainer,
    DefaultCountryPhoneInputDemoContainer,
    UsFormatPhoneInputDemoContainer,
    InternationalFormatPhoneInputDemoContainer,
    WithoutIconPhoneInputDemoContainer,
    DisabledPhoneInputDemoContainer,
    FormPhoneInputDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>PhoneInput</h1>
        <p class="text-muted-foreground">
          Phone number input with country code selector and formatting options.
        </p>
        <app-component-badges path="phone-input" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-country-selector-phone-input-demo-container />
        <app-default-country-phone-input-demo-container />
        <app-us-format-phone-input-demo-container />
        <app-international-format-phone-input-demo-container />
        <app-without-icon-phone-input-demo-container />
        <app-disabled-phone-input-demo-container />
        <app-form-phone-input-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PhoneInputPage {}
