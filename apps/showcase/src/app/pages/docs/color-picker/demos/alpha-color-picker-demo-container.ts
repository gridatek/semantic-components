import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AlphaColorPickerDemo } from './alpha-color-picker-demo';

@Component({
  selector: 'app-alpha-color-picker-demo-container',
  imports: [DemoContainer, AlphaColorPickerDemo],
  template: `
    <app-demo-container
      title="Alpha"
      [code]="code"
      demoUrl="/demos/color-picker/alpha-color-picker-demo"
    >
      <app-alpha-color-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AlphaColorPickerDemoContainer {
  readonly code = `import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScColorPicker,
  ScColorPickerArea,
  ScColorPickerField,
  ScColorPickerSlider,
  ScColorPickerSwatch,
} from '@semantic-components/ui-lab';

/** An opacity slider, on a checkerboard; the value carries it — #rrggbbaa, or rgb(… / a). */
@Component({
  selector: 'app-alpha-color-picker-demo',
  imports: [
    DecimalPipe,
    ScColorPicker,
    ScColorPickerArea,
    ScColorPickerSlider,
    ScColorPickerSwatch,
    ScColorPickerField,
  ],
  template: \`
    <div
      scColorPicker
      #picker="scColorPicker"
      [(value)]="color"
      class="w-64 space-y-3"
    >
      <div
        scColorPickerArea
        aria-label="Saturation and brightness"
        [attr.aria-valuetext]="
          'Saturation ' +
          (picker.hsva().s | number: '1.0-0') +
          '%, brightness ' +
          (picker.hsva().v | number: '1.0-0') +
          '%'
        "
      ></div>
      <input scColorPickerSlider="hue" aria-label="Hue" />
      <input scColorPickerSlider="alpha" aria-label="Opacity" />
      <div class="flex items-center gap-2">
        <span scColorPickerSwatch></span>
        <input scColorPickerField aria-label="Colour" />
      </div>
    </div>
    <pre class="bg-muted w-64 rounded-md p-3 text-xs">{{ color() }}</pre>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class AlphaColorPickerDemo {
  readonly color = signal('#8b5cf680');
}`;
}
