import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicNativeSliderDemoContainer } from './demos/basic-native-slider-demo-container';
import { CustomColorNativeSliderDemoContainer } from './demos/custom-color-native-slider-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

@Component({
  selector: 'app-native-slider-page',
  imports: [
    BasicNativeSliderDemoContainer,
    CustomColorNativeSliderDemoContainer,
    TocHeading,
    ComponentBadges,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Native Slider</h1>
        <p class="text-muted-foreground">
          A styled native range input for selecting a value within a given
          range.
        </p>
        <app-component-badges path="native-slider" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-native-slider-demo-container />
        <app-custom-color-native-slider-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NativeSliderPage {}
