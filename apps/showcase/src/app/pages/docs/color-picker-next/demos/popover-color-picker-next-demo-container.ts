import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PopoverColorPickerNextDemo } from './popover-color-picker-next-demo';

@Component({
  selector: 'app-popover-color-picker-next-demo-container',
  imports: [DemoContainer, PopoverColorPickerNextDemo],
  template: `
    <app-demo-container
      title="In a popover"
      [code]="code"
      demoUrl="/demos/color-picker-next/popover-color-picker-next-demo"
    >
      <app-popover-color-picker-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PopoverColorPickerNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScColorPickerNext,
  ScColorPickerNextArea,
  ScColorPickerNextInput,
  ScColorPickerNextSlider,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
} from '@semantic-components/ui';

/** In a popover: the trigger shows the colour; the picker inside edits it. */
@Component({
  selector: 'app-popover-color-picker-next-demo',
  imports: [
    ScButton,
    ScColorPickerNext,
    ScColorPickerNextArea,
    ScColorPickerNextInput,
    ScColorPickerNextSlider,
    ScPopover,
    ScPopoverPortal,
    ScPopoverProvider,
    ScPopoverTrigger,
  ],
  template: \`
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
            scColorPickerNext
            aria-label="Brand color"
            class="grid gap-3"
            [(value)]="color"
          >
            <div scColorPickerNextArea aria-label="Color"></div>
            <input scColorPickerNextSlider="hue" aria-label="Hue" />
            <input scColorPickerNextInput aria-label="Hex" />
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PopoverColorPickerNextDemo {
  private readonly color = signal('#8b5cf6');
}`;
}
