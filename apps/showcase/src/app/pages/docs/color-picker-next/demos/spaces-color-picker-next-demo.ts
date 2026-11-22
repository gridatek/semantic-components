import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScColorPickerNext,
  ScColorPickerNextArea,
  ScColorPickerNextInput,
  ScColorPickerNextSlider,
} from '@semantic-components/ui';

/** space="hsl": the area hue × lightness (painted on a canvas), saturation on a vertical slider; written as hsl(). */
@Component({
  selector: 'app-spaces-color-picker-next-demo',
  imports: [
    ScColorPickerNext,
    ScColorPickerNextArea,
    ScColorPickerNextInput,
    ScColorPickerNextSlider,
  ],
  template: `
    <div class="grid w-72 gap-3">
      <div
        scColorPickerNext
        space="hsl"
        aria-label="Accent"
        class="grid gap-3"
        [(value)]="color"
      >
        <div class="flex h-48 gap-3">
          <div
            scColorPickerNextArea
            x="hue"
            y="lightness"
            aria-label="Hue and lightness"
            class="aspect-auto h-full"
          ></div>
          <input
            scColorPickerNextSlider="saturation"
            orientation="vertical"
            aria-label="Saturation"
          />
        </div>
        <input scColorPickerNextInput aria-label="HSL" />
      </div>
      <p class="text-muted-foreground font-mono text-xs" data-testid="picked">
        {{ color() }}
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SpacesColorPickerNextDemo {
  private readonly color = signal('hsl(200 80% 50%)');
}
