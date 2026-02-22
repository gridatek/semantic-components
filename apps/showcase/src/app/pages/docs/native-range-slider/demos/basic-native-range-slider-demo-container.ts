import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicNativeRangeSliderDemo } from './basic-native-range-slider-demo';

@Component({
  selector: 'app-basic-native-range-slider-demo-container',
  imports: [DemoContainer, BasicNativeRangeSliderDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/native-range-slider/basic-native-range-slider-demo"
      [code]="code"
    >
      <app-basic-native-range-slider-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicNativeRangeSliderDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScNativeRangeSlider } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-native-range-slider-demo',
  imports: [ScNativeRangeSlider],
  template: \`
    <div class="w-[280px] space-y-4">
      <label class="text-sm font-medium">
        Price range: {{ '$' + minValue }} &ndash; {{ '$' + maxValue }}
      </label>
      <div
        scNativeRangeSlider
        [(minValue)]="minValue"
        [(maxValue)]="maxValue"
        [min]="0"
        [max]="1000"
        [step]="10"
        min-aria-label="Minimum price"
        max-aria-label="Maximum price"
      ></div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicNativeRangeSliderDemo {
  minValue = 200;
  maxValue = 800;
}`;
}
