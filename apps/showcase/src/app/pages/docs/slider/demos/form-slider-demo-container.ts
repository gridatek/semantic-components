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
import { FormField, form, max, min } from '@angular/forms/signals';
import {
  ScField,
  ScFrame,
  ScLabel,
  ScSlider,
} from '@semantic-components/ui';

/** Bound with [formField], in a field: the schema's min and max, the form's value. */
@Component({
  selector: 'app-form-slider-demo',
  imports: [FormField, JsonPipe, ScField, ScFrame, ScLabel, ScSlider],
  template: \`
    <div class="flex w-72 flex-col gap-4">
      <div scField>
        <label scLabel>Volume — {{ model().volume }}</label>
        <input scSlider [formField]="volumeForm.volume" />
      </div>
      <pre scFrame class="bg-muted p-4 text-xs">{{ model() | json }}</pre>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormSliderDemo {
  protected readonly model = signal({ volume: 50 });
  protected readonly volumeForm = form(this.model, (path) => {
    min(path.volume, 0);
    max(path.volume, 100);
  });
}`;
}
