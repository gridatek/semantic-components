import { Component, ViewEncapsulation, signal } from '@angular/core';
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
  template: `
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlyColorPickerNextDemo {
  private readonly color = signal('#22c55e');
}
