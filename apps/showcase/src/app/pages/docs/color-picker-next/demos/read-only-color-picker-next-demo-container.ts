import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ReadOnlyColorPickerNextDemo } from './read-only-color-picker-next-demo';

@Component({
  selector: 'app-read-only-color-picker-next-demo-container',
  imports: [DemoContainer, ReadOnlyColorPickerNextDemo],
  template: `
    <app-demo-container
      title="Read-only"
      [code]="code"
      demoUrl="/demos/color-picker-next/read-only-color-picker-next-demo"
    >
      <app-read-only-color-picker-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlyColorPickerNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScColorPickerNext,
  ScColorPickerNextArea,
  ScColorPickerNextInput,
  ScColorPickerNextSwatch,
} from '@semantic-components/ui';

/** readonly: focusable, its value read — not changed. */
@Component({
  selector: 'app-read-only-color-picker-next-demo',
  imports: [
    ScColorPickerNext,
    ScColorPickerNextArea,
    ScColorPickerNextInput,
    ScColorPickerNextSwatch,
  ],
  template: \`
    <div class="grid w-64 gap-2">
      <div
        scColorPickerNext
        readonly
        aria-label="Brand color"
        class="grid gap-3"
        [(value)]="color"
      >
        <div scColorPickerNextArea aria-label="Color"></div>
        <div class="flex gap-2">
          <span scColorPickerNextSwatch></span>
          <input scColorPickerNextInput aria-label="Hex" />
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
export class ReadOnlyColorPickerNextDemo {
  private readonly color = signal('#22c55e');
}`;
}
