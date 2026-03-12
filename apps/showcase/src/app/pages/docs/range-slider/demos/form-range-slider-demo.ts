import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScFieldErrors,
  ScLabel,
  ScRangeSlider,
  ScRangeSliderMax,
  ScRangeSliderMin,
} from '@semantic-components/ui';

interface PriceRangeFormModel {
  minPrice: string;
  maxPrice: string;
}

@Component({
  selector: 'app-form-range-slider-demo',
  imports: [
    ScRangeSlider,
    ScRangeSliderMin,
    ScRangeSliderMax,
    ScField,
    ScFieldErrors,
    ScLabel,
    FormField,
    JsonPipe,
  ],
  template: `
    <div class="w-[320px] space-y-6">
      <div scField>
        <label scLabel>
          Price range: {{ '$' + formModel().minPrice }} &ndash;
          {{ '$' + formModel().maxPrice }}
        </label>
        <div scRangeSlider [min]="0" [max]="1000" [step]="50">
          <input
            scRangeSliderMin
            [formField]="priceForm.minPrice"
            aria-label="Minimum price"
          />
          <input
            scRangeSliderMax
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormRangeSliderDemo {
  readonly formModel = signal<PriceRangeFormModel>({
    minPrice: '100',
    maxPrice: '750',
  });

  readonly priceForm = form(this.formModel);
}
