import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormatsColorPickerDemo } from './formats-color-picker-demo';

@Component({
  selector: 'app-formats-color-picker-demo-container',
  imports: [DemoContainer, FormatsColorPickerDemo],
  template: `
    <app-demo-container
      title="Formats"
      [code]="code"
      demoUrl="/demos/color-picker/formats-color-picker-demo"
    >
      <app-formats-color-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormatsColorPickerDemoContainer {
  readonly code = `import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  type ScColorFormat,
  ScColorPicker,
  ScColorPickerArea,
  ScColorPickerField,
  ScColorPickerSlider,
  ScColorPickerSwatch,
  ScRadio,
  ScRadioField,
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
    ScColorPickerField,
    ScRadioGroup,
    ScRadioField,
    ScRadio,
    FormField,
  ],
  template: \`
    <div class="flex items-center gap-4 text-sm">
      <span id="format-label" class="text-muted-foreground">Format:</span>
      <div scRadioGroup orientation="horizontal" aria-labelledby="format-label">
        @for (format of formats; track format) {
          <label scRadioField>
            <input
              type="radio"
              scRadio
              [value]="format"
              [formField]="settingsForm.format"
            />
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
        <input scColorPickerField aria-label="Colour" />
      </div>
    </div>
    <pre class="bg-muted w-64 rounded-md p-3 text-xs">{{ color() }}</pre>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FormatsColorPickerDemo {
  readonly formats = ['hex', 'rgb', 'hsl', 'oklch'] as const;
  readonly settings = signal<{ format: ScColorFormat }>({ format: 'oklch' });
  readonly settingsForm = form(this.settings);
  readonly color = signal('oklch(62.3% 0.214 259.8)');
}`;
}
