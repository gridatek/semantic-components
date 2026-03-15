import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import BasicNumberFieldDemoContainer from './demos/basic-number-field-demo-container';
import DisabledNumberFieldDemoContainer from './demos/disabled-number-field-demo-container';
import { NumberFieldUsageDemoContainer } from './demos/number-field-usage-demo-container';
import PriceNumberFieldDemoContainer from './demos/price-number-field-demo-container';
import ScrubbingNumberFieldDemoContainer from './demos/scrubbing-number-field-demo-container';
import WithoutLabelNumberFieldDemoContainer from './demos/without-label-number-field-demo-container';

@Component({
  selector: 'app-number-field-page',
  imports: [
    BasicNumberFieldDemoContainer,
    ScrubbingNumberFieldDemoContainer,
    PriceNumberFieldDemoContainer,
    DisabledNumberFieldDemoContainer,
    WithoutLabelNumberFieldDemoContainer,
    NumberFieldUsageDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Number Field</h1>
        <p class="text-muted-foreground">
          A composable numeric input component with scrubbing support,
          increment/decrement buttons, and label integration.
        </p>
        <app-component-badges path="number-field" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-number-field-usage-demo-container />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-number-field-demo-container />
        <app-scrubbing-number-field-demo-container />
        <app-price-number-field-demo-container />
        <app-disabled-number-field-demo-container />
        <app-without-label-number-field-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NumberFieldPage {}
