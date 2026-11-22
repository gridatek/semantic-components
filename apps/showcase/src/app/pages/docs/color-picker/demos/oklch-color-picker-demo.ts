import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScColorPicker,
  ScColorPickerArea,
  ScColorPickerInput,
  ScColorPickerSlider,
  ScColorPickerSwatch,
} from '@semantic-components/ui';

/** space="oklch", gamut="p3": chroma × lightness at the hue, wide colours held — past P3, the nearest it holds (data-out-of-gamut while dragging). */
@Component({
  selector: 'app-oklch-color-picker-demo',
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
        space="oklch"
        gamut="p3"
        aria-label="Color"
        class="grid gap-3"
        [(value)]="color"
      >
        <div scColorPickerArea aria-label="Chroma and lightness"></div>
        <input scColorPickerSlider="hue" aria-label="Hue" />
        <input scColorPickerSlider="alpha" aria-label="Opacity" />
        <div class="flex gap-2">
          <span scColorPickerSwatch></span>
          <input scColorPickerInput aria-label="OKLCH" />
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
export class OklchColorPickerDemo {
  private readonly color = signal('oklch(0.62 0.19 259)');
}
