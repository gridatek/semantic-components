import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { CountrySelectorPhoneInputDemoContainer } from './demos/country-selector-phone-input-demo-container';

@Component({
  selector: 'app-phone-input-page',
  imports: [
    CountrySelectorPhoneInputDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Phone Input</h1>
        <p class="text-muted-foreground">
          Phone number input with country code selector and formatting options.
        </p>
        <app-component-badges path="phone-input" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-country-selector-phone-input-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PhoneInputPage {}
