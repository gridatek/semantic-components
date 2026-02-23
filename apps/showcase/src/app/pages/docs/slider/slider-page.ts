import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicSliderDemoContainer } from './demos/basic-slider-demo-container';
import { CustomColorSliderDemoContainer } from './demos/custom-color-slider-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

@Component({
  selector: 'app-slider-page',
  imports: [
    BasicSliderDemoContainer,
    CustomColorSliderDemoContainer,
    TocHeading,
    ComponentBadges,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Slider</h1>
        <p class="text-muted-foreground">
          A styled native range input for selecting a value within a given
          range.
        </p>
        <app-component-badges path="slider" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-slider-demo-container />
        <app-custom-color-slider-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SliderPage {}
