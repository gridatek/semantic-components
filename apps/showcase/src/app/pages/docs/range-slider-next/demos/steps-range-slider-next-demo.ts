import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScRangeSliderNext,
  ScRangeSliderNextThumb,
} from '@semantic-components/ui';

/** By tens, and two steps apart at least (minStepsBetweenValues): the thumbs stop 20 short of each other. */
@Component({
  selector: 'app-steps-range-slider-next-demo',
  imports: [ScRangeSliderNext, ScRangeSliderNextThumb],
  template: `
    <div class="flex w-full max-w-xs flex-col gap-3">
      <div
        scRangeSliderNext
        [(value)]="range"
        [step]="10"
        [minStepsBetweenValues]="2"
      >
        <input scRangeSliderNextThumb aria-label="Minimum" />
        <input scRangeSliderNextThumb aria-label="Maximum" />
      </div>
      <p class="text-muted-foreground text-center text-sm tabular-nums">
        {{ range()[0] }} – {{ range()[1] }}
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class StepsRangeSliderNextDemo {
  private readonly range = signal<readonly [number, number]>([30, 70]);
}
