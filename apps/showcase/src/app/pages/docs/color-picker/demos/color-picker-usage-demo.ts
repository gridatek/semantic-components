import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScColorPicker,
  ScColorPickerArea,
  ScColorPickerInput,
  ScColorPickerSlider,
  ScColorPickerSwatch,
} from '@semantic-components/ui';

/** A brand colour: the area (saturation × brightness), the hue, the colour as text — any CSS colour typed, taken on Enter. */
@Component({
  selector: 'app-color-picker-usage-demo',
  imports: [
    ScColorPicker,
    ScColorPickerArea,
    ScColorPickerInput,
    ScColorPickerSlider,
    ScColorPickerSwatch,
  ],
  template: `
    <div class="grid w-64 gap-3">
      <div
        scColorPicker
        aria-label="Brand color"
        class="grid gap-3"
        [(value)]="color"
      >
        <div scColorPickerArea aria-label="Color"></div>
        <input scColorPickerSlider="hue" aria-label="Hue" />
        <div class="flex gap-2">
          <span scColorPickerSwatch></span>
          <input scColorPickerInput aria-label="Hex" />
        </div>
      </div>
      <p class="text-muted-foreground font-mono text-xs" data-testid="picked">
        {{ color() }}
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ColorPickerUsageDemo {
  private readonly color = signal('#0ea5e9');
}
