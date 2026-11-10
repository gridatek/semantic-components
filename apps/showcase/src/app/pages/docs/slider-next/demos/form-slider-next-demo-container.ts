import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormSliderNextDemo } from './form-slider-next-demo';

@Component({
  selector: 'app-form-slider-next-demo-container',
  imports: [DemoContainer, FormSliderNextDemo],
  template: `
    <app-demo-container
      title="Form"
      demoUrl="/demos/slider-next/form-slider-next-demo"
      [code]="code"
    >
      <app-form-slider-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormSliderNextDemoContainer {
  readonly code = `import { JsonPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, max, min } from '@angular/forms/signals';
import {
  ScField,
  ScFrame,
  ScLabel,
  ScSliderNext,
} from '@semantic-components/ui';

/** Bound with [formField], in a field: the schema's min and max, the form's value. */
@Component({
  selector: 'app-form-slider-next-demo',
  imports: [FormField, JsonPipe, ScField, ScFrame, ScLabel, ScSliderNext],
  template: \`
    <div class="flex w-72 flex-col gap-4">
      <div scField>
        <label scLabel>Volume — {{ model().volume }}</label>
        <input type="range" scSliderNext [formField]="volumeForm.volume" />
      </div>
      <pre scFrame class="bg-muted p-4 text-xs">{{ model() | json }}</pre>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormSliderNextDemo {
  protected readonly model = signal({ volume: 50 });
  protected readonly volumeForm = form(this.model, (path) => {
    min(path.volume, 0);
    max(path.volume, 100);
  });
}`;
}
