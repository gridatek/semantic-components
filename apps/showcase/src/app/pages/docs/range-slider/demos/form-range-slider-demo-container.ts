import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormRangeSliderDemo } from './form-range-slider-demo';

@Component({
  selector: 'app-form-range-slider-demo-container',
  imports: [DemoContainer, FormRangeSliderDemo],
  template: `
    <app-demo-container
      title="Form"
      demoUrl="/demos/range-slider/form-range-slider-demo"
      [code]="code"
    >
      <app-form-range-slider-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormRangeSliderDemoContainer {
  readonly code = `import { JsonPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, max, min } from '@angular/forms/signals';
import {
  ScField,
  ScFieldErrors,
  ScLabel,
  ScRangeSlider,
  ScRangeSliderEndThumb,
  ScRangeSliderStartThumb,
} from '@semantic-components/ui';

interface PriceRangeFormModel {
  minPrice: number;
  maxPrice: number;
}

@Component({
  selector: 'app-form-range-slider-demo',
  imports: [
    ScRangeSlider,
    ScRangeSliderStartThumb,
    ScRangeSliderEndThumb,
    ScField,
    ScFieldErrors,
    ScLabel,
    FormField,
    JsonPipe,
  ],
  template: \`
    <div class="w-[320px] space-y-6">
      <div scField>
        <label scLabel>
          Price range: {{ '$' + formModel().minPrice }} &ndash;
          {{ '$' + formModel().maxPrice }}
        </label>
        <div scRangeSlider [step]="50">
          <input
            scRangeSliderStartThumb
            [formField]="priceForm.minPrice"
            aria-label="Minimum price"
          />
          <input
            scRangeSliderEndThumb
            [formField]="priceForm.maxPrice"
            aria-label="Maximum price"
          />
        </div>
        <p scFieldErrors></p>
      </div>

      <div class="bg-muted rounded-md p-4">
        <p class="text-sm font-medium">Form Values:</p>
        <pre class="mt-2 text-xs">{{ formModel() | json }}</pre>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormRangeSliderDemo {
  readonly formModel = signal<PriceRangeFormModel>({
    minPrice: 100,
    maxPrice: 750,
  });

  readonly priceForm = form(this.formModel, (path) => {
    min(path.minPrice, 0);
    max(path.minPrice, 1000);
    min(path.maxPrice, 0);
    max(path.maxPrice, 1000);
  });
}`;
}
