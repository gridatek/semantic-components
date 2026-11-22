import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormColorPickerNextDemo } from './form-color-picker-next-demo';

@Component({
  selector: 'app-form-color-picker-next-demo-container',
  imports: [DemoContainer, FormColorPickerNextDemo],
  template: `
    <app-demo-container
      title="Form"
      [code]="code"
      demoUrl="/demos/color-picker-next/form-color-picker-next-demo"
    >
      <app-form-color-picker-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormColorPickerNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScButton,
  ScColorPickerNext,
  ScColorPickerNextArea,
  ScColorPickerNextInput,
  ScColorPickerNextSlider,
  ScColorPickerNextSwatch,
  ScField,
  ScFieldErrors,
  ScLabel,
} from '@semantic-components/ui';

/** A [formField]: required from the schema (empty is no colour); in a field, named by its label. */
@Component({
  selector: 'app-form-color-picker-next-demo',
  imports: [
    FormField,
    FormRoot,
    ScButton,
    ScColorPickerNext,
    ScColorPickerNextArea,
    ScColorPickerNextInput,
    ScColorPickerNextSlider,
    ScColorPickerNextSwatch,
    ScField,
    ScFieldErrors,
    ScLabel,
  ],
  template: \`
    <form [formRoot]="brandForm" class="grid w-64 gap-3">
      <div scField>
        <label scLabel>Brand color</label>
        <div scColorPickerNext class="grid gap-3" [formField]="brandForm.color">
          <div scColorPickerNextArea aria-label="Color"></div>
          <input scColorPickerNextSlider="hue" aria-label="Hue" />
          <div class="flex gap-2">
            <span scColorPickerNextSwatch></span>
            <input scColorPickerNextInput aria-label="Hex" />
          </div>
        </div>
        <div scFieldErrors></div>
      </div>
      <button scButton type="submit" class="justify-self-start">Save</button>
      @if (saved()) {
        <p class="text-sm" role="status">{{ saved() }}</p>
      }
    </form>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormColorPickerNextDemo {
  private readonly model = signal({ color: '' });
  private readonly saved = signal('');
  private readonly brandForm = form(
    this.model,
    (s) => {
      required(s.color, { message: 'Pick a color.' });
    },
    {
      submission: {
        action: async () => this.saved.set(\`Saved \${this.model().color}.\`),
      },
    },
  );
}`;
}
