import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScLabel,
  ScRangeSlider,
  ScRangeSliderThumb,
} from '@semantic-components/ui';

/** In a field, named by its label; the values in euros (format), read by screen readers and written beside it. */
@Component({
  selector: 'app-label-range-slider-demo',
  imports: [
    ScField,
    ScFieldDescription,
    ScLabel,
    ScRangeSlider,
    ScRangeSliderThumb,
  ],
  template: `
    <div scField class="max-w-xs">
      <div class="flex items-center justify-between gap-2">
        <label scLabel>Price</label>
        <span class="text-muted-foreground text-sm tabular-nums">
          {{ price.formatted()[0] }} – {{ price.formatted()[1] }}
        </span>
      </div>
      <div
        scRangeSlider
        #price="scRangeSlider"
        [(value)]="range"
        [maxValue]="1000"
        [step]="10"
        [format]="{
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
        }"
      >
        <input scRangeSliderThumb aria-label="Minimum price" />
        <input scRangeSliderThumb aria-label="Maximum price" />
      </div>
      <p scFieldDescription>Nights from this price to that one.</p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LabelRangeSliderDemo {
  private readonly range = signal<readonly [number, number]>([200, 800]);
}
