import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicRangeSliderDemo } from './basic-range-slider-demo';

@Component({
  selector: 'app-basic-range-slider-demo-container',
  imports: [DemoContainer, BasicRangeSliderDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/range-slider/basic-range-slider-demo"
      [code]="code"
    >
      <app-basic-range-slider-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicRangeSliderDemoContainer {
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
  selector: 'app-basic-range-slider-demo',
  imports: [
    ScRangeSlider,
    ScRangeSliderStartThumb,
    ScRangeSliderEndThumb,
    ScLabel,
  ],
  template: \`
    <div class="w-[280px] space-y-4">
      <label scLabel>
        Price range: {{ '$' + minValue }} &ndash; {{ '$' + maxValue }}
      </label>
      <div scRangeSlider [step]="10">
        <input
          scRangeSliderStartThumb
          [min]="0"
          [max]="1000"
          [(value)]="minValue"
          aria-label="Minimum price"
        />
        <input
          scRangeSliderEndThumb
          [min]="0"
          [max]="1000"
          [(value)]="maxValue"
          aria-label="Maximum price"
        />
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicRangeSliderDemo {
  minValue = 200;
  maxValue = 800;
}`;
}
