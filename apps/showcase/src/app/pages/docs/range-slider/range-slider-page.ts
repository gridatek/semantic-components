import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicRangeSliderDemoContainer } from './demos/basic-range-slider-demo-container';
import { CustomColorRangeSliderDemoContainer } from './demos/custom-color-range-slider-demo-container';
import { FormRangeSliderDemoContainer } from './demos/form-range-slider-demo-container';

@Component({
  selector: 'app-range-slider-page',
  imports: [
    BasicRangeSliderDemoContainer,
    CustomColorRangeSliderDemoContainer,
    FormRangeSliderDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Range Slider</h1>
        <p class="text-muted-foreground">
          A dual-thumb range slider for selecting a numeric range between a
          minimum and maximum value.
        </p>
        <app-component-badges path="range-slider" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-range-slider-demo-container />
        <app-custom-color-range-slider-demo-container />
        <app-form-range-slider-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RangeSliderPage {}
