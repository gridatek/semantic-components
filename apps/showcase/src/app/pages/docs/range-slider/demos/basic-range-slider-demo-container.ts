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
    <app-demo-container title="Basic" [code]="code">
      <app-basic-range-slider-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicRangeSliderDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScRangeSlider } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-range-slider-demo',
  imports: [ScRangeSlider],
  template: \`
    <div class="w-[60%]">
      <div
        sc-range-slider
        [(minValue)]="minValue"
        [(maxValue)]="maxValue"
        [min-aria-label]="'Minimum value'"
        [max-aria-label]="'Maximum value'"
      ></div>
      <p class="mt-2 text-sm text-muted-foreground">
        Range: {{ minValue() }} - {{ maxValue() }}
      </p>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicRangeSliderDemo {
  readonly minValue = signal(25);
  readonly maxValue = signal(75);
}`;
}
