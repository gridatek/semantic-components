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
  ScSlider,
} from '@semantic-components/ui';

interface VolumeFormModel {
  volume: number;
}

@Component({
  selector: 'app-form-slider-demo',
  imports: [ScSlider, ScField, ScFieldErrors, ScLabel, FormField, JsonPipe],
  template: `
    <div class="w-[280px] space-y-6">
      <div scField>
        <label scLabel>Volume — {{ formModel().volume }}</label>
        <input scSlider [formField]="volumeForm.volume" aria-label="Volume" />
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
export class FormSliderDemo {
  readonly formModel = signal<VolumeFormModel>({
    volume: 50,
  });

  readonly volumeForm = form(this.formModel);
}
