import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScColorPicker,
  ScColorPickerArea,
  ScColorPickerInput,
  ScColorPickerSlider,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
} from '@semantic-components/ui';

/** In a popover: the trigger shows the colour; the picker inside edits it. */
@Component({
  selector: 'app-popover-color-picker-demo',
  imports: [
    ScButton,
    ScColorPicker,
    ScColorPickerArea,
    ScColorPickerInput,
    ScColorPickerSlider,
    ScPopover,
    ScPopoverPortal,
    ScPopoverProvider,
    ScPopoverTrigger,
  ],
  template: `
    <div scPopoverProvider alignment="start">
      <button scButton scPopoverTrigger variant="outline">
        <span
          class="size-4 rounded-sm border"
          [style.background]="color()"
        ></span>
        Brand color
      </button>
      <ng-template scPopoverPortal>
        <div scPopover class="w-64">
          <div
            scColorPicker
            aria-label="Brand color"
            class="grid gap-3"
            [(value)]="color"
          >
            <div scColorPickerArea aria-label="Color"></div>
            <input scColorPickerSlider="hue" aria-label="Hue" />
            <input scColorPickerInput aria-label="Hex" />
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PopoverColorPickerDemo {
  private readonly color = signal('#8b5cf6');
}
