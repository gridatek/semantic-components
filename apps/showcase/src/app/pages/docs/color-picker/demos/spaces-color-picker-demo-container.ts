import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SpacesColorPickerDemo } from './spaces-color-picker-demo';

@Component({
  selector: 'app-spaces-color-picker-demo-container',
  imports: [DemoContainer, SpacesColorPickerDemo],
  template: `
    <app-demo-container
      title="Spaces and channels"
      [code]="code"
      demoUrl="/demos/color-picker/spaces-color-picker-demo"
    >
      <app-spaces-color-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SpacesColorPickerDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScColorPicker,
  ScColorPickerArea,
  ScColorPickerInput,
  ScColorPickerSlider,
} from '@semantic-components/ui';

/** space="hsl": the area hue × lightness (painted on a canvas), saturation on a vertical slider; written as hsl(). */
@Component({
  selector: 'app-spaces-color-picker-demo',
  imports: [
    ScColorPicker,
    ScColorPickerArea,
    ScColorPickerInput,
    ScColorPickerSlider,
  ],
  template: \`
    <div class="grid w-72 gap-3">
      <div
        scColorPicker
        space="hsl"
        aria-label="Accent"
        class="grid gap-3"
        [(value)]="color"
      >
        <div class="flex h-48 gap-3">
          <div
            scColorPickerArea
            x="hue"
            y="lightness"
            aria-label="Hue and lightness"
            class="aspect-auto h-full"
          ></div>
          <input
            scColorPickerSlider="saturation"
            orientation="vertical"
            aria-label="Saturation"
          />
        </div>
        <input scColorPickerInput aria-label="HSL" />
      </div>
      <p class="text-muted-foreground font-mono text-xs" data-testid="picked">
        {{ color() }}
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SpacesColorPickerDemo {
  private readonly color = signal('hsl(200 80% 50%)');
}`;
}
