import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledRangeSliderDemo } from './disabled-range-slider-demo';

@Component({
  selector: 'app-disabled-range-slider-demo-container',
  imports: [DemoContainer, DisabledRangeSliderDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/range-slider/disabled-range-slider-demo"
      [code]="code"
    >
      <app-disabled-range-slider-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledRangeSliderDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScRangeSlider,
  ScRangeSliderThumb,
} from '@semantic-components/ui';

/** Disabled: neither thumb takes the pointer or the focus. */
@Component({
  selector: 'app-disabled-range-slider-demo',
  imports: [ScRangeSlider, ScRangeSliderThumb],
  template: \`
    <div scRangeSlider disabled [(value)]="range" class="max-w-xs">
      <input scRangeSliderThumb aria-label="Minimum" />
      <input scRangeSliderThumb aria-label="Maximum" />
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledRangeSliderDemo {
  private readonly range = signal<readonly [number, number]>([25, 75]);
}`;
}
