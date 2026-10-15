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
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-compact-color-picker-demo',
  imports: [
    ScColorPicker,
    ScColorPickerArea,
    ScColorPickerAreaSaturation,
    ScColorPickerAreaBrightness,
    ScColorPickerAreaCursor,
    ScColorPickerHue,
    ScColorPickerHueCursor,
    ScColorPickerInput,
  ],
  template: `
    <div class="max-w-[200px]">
      <div
        scColorPicker
        [(value)]="color"
        class="space-y-3 rounded-lg border p-3"
      >
        <div
          scColorPickerArea
          aria-label="Color"
          [valueText]="colorValueText"
          class="h-32"
        >
          <div scColorPickerAreaSaturation></div>
          <div scColorPickerAreaBrightness></div>
          <div scColorPickerAreaCursor></div>
        </div>
        <div scColorPickerHue aria-label="Hue">
          <div scColorPickerHueCursor></div>
        </div>
        <input scColorPickerInput aria-label="Color value" format="hex" />
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CompactColorPickerDemo {
  /** The colour area's value, as read out. */
  readonly colorValueText = (saturation: number, brightness: number) =>
    `Saturation ${saturation}%, Brightness ${brightness}%`;

  readonly color = signal('#f97316');
}
