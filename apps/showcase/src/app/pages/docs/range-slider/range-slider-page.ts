import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicRangeSliderDemoContainer } from './demos/basic-range-slider-demo-container';
import { CustomColorRangeSliderDemoContainer } from './demos/custom-color-range-slider-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

@Component({
  selector: 'app-range-slider-page',
  imports: [
    BasicRangeSliderDemoContainer,
    CustomColorRangeSliderDemoContainer,
    TocHeading,
    ComponentBadges,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Range Slider</h1>
        <p class="text-muted-foreground">
          A dual-thumb range slider for selecting a numeric range between a
          minimum and maximum value.
        </p>
        <app-component-badges path="range-slider" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-range-slider-demo-container />
        <app-custom-color-range-slider-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RangeSliderPage {}
