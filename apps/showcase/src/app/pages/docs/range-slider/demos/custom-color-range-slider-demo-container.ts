import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CustomColorRangeSliderDemo } from './custom-color-range-slider-demo';

@Component({
  selector: 'app-custom-color-range-slider-demo-container',
  imports: [DemoContainer, CustomColorRangeSliderDemo],
  template: `
    <app-demo-container
      title="Custom Color"
      demoUrl="/demos/range-slider/custom-color-range-slider-demo"
      [code]="code"
    >
      <app-custom-color-range-slider-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomColorRangeSliderDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScLabel,
  ScRangeSlider,
  ScRangeSliderEndThumb,
  ScRangeSliderStartThumb,
} from '@semantic-components/ui';

@Component({
  selector: 'app-custom-color-range-slider-demo',
  imports: [
    ScRangeSlider,
    ScRangeSliderStartThumb,
    ScRangeSliderEndThumb,
    ScLabel,
  ],
  template: \`
    <div class="w-[280px] space-y-4">
      <label scLabel>
        Temperature: {{ minValue }}&deg;C &ndash; {{ maxValue }}&deg;C
      </label>
      <div
        scRangeSlider
        style="--primary: oklch(0.6 0.25 30); --muted: oklch(0.9 0.05 30); --ring: oklch(0.6 0.25 30)"
        [step]="1"
      >
        <input
          scRangeSliderStartThumb
          [min]="0"
          [max]="50"
          [(value)]="minValue"
          aria-label="Minimum temperature"
        />
        <input
          scRangeSliderEndThumb
          [min]="0"
          [max]="50"
          [(value)]="maxValue"
          aria-label="Maximum temperature"
        />
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomColorRangeSliderDemo {
  minValue = 15;
  maxValue = 35;
}`;
}
