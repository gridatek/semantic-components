import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LabelRangeSliderDemo } from './label-range-slider-demo';

@Component({
  selector: 'app-label-range-slider-demo-container',
  imports: [DemoContainer, LabelRangeSliderDemo],
  template: `
    <app-demo-container
      title="Label and value"
      demoUrl="/demos/range-slider/label-range-slider-demo"
      [code]="code"
    >
      <app-label-range-slider-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LabelRangeSliderDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, applyEach, form, max, min } from '@angular/forms/signals';
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
    FormField,
    ScField,
    ScFieldDescription,
    ScLabel,
    ScRangeSlider,
    ScRangeSliderThumb,
  ],
  template: \`
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
        [formField]="priceForm.price"
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LabelRangeSliderDemo {
  private readonly model = signal<{ price: readonly [number, number] }>({
    price: [200, 800],
  });
  private readonly priceForm = form(this.model, (path) =>
    applyEach(path.price, (value) => {
      min(value, 0);
      max(value, 1000);
    }),
  );
}`;
}
