import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RangeSliderUsageDemo } from './range-slider-usage-demo';

@Component({
  selector: 'app-range-slider-usage-demo-container',
  imports: [DemoContainer, RangeSliderUsageDemo],
  template: `
    <app-demo-container
      title="Usage"
      demoUrl="/demos/range-slider/range-slider-usage-demo"
      [code]="code"
    >
      <app-range-slider-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RangeSliderUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScRangeSlider, ScRangeSliderThumb } from '@semantic-components/ui';

/** Two thumbs on one track, the range between them: the value is the pair. */
@Component({
  selector: 'app-range-slider-usage-demo',
  imports: [ScRangeSlider, ScRangeSliderThumb],
  template: \`
    <div scRangeSlider [(value)]="range" class="max-w-xs">
      <input scRangeSliderThumb aria-label="Minimum" />
      <input scRangeSliderThumb aria-label="Maximum" />
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RangeSliderUsageDemo {
  private readonly range = signal<readonly [number, number]>([25, 75]);
}`;
}
