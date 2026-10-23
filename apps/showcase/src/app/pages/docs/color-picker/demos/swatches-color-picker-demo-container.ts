import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SwatchesColorPickerDemo } from './swatches-color-picker-demo';

@Component({
  selector: 'app-swatches-color-picker-demo-container',
  imports: [DemoContainer, SwatchesColorPickerDemo],
  template: `
    <app-demo-container
      title="Swatches"
      [code]="code"
      demoUrl="/demos/color-picker/swatches-color-picker-demo"
    >
      <app-swatches-color-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SwatchesColorPickerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScColorPicker,
  ScColorPickerEyeDropper,
  ScColorPickerField,
  ScColorPickerOption,
  ScColorPickerSwatch,
  ScColorPickerSwatches,
} from '@semantic-components/ui';
import { SiPipetteIcon } from '@semantic-icons/lucide-icons';

/** Preset colours, a radio group — the arrows move and choose; the one that is the colour is checked. Where the browser can, pick from the screen. */
@Component({
  selector: 'app-swatches-color-picker-demo',
  imports: [
    ScColorPicker,
    ScColorPickerSwatches,
    ScColorPickerOption,
    ScColorPickerSwatch,
    ScColorPickerField,
    ScColorPickerEyeDropper,
    SiPipetteIcon,
  ],
  template: \`
    <div
      scColorPicker
      #picker="scColorPicker"
      [(value)]="color"
      class="w-64 space-y-3"
    >
      <div scColorPickerSwatches aria-label="Presets">
        @for (preset of presets; track preset.color) {
          <button [scColorPickerOption]="preset.color">
            <span class="sr-only">{{ preset.name }}</span>
          </button>
        }
      </div>
      <div class="flex items-center gap-2">
        <span scColorPickerSwatch></span>
        <input scColorPickerField aria-label="Colour" />
        @if (picker.canPickFromScreen()) {
          <button scColorPickerEyeDropper>
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
export class SwatchesColorPickerDemo {
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
