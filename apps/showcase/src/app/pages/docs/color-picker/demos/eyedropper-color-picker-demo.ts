import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScColorPicker,
  ScColorPickerArea,
  ScColorPickerEyeDropper,
  ScColorPickerHue,
  ScColorPickerInput,
  ScColorPickerPreview,
} from '@semantic-components/ui-lab';
import { SiPipetteIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-eyedropper-color-picker-demo',
  imports: [
    ScColorPicker,
    ScColorPickerArea,
    ScColorPickerHue,
    ScColorPickerPreview,
    ScColorPickerInput,
    ScColorPickerEyeDropper,
    SiPipetteIcon,
  ],
  template: `
    <div class="max-w-xs">
      <div
        scColorPicker
        [(value)]="color"
        class="space-y-4 rounded-lg border p-4"
      >
        <div scColorPickerArea></div>
        <div scColorPickerHue></div>
        <div class="flex items-center gap-3">
          <div scColorPickerPreview></div>
          <input scColorPickerInput format="hex" class="flex-1" />
          <button scColorPickerEyedropper>
            <svg siPipetteIcon class="size-4"></svg>
            <span class="sr-only">Pick color from screen</span>
          </button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EyedropperColorPickerDemo {
  readonly color = signal('#8b5cf6');
}
