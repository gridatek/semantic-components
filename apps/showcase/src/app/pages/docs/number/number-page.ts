import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import BasicNumberDemoContainer from './demos/basic-number-demo-container';
import DisabledNumberDemoContainer from './demos/disabled-number-demo-container';
import { NumberUsageDemoContainer } from './demos/number-usage-demo-container';
import PriceNumberDemoContainer from './demos/price-number-demo-container';
import ScrubbingNumberDemoContainer from './demos/scrubbing-number-demo-container';
import SignalFormsNumberDemoContainer from './demos/signal-forms-number-demo-container';
import StepsNumberDemoContainer from './demos/steps-number-demo-container';
import WithoutLabelNumberDemoContainer from './demos/without-label-number-demo-container';

@Component({
  selector: 'app-number-page',
  imports: [
    BasicNumberDemoContainer,
    ScrubbingNumberDemoContainer,
    StepsNumberDemoContainer,
    SignalFormsNumberDemoContainer,
    PriceNumberDemoContainer,
    DisabledNumberDemoContainer,
    WithoutLabelNumberDemoContainer,
    NumberUsageDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Number</h1>
        <p class="text-muted-foreground">
          A number field assembled from parts, as Base UI's NumberField: typed
          and read in the locale (currencies, percents, units), stepped with the
          keyboard, held buttons, the wheel or by dragging its label, and a
          Signal Forms control.
        </p>
        <app-component-badges path="number" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-number-usage-demo-container />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-number-demo-container />
        <app-scrubbing-number-demo-container />
        <app-steps-number-demo-container />
        <app-price-number-demo-container />
        <app-signal-forms-number-demo-container />
        <app-disabled-number-demo-container />
        <app-without-label-number-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class NumberPage {}
