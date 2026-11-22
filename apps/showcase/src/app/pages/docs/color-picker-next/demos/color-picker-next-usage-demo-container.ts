import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ColorPickerNextUsageDemo } from './color-picker-next-usage-demo';

@Component({
  selector: 'app-color-picker-next-usage-demo-container',
  imports: [DemoContainer, ColorPickerNextUsageDemo],
  template: `
    <app-demo-container
      title="Usage"
      [code]="code"
      demoUrl="/demos/color-picker-next/color-picker-next-usage-demo"
    >
      <app-color-picker-next-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ColorPickerNextUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
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
  template: \`
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ColorPickerNextUsageDemo {
  private readonly color = signal('#0ea5e9');
}`;
}
