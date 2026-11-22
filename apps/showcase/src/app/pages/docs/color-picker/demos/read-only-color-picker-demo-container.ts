import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ReadOnlyColorPickerDemo } from './read-only-color-picker-demo';

@Component({
  selector: 'app-read-only-color-picker-demo-container',
  imports: [DemoContainer, ReadOnlyColorPickerDemo],
  template: `
    <app-demo-container
      title="Read-only"
      [code]="code"
      demoUrl="/demos/color-picker/read-only-color-picker-demo"
    >
      <app-read-only-color-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlyColorPickerDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScColorPicker,
  ScColorPickerArea,
  ScColorPickerInput,
  ScColorPickerSwatch,
} from '@semantic-components/ui';

/** readonly: focusable, its value read — not changed. */
@Component({
  selector: 'app-read-only-color-picker-demo',
  imports: [
    ScColorPicker,
    ScColorPickerArea,
    ScColorPickerInput,
    ScColorPickerSwatch,
  ],
  template: \`
    <div class="grid w-64 gap-2">
      <div
        scColorPicker
        readonly
        aria-label="Brand color"
        class="grid gap-3"
        [(value)]="color"
      >
        <div scColorPickerArea aria-label="Color"></div>
        <div class="flex gap-2">
          <span scColorPickerSwatch></span>
          <input scColorPickerInput aria-label="Hex" />
        </div>
      </div>
      <p class="text-muted-foreground font-mono text-xs" data-testid="picked">
        {{ color() }}
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlyColorPickerDemo {
  private readonly color = signal('#22c55e');
}`;
}
