import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScColorPicker,
  ScColorPickerArea,
  ScColorPickerAreaBrightness,
  ScColorPickerAreaCursor,
  ScColorPickerAreaSaturation,
  ScColorPickerHue,
  ScColorPickerHueCursor,
  ScColorPickerInput,
  ScColorPickerPreview,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-oklch-color-picker-demo',
  imports: [
    ScColorPicker,
    ScColorPickerArea,
    ScColorPickerAreaSaturation,
    ScColorPickerAreaBrightness,
    ScColorPickerAreaCursor,
    ScColorPickerHue,
    ScColorPickerHueCursor,
    ScColorPickerPreview,
    ScColorPickerInput,
  ],
  template: `
    <div class="max-w-xs">
      <div
        scColorPicker
        [(value)]="color"
        class="space-y-4 rounded-lg border p-4"
      >
        <div scColorPickerArea aria-label="Color" [valueText]="colorValueText">
          <div scColorPickerAreaSaturation></div>
          <div scColorPickerAreaBrightness></div>
          <div scColorPickerAreaCursor></div>
        </div>
        <div scColorPickerHue aria-label="Hue">
          <div scColorPickerHueCursor></div>
        </div>
        <div class="flex items-center gap-3">
          <div scColorPickerPreview></div>
          <input
            scColorPickerInput
            aria-label="Color value"
            format="oklch"
            class="flex-1"
          />
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export default class OklchColorPickerDemo {
  /** The colour area's value, as read out. */
  readonly colorValueText = (saturation: number, brightness: number) =>
    `Saturation ${saturation}%, Brightness ${brightness}%`;

  readonly color = signal('#6d28d9');
}
