import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScButton,
  ScColorPicker,
  ScColorPickerArea,
  ScColorPickerInput,
  ScColorPickerSlider,
  ScColorPickerSwatch,
  ScField,
  ScFieldErrors,
  ScLabel,
} from '@semantic-components/ui';

/** A [formField]: required from the schema (empty is no colour); in a field, named by its label. */
@Component({
  selector: 'app-form-color-picker-demo',
  imports: [
    FormField,
    FormRoot,
    ScButton,
    ScColorPicker,
    ScColorPickerArea,
    ScColorPickerInput,
    ScColorPickerSlider,
    ScColorPickerSwatch,
    ScField,
    ScFieldErrors,
    ScLabel,
  ],
  template: `
    <form [formRoot]="brandForm" class="grid w-64 gap-3">
      <div scField>
        <label scLabel>Brand color</label>
        <div scColorPicker class="grid gap-3" [formField]="brandForm.color">
          <div scColorPickerArea aria-label="Color"></div>
          <input scColorPickerSlider="hue" aria-label="Hue" />
          <div class="flex gap-2">
            <span scColorPickerSwatch></span>
            <input scColorPickerInput aria-label="Hex" />
          </div>
        </div>
        <div scFieldErrors></div>
      </div>
      <button scButton type="submit" class="justify-self-start">Save</button>
      @if (saved()) {
        <p class="text-sm" role="status">{{ saved() }}</p>
      }
    </form>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormColorPickerDemo {
  private readonly model = signal({ color: '' });
  private readonly saved = signal('');
  private readonly brandForm = form(
    this.model,
    (s) => {
      required(s.color, { message: 'Pick a color.' });
    },
    {
      submission: {
        action: async () => this.saved.set(`Saved ${this.model().color}.`),
      },
    },
  );
}
