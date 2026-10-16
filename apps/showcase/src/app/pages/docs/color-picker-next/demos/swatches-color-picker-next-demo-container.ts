import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SwatchesColorPickerNextDemo } from './swatches-color-picker-next-demo';

@Component({
  selector: 'app-swatches-color-picker-next-demo-container',
  imports: [DemoContainer, SwatchesColorPickerNextDemo],
  template: `
    <app-demo-container
      title="Swatches"
      [code]="code"
      demoUrl="/demos/color-picker-next/swatches-color-picker-next-demo"
    >
      <app-swatches-color-picker-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SwatchesColorPickerNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScColorPickerNext,
  ScColorPickerNextEyeDropper,
  ScColorPickerNextField,
  ScColorPickerNextOption,
  ScColorPickerNextSwatch,
  ScColorPickerNextSwatches,
} from '@semantic-components/ui-lab';
import { SiPipetteIcon } from '@semantic-icons/lucide-icons';

/** Preset colours, a radio group — the arrows move and choose; the one that is the colour is checked. Where the browser can, pick from the screen. */
@Component({
  selector: 'app-swatches-color-picker-next-demo',
  imports: [
    ScColorPickerNext,
    ScColorPickerNextSwatches,
    ScColorPickerNextOption,
    ScColorPickerNextSwatch,
    ScColorPickerNextField,
    ScColorPickerNextEyeDropper,
    SiPipetteIcon,
  ],
  template: \`
    <div
      scColorPickerNext
      #picker="scColorPickerNext"
      [(value)]="color"
      class="w-64 space-y-3"
    >
      <div scColorPickerNextSwatches aria-label="Presets">
        @for (preset of presets; track preset.color) {
          <button [scColorPickerNextOption]="preset.color">
            <span class="sr-only">{{ preset.name }}</span>
          </button>
        }
      </div>
      <div class="flex items-center gap-2">
        <span scColorPickerNextSwatch></span>
        <input scColorPickerNextField aria-label="Colour" />
        @if (picker.canPickFromScreen()) {
          <button scColorPickerNextEyeDropper>
            <svg siPipetteIcon></svg>
            <span class="sr-only">Pick from screen</span>
          </button>
        }
      </div>
    </div>
    <pre class="bg-muted w-64 rounded-md p-3 text-xs">{{ color() }}</pre>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class SwatchesColorPickerNextDemo {
  readonly color = signal('#22c55e');
  readonly presets = [
    { color: '#e11d48', name: 'Rose' },
    { color: '#f97316', name: 'Orange' },
    { color: '#eab308', name: 'Yellow' },
    { color: '#22c55e', name: 'Green' },
    { color: '#06b6d4', name: 'Cyan' },
    { color: '#3b82f6', name: 'Blue' },
    { color: '#8b5cf6', name: 'Violet' },
    { color: '#18181b', name: 'Black' },
  ];
}`;
}
