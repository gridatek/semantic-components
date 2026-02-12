import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { EyedropperColorPickerDemo } from './eyedropper-color-picker-demo';

@Component({
  selector: 'app-eyedropper-color-picker-demo-container',
  imports: [DemoContainer, EyedropperColorPickerDemo],
  template: `
    <app-demo-container title="Eye Dropper" [code]="code">
      <app-eyedropper-color-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EyedropperColorPickerDemoContainer {
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
  ScColorPickerEyeDropper,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-eyedropper-color-picker-demo',
  imports: [
    ScColorPicker,
    ScColorPickerArea,
    ScColorPickerHue,
    ScColorPickerPreview,
    ScColorPickerInput,
    ScColorPickerEyeDropper,
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
          <input sc-color-picker-input format="hex" class="flex-1" />
          <button sc-color-picker-eyedropper></button>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EyedropperColorPickerDemo {
  readonly color = signal('#8b5cf6');
}`;
}
