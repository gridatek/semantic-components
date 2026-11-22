import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScColorPickerNext,
  ScColorPickerNextArea,
  ScColorPickerNextInput,
  ScColorPickerNextSlider,
  ScColorPickerNextSwatch,
} from '@semantic-components/ui';

/** A brand colour: the area (saturation × brightness), the hue, the colour as text — any CSS colour typed, taken on Enter. */
@Component({
  selector: 'app-color-picker-next-usage-demo',
  imports: [
    ScColorPickerNext,
    ScColorPickerNextArea,
    ScColorPickerNextInput,
    ScColorPickerNextSlider,
    ScColorPickerNextSwatch,
  ],
  template: `
    <div class="grid w-64 gap-3">
      <div
        scColorPickerNext
        aria-label="Brand color"
        class="grid gap-3"
        [(value)]="color"
      >
        <div scColorPickerNextArea aria-label="Color"></div>
        <input scColorPickerNextSlider="hue" aria-label="Hue" />
        <div class="flex gap-2">
          <span scColorPickerNextSwatch></span>
          <input scColorPickerNextInput aria-label="Hex" />
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
export class ColorPickerNextUsageDemo {
  private readonly color = signal('#0ea5e9');
}
