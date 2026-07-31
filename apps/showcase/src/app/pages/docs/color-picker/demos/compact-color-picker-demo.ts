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
        <div scColorPickerArea class="h-32">
          <div scColorPickerAreaSaturation></div>
          <div scColorPickerAreaBrightness></div>
          <div scColorPickerAreaCursor></div>
        </div>
        <div scColorPickerHue>
          <div scColorPickerHueCursor></div>
        </div>
        <input scColorPickerInput format="hex" />
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CompactColorPickerDemo {
  readonly color = signal('#f97316');
}
