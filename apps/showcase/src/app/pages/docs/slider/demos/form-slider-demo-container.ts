import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormSliderDemo } from './form-slider-demo';

@Component({
  selector: 'app-form-slider-demo-container',
  imports: [DemoContainer, FormSliderDemo],
  template: `
    <app-demo-container
      title="Form"
      demoUrl="/demos/slider/form-slider-demo"
      [code]="code"
    >
      <app-form-slider-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormSliderDemoContainer {
  readonly code = `import { JsonPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
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
  template: \`
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormSliderDemo {
  readonly formModel = signal<VolumeFormModel>({
    volume: 50,
  });

  readonly volumeForm = form(this.formModel);
}`;
}
