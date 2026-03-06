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
  ScRangeSlider,
  ScRangeSliderMax,
  ScRangeSliderMin,
} from '@semantic-components/ui';

@Component({
  selector: 'app-basic-range-slider-demo',
  imports: [ScRangeSlider, ScRangeSliderMin, ScRangeSliderMax],
  template: \`
    <div class="w-[280px] space-y-4">
      <label class="text-sm font-medium">
        Price range: {{ '$' + minValue }} &ndash; {{ '$' + maxValue }}
      </label>
      <div
        scRangeSlider
        [(minValue)]="minValue"
        [(maxValue)]="maxValue"
        [min]="0"
        [max]="1000"
        [step]="10"
      >
        <input scRangeSliderMin aria-label="Minimum price" />
        <input scRangeSliderMax aria-label="Maximum price" />
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicRangeSliderDemo {
  minValue = 200;
  maxValue = 800;
}`;
}
