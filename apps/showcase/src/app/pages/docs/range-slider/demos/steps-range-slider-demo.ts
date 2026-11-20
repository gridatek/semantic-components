import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScRangeSlider, ScRangeSliderThumb } from '@semantic-components/ui';

/** By tens, and two steps apart at least (minStepsBetweenValues): the thumbs stop 20 short of each other. */
@Component({
  selector: 'app-steps-range-slider-demo',
  imports: [ScRangeSlider, ScRangeSliderThumb],
  template: `
    <div class="flex w-full max-w-xs flex-col gap-3">
      <div
        scRangeSlider
        [(value)]="range"
        [step]="10"
        [minStepsBetweenValues]="2"
      >
        <input scRangeSliderThumb aria-label="Minimum" />
        <input scRangeSliderThumb aria-label="Maximum" />
      </div>
      <p class="text-muted-foreground text-center text-sm tabular-nums">
        {{ range()[0] }} – {{ range()[1] }}
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class StepsRangeSliderDemo {
  private readonly range = signal<readonly [number, number]>([30, 70]);
}
