import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScColorPicker,
  ScColorPickerArea,
  ScColorPickerInput,
  ScColorPickerSlider,
} from '@semantic-components/ui';

/** disabled: not focused, not changed. */
@Component({
  selector: 'app-disabled-color-picker-demo',
  imports: [
    ScColorPicker,
    ScColorPickerArea,
    ScColorPickerInput,
    ScColorPickerSlider,
  ],
  template: `
    <div class="w-64">
      <div
        scColorPicker
        disabled
        aria-label="Brand color"
        class="grid gap-3"
        value="#0ea5e9"
      >
        <div scColorPickerArea aria-label="Color"></div>
        <input scColorPickerSlider="hue" aria-label="Hue" />
        <input scColorPickerInput aria-label="Hex" />
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledColorPickerDemo {}
