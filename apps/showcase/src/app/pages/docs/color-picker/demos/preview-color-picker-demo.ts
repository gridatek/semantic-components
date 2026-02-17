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
  ScColorPickerPreview,
  ScColorPickerInput,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-preview-color-picker-demo',
  imports: [
    ScColorPicker,
    ScColorPickerArea,
    ScColorPickerHue,
    ScColorPickerPreview,
    ScColorPickerInput,
  ],
  template: `
    <div class="flex flex-col md:flex-row gap-6">
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
          </div>
        </div>
      </div>
      <div class="flex gap-4">
        <div
          class="flex h-24 w-32 items-center justify-center rounded-lg text-white shadow-lg"
          [style.background-color]="color()"
        >
          <span class="text-sm font-medium drop-shadow">Preview</span>
        </div>
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <div
              class="size-4 rounded"
              [style.background-color]="color()"
            ></div>
            <span class="font-mono text-sm">{{ color() }}</span>
          </div>
          <p class="text-sm text-muted-foreground">
            Use the picker to change this color
          </p>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewColorPickerDemo {
  readonly color = signal('#3b82f6');
}
