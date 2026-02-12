import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicSliderDemoContainer } from './demos/basic-slider-demo-container';
import { DisabledSliderDemoContainer } from './demos/disabled-slider-demo-container';
import { PriceSliderDemoContainer } from './demos/price-slider-demo-container';
import { RangeSliderDemoContainer } from './demos/range-slider-demo-container';
import { SignalFormsSliderDemoContainer } from './demos/signal-forms-slider-demo-container';
import { StepSliderDemoContainer } from './demos/step-slider-demo-container';
import { TemperatureSliderDemoContainer } from './demos/temperature-slider-demo-container';
import { VolumeSliderDemoContainer } from './demos/volume-slider-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-slider-page',
  imports: [
    BasicSliderDemoContainer,
    RangeSliderDemoContainer,
    StepSliderDemoContainer,
    DisabledSliderDemoContainer,
    VolumeSliderDemoContainer,
    PriceSliderDemoContainer,
    TemperatureSliderDemoContainer,
    SignalFormsSliderDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Slider</h1>
        <p class="text-muted-foreground">
          An input where the user selects a value from within a given range.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-slider-demo-container />
        <app-range-slider-demo-container />
        <app-step-slider-demo-container />
        <app-disabled-slider-demo-container />
        <app-volume-slider-demo-container />
        <app-price-slider-demo-container />
        <app-temperature-slider-demo-container />
        <app-signal-forms-slider-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SliderPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'slider')!
    .status;
}
