import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScColorPickerNext,
  ScColorPickerNextArea,
  ScColorPickerNextInput,
  ScColorPickerNextSlider,
} from '@semantic-components/ui';

/** disabled: not focused, not changed. */
@Component({
  selector: 'app-disabled-color-picker-next-demo',
  imports: [
    ScColorPickerNext,
    ScColorPickerNextArea,
    ScColorPickerNextInput,
    ScColorPickerNextSlider,
  ],
  template: `
    <div class="w-64">
      <div
        scColorPickerNext
        disabled
        aria-label="Brand color"
        class="grid gap-3"
        value="#0ea5e9"
      >
        <div scColorPickerNextArea aria-label="Color"></div>
        <input scColorPickerNextSlider="hue" aria-label="Hue" />
        <input scColorPickerNextInput aria-label="Hex" />
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledColorPickerNextDemo {}
