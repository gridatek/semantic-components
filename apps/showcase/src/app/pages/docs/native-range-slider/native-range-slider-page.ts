import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicNativeRangeSliderDemoContainer } from './demos/basic-native-range-slider-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

@Component({
  selector: 'app-native-range-slider-page',
  imports: [BasicNativeRangeSliderDemoContainer, TocHeading, ComponentBadges],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Native Range Slider</h1>
        <p class="text-muted-foreground">
          A native dual-thumb range slider for selecting a value range using two
          overlaid range inputs.
        </p>
        <app-component-badges path="native-range-slider" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-native-range-slider-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NativeRangeSliderPage {}
