import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RgbColorPickerDemo } from './rgb-color-picker-demo';

@Component({
  selector: 'app-rgb-color-picker-demo-container',
  imports: [DemoContainer, RgbColorPickerDemo],
  template: `
    <app-demo-container title="RGB Format" [code]="code">
      <app-rgb-color-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RgbColorPickerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScColorPicker,
  ScColorPickerArea,
  ScColorPickerHue,
  ScColorPickerPreview,
  ScColorPickerInput,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-rgb-color-picker-demo',
  imports: [
    ScColorPicker,
    ScColorPickerArea,
    ScColorPickerHue,
    ScColorPickerPreview,
    ScColorPickerInput,
  ],
  template: \`
    <div class="max-w-xs">
      <div
        sc-color-picker
        [(value)]="color"
        class="space-y-4 rounded-lg border p-4"
      >
        <div sc-color-picker-area></div>
        <div sc-color-picker-hue></div>
        <div class="flex items-center gap-3">
          <div sc-color-picker-preview></div>
          <input sc-color-picker-input format="rgb" class="flex-1" />
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RgbColorPickerDemo {
  readonly color = signal('#06b6d4');
}`;
}
