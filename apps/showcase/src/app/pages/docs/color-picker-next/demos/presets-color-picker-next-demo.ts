import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScColorPickerNext,
  ScColorPickerNextChannelInput,
  ScColorPickerNextEyeDropper,
  ScColorPickerNextSwatch,
  ScColorPickerNextSwatchItem,
  ScColorPickerNextSwatches,
  ScField,
  ScLabel,
} from '@semantic-components/ui';
import { SiPipetteIcon } from '@semantic-icons/lucide-icons';

/** space="srgb", format="hex": presets (a radio group), red, green and blue as numbers, the screen’s colours where the browser can. */
@Component({
  selector: 'app-presets-color-picker-next-demo',
  imports: [
    ScColorPickerNext,
    ScColorPickerNextChannelInput,
    ScColorPickerNextEyeDropper,
    ScColorPickerNextSwatch,
    ScColorPickerNextSwatchItem,
    ScColorPickerNextSwatches,
    ScField,
    ScLabel,
    SiPipetteIcon,
  ],
  template: `
    <div class="grid w-72 gap-3">
      <div
        scColorPickerNext
        space="srgb"
        format="hex"
        aria-label="Color"
        class="grid gap-3"
        [(value)]="color"
      >
        <div scColorPickerNextSwatches aria-label="Presets">
          @for (preset of presets; track preset.value) {
            <button [scColorPickerNextSwatchItem]="preset.value">
              <span class="sr-only">{{ preset.name }}</span>
            </button>
          }
        </div>
        <div class="flex items-end gap-2">
          @for (channel of channels; track channel.name) {
            <div scField class="w-16">
              <label scLabel>{{ channel.label }}</label>
              <input [scColorPickerNextChannelInput]="channel.name" />
            </div>
          }
          <button scColorPickerNextEyeDropper>
            <svg siPipetteIcon></svg>
            <span class="sr-only">Pick from screen</span>
          </button>
          <span scColorPickerNextSwatch></span>
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
export class PresetsColorPickerNextDemo {
  private readonly color = signal('#e11d48');
  private readonly channels = [
    { name: 'red', label: 'R' },
    { name: 'green', label: 'G' },
    { name: 'blue', label: 'B' },
  ] as const;
  private readonly presets = [
    { value: '#e11d48', name: 'Rose' },
    { value: '#f97316', name: 'Orange' },
    { value: '#eab308', name: 'Yellow' },
    { value: '#22c55e', name: 'Green' },
    { value: '#06b6d4', name: 'Cyan' },
    { value: '#3b82f6', name: 'Blue' },
    { value: '#8b5cf6', name: 'Violet' },
    { value: '#18181b', name: 'Black' },
  ];
}
