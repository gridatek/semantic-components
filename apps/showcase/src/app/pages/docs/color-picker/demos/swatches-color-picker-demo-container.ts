import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SwatchesColorPickerDemo } from './swatches-color-picker-demo';

@Component({
  selector: 'app-swatches-color-picker-demo-container',
  imports: [DemoContainer, SwatchesColorPickerDemo],
  template: `
    <app-demo-container title="With Swatches" [code]="code">
      <app-swatches-color-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SwatchesColorPickerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScColorPicker,
  ScColorPickerArea,
  ScColorPickerAreaBrightness,
  ScColorPickerAreaCursor,
  ScColorPickerAreaSaturation,
  ScColorPickerHue,
  ScColorPickerHueCursor,
  ScColorPickerInput,
  ScColorPickerPreview,
  ScColorPickerSwatch,
  ScColorPickerSwatches,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-swatches-color-picker-demo',
  imports: [
    ScColorPicker,
    ScColorPickerArea,
    ScColorPickerAreaSaturation,
    ScColorPickerAreaBrightness,
    ScColorPickerAreaCursor,
    ScColorPickerHue,
    ScColorPickerHueCursor,
    ScColorPickerPreview,
    ScColorPickerInput,
    ScColorPickerSwatches,
    ScColorPickerSwatch,
  ],
  template: \`
    <div class="max-w-xs">
      <div
        scColorPicker
        [(value)]="color"
        class="space-y-4 rounded-lg border p-4"
      >
        <div scColorPickerArea>
          <div scColorPickerAreaSaturation></div>
          <div scColorPickerAreaBrightness></div>
          <div scColorPickerAreaCursor></div>
        </div>
        <div scColorPickerHue>
          <div scColorPickerHueCursor></div>
        </div>
        <div scColorPickerSwatches #swatches="scColorPickerSwatches">
          @for (c of swatches.colors(); track c) {
            <button scColorPickerSwatch [color]="c">
              <span class="sr-only">Select color {{ c }}</span>
            </button>
          }
        </div>
        <div class="flex items-center gap-3">
          <div scColorPickerPreview></div>
          <input scColorPickerInput format="hex" class="flex-1" />
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SwatchesColorPickerDemo {
  readonly color = signal('#22c55e');
}`;
}
