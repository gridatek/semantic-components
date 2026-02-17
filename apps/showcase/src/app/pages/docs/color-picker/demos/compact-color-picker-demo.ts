import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScColorPicker,
  ScColorPickerArea,
  ScColorPickerHue,
  ScColorPickerInput,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-compact-color-picker-demo',
  imports: [
    ScColorPicker,
    ScColorPickerArea,
    ScColorPickerHue,
    ScColorPickerInput,
  ],
  template: `
    <div class="max-w-[200px]">
      <div
        scColorPicker
        [(value)]="color"
        class="space-y-3 rounded-lg border p-3"
      >
        <div scColorPickerArea class="h-32"></div>
        <div scColorPickerHue></div>
        <input scColorPickerInput format="hex" />
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompactColorPickerDemo {
  readonly color = signal('#f97316');
}
