import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AlphaColorPickerNextDemo } from './alpha-color-picker-next-demo';

@Component({
  selector: 'app-alpha-color-picker-next-demo-container',
  imports: [DemoContainer, AlphaColorPickerNextDemo],
  template: `
    <app-demo-container
      title="Alpha"
      [code]="code"
      demoUrl="/demos/color-picker-next/alpha-color-picker-next-demo"
    >
      <app-alpha-color-picker-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AlphaColorPickerNextDemoContainer {
  readonly code = `import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScColorPickerNext,
  ScColorPickerNextArea,
  ScColorPickerNextField,
  ScColorPickerNextSlider,
  ScColorPickerNextSwatch,
} from '@semantic-components/ui-lab';

/** An opacity slider, on a checkerboard; the value carries it — #rrggbbaa, or rgb(… / a). */
@Component({
  selector: 'app-alpha-color-picker-next-demo',
  imports: [
    DecimalPipe,
    ScColorPickerNext,
    ScColorPickerNextArea,
    ScColorPickerNextSlider,
    ScColorPickerNextSwatch,
    ScColorPickerNextField,
  ],
  template: \`
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
      <input scColorPickerNextSlider="alpha" aria-label="Opacity" />
      <div class="flex items-center gap-2">
        <span scColorPickerNextSwatch></span>
        <input scColorPickerNextField aria-label="Colour" />
      </div>
    </div>
    <pre class="bg-muted w-64 rounded-md p-3 text-xs">{{ color() }}</pre>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class AlphaColorPickerNextDemo {
  readonly color = signal('#8b5cf680');
}`;
}
