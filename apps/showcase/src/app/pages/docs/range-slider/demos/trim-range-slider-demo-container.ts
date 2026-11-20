import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TrimRangeSliderDemo } from './trim-range-slider-demo';

@Component({
  selector: 'app-trim-range-slider-demo-container',
  imports: [DemoContainer, TrimRangeSliderDemo],
  template: `
    <app-demo-container
      title="Without a form"
      demoUrl="/demos/range-slider/trim-range-slider-demo"
      [code]="code"
    >
      <app-trim-range-slider-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TrimRangeSliderDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScRangeSlider, ScRangeSliderThumb } from '@semantic-components/ui';

/** Without a form: a clip's start and end, its ends written as [min] and [max] (0 to the clip's length), in seconds. */
@Component({
  selector: 'app-trim-range-slider-demo',
  imports: [ScRangeSlider, ScRangeSliderThumb],
  template: \`
    <div class="flex w-full max-w-xs flex-col gap-3">
      <div
        scRangeSlider
        #trim="scRangeSlider"
        [(value)]="clip"
        [min]="0"
        [max]="duration"
        [format]="{ style: 'unit', unit: 'second' }"
        aria-label="Trim the clip"
      >
        <input scRangeSliderThumb aria-label="Start" />
        <input scRangeSliderThumb aria-label="End" />
      </div>
      <p class="text-muted-foreground text-center text-sm tabular-nums">
        {{ trim.formatted()[0] }} – {{ trim.formatted()[1] }}
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TrimRangeSliderDemo {
  /** The clip's length, in seconds. */
  private readonly duration = 90;
  private readonly clip = signal<readonly [number, number]>([15, 65]);
}`;
}
