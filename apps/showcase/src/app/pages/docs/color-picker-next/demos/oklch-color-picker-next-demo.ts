import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScColorPickerNext,
  ScColorPickerNextArea,
  ScColorPickerNextInput,
  ScColorPickerNextSlider,
  ScColorPickerNextSwatch,
} from '@semantic-components/ui';

/** space="oklch", gamut="p3": chroma × lightness at the hue, wide colours held — past P3, the nearest it holds (data-out-of-gamut while dragging). */
@Component({
  selector: 'app-oklch-color-picker-next-demo',
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
        space="oklch"
        gamut="p3"
        aria-label="Color"
        class="grid gap-3"
        [(value)]="color"
      >
        <div scColorPickerNextArea aria-label="Chroma and lightness"></div>
        <input scColorPickerNextSlider="hue" aria-label="Hue" />
        <input scColorPickerNextSlider="alpha" aria-label="Opacity" />
        <div class="flex gap-2">
          <span scColorPickerNextSwatch></span>
          <input scColorPickerNextInput aria-label="OKLCH" />
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
export class OklchColorPickerNextDemo {
  private readonly color = signal('oklch(0.62 0.19 259)');
}
