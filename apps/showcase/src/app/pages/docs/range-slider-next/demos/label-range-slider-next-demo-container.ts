import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LabelRangeSliderNextDemo } from './label-range-slider-next-demo';

@Component({
  selector: 'app-label-range-slider-next-demo-container',
  imports: [DemoContainer, LabelRangeSliderNextDemo],
  template: `
    <app-demo-container
      title="Label and value"
      demoUrl="/demos/range-slider-next/label-range-slider-next-demo"
      [code]="code"
    >
      <app-label-range-slider-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LabelRangeSliderNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScLabel,
  ScRangeSliderNext,
  ScRangeSliderNextThumb,
} from '@semantic-components/ui';

/** In a field, named by its label; the values in euros (format), read by screen readers and written beside it. */
@Component({
  selector: 'app-label-range-slider-next-demo',
  imports: [ScField, ScFieldDescription, ScLabel, ScRangeSliderNext, ScRangeSliderNextThumb],
  template: \`
    <div scField class="max-w-xs">
      <div class="flex items-center justify-between gap-2">
        <label scLabel>Price</label>
        <span class="text-muted-foreground text-sm tabular-nums">
          {{ price.formatted()[0] }} – {{ price.formatted()[1] }}
        </span>
      </div>
      <div
        scRangeSliderNext
        #price="scRangeSliderNext"
        [(value)]="range"
        [maxValue]="1000"
        [step]="10"
        [format]="{ style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }"
      >
        <input scRangeSliderNextThumb aria-label="Minimum price" />
        <input scRangeSliderNextThumb aria-label="Maximum price" />
      </div>
      <p scFieldDescription>Nights from this price to that one.</p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LabelRangeSliderNextDemo {
  private readonly range = signal<readonly [number, number]>([200, 800]);
}`;
}
