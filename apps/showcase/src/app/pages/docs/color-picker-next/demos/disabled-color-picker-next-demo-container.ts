import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledColorPickerNextDemo } from './disabled-color-picker-next-demo';

@Component({
  selector: 'app-disabled-color-picker-next-demo-container',
  imports: [DemoContainer, DisabledColorPickerNextDemo],
  template: `
    <app-demo-container
      title="Disabled"
      [code]="code"
      demoUrl="/demos/color-picker-next/disabled-color-picker-next-demo"
    >
      <app-disabled-color-picker-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledColorPickerNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScColorPickerNext,
  ScColorPickerNextArea,
  ScColorPickerNextInput,
  ScColorPickerNextSlider,
} from '@semantic-components/ui';

/** disabled: not focused, not changed. */
@Component({
  selector: 'app-disabled-color-picker-next-demo',
  imports: [
    ScColorPickerNext,
    ScColorPickerNextArea,
    ScColorPickerNextInput,
    ScColorPickerNextSlider,
  ],
  template: \`
    <div class="w-64">
      <div
        scColorPickerNext
        disabled
        aria-label="Brand color"
        class="grid gap-3"
        value="#0ea5e9"
      >
        <div scColorPickerNextArea aria-label="Color"></div>
        <input scColorPickerNextSlider="hue" aria-label="Hue" />
        <input scColorPickerNextInput aria-label="Hex" />
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledColorPickerNextDemo {}`;
}
