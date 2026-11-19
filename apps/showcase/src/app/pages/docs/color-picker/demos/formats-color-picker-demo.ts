import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  type ScColorFormat,
  ScColorPicker,
  ScColorPickerArea,
  ScColorPickerInput,
  ScColorPickerSlider,
  ScColorPickerSwatch,
  ScField,
  ScRadio,
  ScRadioGroup,
} from '@semantic-components/ui';

/** The value in hex, rgb(), hsl() or oklch() — the format is an input; changed, the value is written again. */
@Component({
  selector: 'app-formats-color-picker-demo',
  imports: [
    DecimalPipe,
    ScColorPicker,
    ScColorPickerArea,
    ScColorPickerSlider,
    ScColorPickerSwatch,
    ScColorPickerInput,
    ScRadioGroup,
    ScRadio,
    FormField,
    ScField,
  ],
  template: `
    <div class="flex items-center gap-4 text-sm">
      <span id="format-label" class="text-muted-foreground">Format:</span>
      <div
        scRadioGroup
        [formField]="settingsForm.format"
        orientation="horizontal"
        aria-labelledby="format-label"
      >
        @for (format of formats; track format) {
          <label scField orientation="horizontal">
            <input scRadio [value]="format" />
            {{ format }}
          </label>
        }
      </div>
    </div>
    <div
      scColorPicker
      #picker="scColorPicker"
      [(value)]="color"
      [format]="settings().format"
      class="w-64 space-y-3"
    >
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
      <input scColorPickerSlider="alpha" aria-label="Opacity" />
      <div class="flex items-center gap-2">
        <span scColorPickerSwatch></span>
        <input scColorPickerInput aria-label="Colour" />
      </div>
    </div>
    <pre class="bg-muted w-64 rounded-md p-3 text-xs">{{ color() }}</pre>
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FormatsColorPickerDemo {
  private readonly formats = ['hex', 'rgb', 'hsl', 'oklch'] as const;
  private readonly settings = signal<{ format: ScColorFormat }>({
    format: 'oklch',
  });
  private readonly settingsForm = form(this.settings);
  private readonly color = signal('oklch(62.3% 0.214 259.8)');
}
