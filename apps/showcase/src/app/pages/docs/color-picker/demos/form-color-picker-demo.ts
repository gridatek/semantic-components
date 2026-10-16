import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScButton,
  ScField,
  ScFieldErrors,
  ScLabel,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
} from '@semantic-components/ui';
import {
  ScColorPicker,
  ScColorPickerArea,
  ScColorPickerField,
  ScColorPickerOption,
  ScColorPickerSlider,
  ScColorPickerSwatch,
  ScColorPickerSwatches,
} from '@semantic-components/ui-lab';

/** A [formField]: the trigger shows the colour, the picker opens in a popover; required in the schema. */
@Component({
  selector: 'app-form-color-picker-demo',
  imports: [
    DecimalPipe,
    ScColorPicker,
    ScColorPickerArea,
    ScColorPickerSlider,
    ScColorPickerSwatch,
    ScColorPickerField,
    ScColorPickerSwatches,
    ScColorPickerOption,
    ScButton,
    ScField,
    ScLabel,
    ScFieldErrors,
    ScPopoverProvider,
    ScPopoverTrigger,
    ScPopoverPortal,
    ScPopover,
    FormField,
    FormRoot,
  ],
  template: `
    <form [formRoot]="themeForm" class="w-72 space-y-4">
      <div scField>
        <label scLabel for="brand-colour">Brand colour</label>
        <div
          scColorPicker
          #picker="scColorPicker"
          [formField]="themeForm.brand"
        >
          <div scPopoverProvider>
            <button
              id="brand-colour"
              scButton
              scPopoverTrigger
              variant="outline"
              class="w-full justify-start font-mono"
            >
              <span scColorPickerSwatch class="size-5 rounded-sm"></span>
              {{ model().brand || 'Choose a colour' }}
            </button>
            <ng-template scPopoverPortal>
              <div scPopover class="w-64 space-y-3">
                <div
                  scColorPickerArea
                  aria-label="Saturation and brightness"
                  [attr.aria-valuetext]="
                    'Saturation ' +
                    (picker.hsva().s | number: '1.0-0') +
                    '%, brightness ' +
                    (picker.hsva().v | number: '1.0-0') +
                    '%'
                  "
                ></div>
                <input scColorPickerSlider="hue" aria-label="Hue" />
                <div scColorPickerSwatches aria-label="Presets">
                  @for (preset of presets; track preset.color) {
                    <button [scColorPickerOption]="preset.color">
                      <span class="sr-only">{{ preset.name }}</span>
                    </button>
                  }
                </div>
                <input scColorPickerField aria-label="Colour" />
              </div>
            </ng-template>
          </div>
        </div>
        <p scFieldErrors></p>
      </div>
      <button scButton type="submit">Save</button>
      @if (saved()) {
        <p class="text-muted-foreground text-sm" role="status">
          Saved: {{ model().brand }}
        </p>
      }
    </form>
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FormColorPickerDemo {
  readonly model = signal({ brand: '' });
  readonly saved = signal(false);
  readonly themeForm = form(
    this.model,
    (path) => required(path.brand, { message: 'Choose a colour.' }),
    { submission: { action: async () => this.saved.set(true) } },
  );
  readonly presets = [
    { color: '#e11d48', name: 'Rose' },
    { color: '#f97316', name: 'Orange' },
    { color: '#eab308', name: 'Yellow' },
    { color: '#22c55e', name: 'Green' },
    { color: '#06b6d4', name: 'Cyan' },
    { color: '#3b82f6', name: 'Blue' },
    { color: '#8b5cf6', name: 'Violet' },
    { color: '#18181b', name: 'Black' },
  ];
}
