import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RangeSliderNextUsageDemo } from './range-slider-next-usage-demo';

@Component({
  selector: 'app-range-slider-next-usage-demo-container',
  imports: [DemoContainer, RangeSliderNextUsageDemo],
  template: `
    <app-demo-container
      title="Usage"
      demoUrl="/demos/range-slider-next/range-slider-next-usage-demo"
      [code]="code"
    >
      <app-range-slider-next-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RangeSliderNextUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScRangeSliderNext, ScRangeSliderNextThumb } from '@semantic-components/ui';

/** Two thumbs on one track, the range between them: the value is the pair. */
@Component({
  selector: 'app-range-slider-next-usage-demo',
  imports: [ScRangeSliderNext, ScRangeSliderNextThumb],
  template: \`
    <div scRangeSliderNext [(value)]="range" class="max-w-xs">
      <input scRangeSliderNextThumb aria-label="Minimum" />
      <input scRangeSliderNextThumb aria-label="Maximum" />
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RangeSliderNextUsageDemo {
  private readonly range = signal<readonly [number, number]>([25, 75]);
}`;
}
