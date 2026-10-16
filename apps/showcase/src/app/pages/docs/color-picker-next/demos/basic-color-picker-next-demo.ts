import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScColorPickerNext,
  ScColorPickerNextArea,
  ScColorPickerNextField,
  ScColorPickerNextSlider,
  ScColorPickerNextSwatch,
} from '@semantic-components/ui-lab';

/** The area (saturation and brightness), the hue, the colour and its field. The field takes any CSS colour — try a name, or oklch(). */
@Component({
  selector: 'app-basic-color-picker-next-demo',
  imports: [
    DecimalPipe,
    ScColorPickerNext,
    ScColorPickerNextArea,
    ScColorPickerNextSlider,
    ScColorPickerNextSwatch,
    ScColorPickerNextField,
  ],
  template: `
    <div
      scColorPickerNext
      #picker="scColorPickerNext"
      [(value)]="color"
      class="w-64 space-y-3"
    >
      <div
        scColorPickerNextArea
        aria-label="Saturation and brightness"
        [attr.aria-valuetext]="
          'Saturation ' +
          (picker.hsva().s | number: '1.0-0') +
          '%, brightness ' +
          (picker.hsva().v | number: '1.0-0') +
          '%'
        "
      ></div>
      <input scColorPickerNextSlider="hue" aria-label="Hue" />
      <div class="flex items-center gap-2">
        <span scColorPickerNextSwatch></span>
        <input scColorPickerNextField aria-label="Colour" />
      </div>
    </div>
    <pre class="bg-muted w-64 rounded-md p-3 text-xs">{{ color() }}</pre>
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicColorPickerNextDemo {
  readonly color = signal('#3b82f6');
}
