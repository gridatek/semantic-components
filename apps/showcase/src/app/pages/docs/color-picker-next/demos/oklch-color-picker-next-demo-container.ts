import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { OklchColorPickerNextDemo } from './oklch-color-picker-next-demo';

@Component({
  selector: 'app-oklch-color-picker-next-demo-container',
  imports: [DemoContainer, OklchColorPickerNextDemo],
  template: `
    <app-demo-container
      title="OKLCH"
      [code]="code"
      demoUrl="/demos/color-picker-next/oklch-color-picker-next-demo"
    >
      <app-oklch-color-picker-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class OklchColorPickerNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
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
  template: \`
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class OklchColorPickerNextDemo {
  private readonly color = signal('oklch(0.62 0.19 259)');
}`;
}
