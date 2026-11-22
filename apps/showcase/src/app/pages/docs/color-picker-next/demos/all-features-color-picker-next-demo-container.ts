import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AllFeaturesColorPickerNextDemo } from './all-features-color-picker-next-demo';

@Component({
  selector: 'app-all-features-color-picker-next-demo-container',
  imports: [DemoContainer, AllFeaturesColorPickerNextDemo],
  template: `
    <app-demo-container
      title="All features"
      [code]="code"
      demoUrl="/demos/color-picker-next/all-features-color-picker-next-demo"
    >
      <app-all-features-color-picker-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AllFeaturesColorPickerNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  type ScColorFormat,
  ScColorPickerNext,
  ScColorPickerNextArea,
  ScColorPickerNextEyeDropper,
  ScColorPickerNextInput,
  ScColorPickerNextSlider,
  ScColorPickerNextSwatch,
  ScColorPickerNextSwatchItem,
  ScColorPickerNextSwatches,
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
  ScNativeSelectOption,
} from '@semantic-components/ui';
import { SiChevronDownIcon, SiPipetteIcon } from '@semantic-icons/lucide-icons';

/** Every part: drag or choose a preset; pick HSL to write the colour again; type a name like "rebeccapurple" and press Enter. */
@Component({
  selector: 'app-all-features-color-picker-next-demo',
  imports: [
    ScColorPickerNext,
    ScColorPickerNextArea,
    ScColorPickerNextEyeDropper,
    ScColorPickerNextInput,
    ScColorPickerNextSlider,
    ScColorPickerNextSwatch,
    ScColorPickerNextSwatchItem,
    ScColorPickerNextSwatches,
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    ScNativeSelectOption,
    SiChevronDownIcon,
    SiPipetteIcon,
  ],
  template: \`
    <div class="grid w-72 gap-3">
      <div
        scColorPickerNext
        aria-label="Color"
        class="grid gap-3"
        [format]="format()"
        [(value)]="color"
      >
        <div scColorPickerNextArea aria-label="Saturation and brightness"></div>
        <div class="flex items-center gap-3">
          <button scColorPickerNextEyeDropper>
            <svg siPipetteIcon></svg>
            <span class="sr-only">Pick from screen</span>
          </button>
          <div class="grid flex-1 gap-3">
            <input scColorPickerNextSlider="hue" aria-label="Hue" />
            <input scColorPickerNextSlider="alpha" aria-label="Opacity" />
          </div>
          <span scColorPickerNextSwatch></span>
        </div>
        <div class="flex gap-2">
          <div scNativeSelectContainer class="w-28 shrink-0">
            <select
              scNativeSelect
              aria-label="Format"
              [value]="format()"
              (change)="setFormat($event)"
            >
              @for (item of formats; track item.value) {
                <option scNativeSelectOption [value]="item.value">
                  {{ item.label }}
                </option>
              }
            </select>
            <svg siChevronDownIcon scNativeSelectIcon></svg>
          </div>
          <input
            scColorPickerNextInput
            aria-label="Color value"
            class="min-w-0"
          />
        </div>
        <div scColorPickerNextSwatches aria-label="Presets">
          @for (preset of presets; track preset.value) {
            <button [scColorPickerNextSwatchItem]="preset.value">
              <span class="sr-only">{{ preset.name }}</span>
            </button>
          }
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
export class AllFeaturesColorPickerNextDemo {
  private readonly color = signal('#0ea5e9');
  private readonly format = signal<ScColorFormat>('hex');
  private readonly formats: readonly { value: ScColorFormat; label: string }[] =
    [
      { value: 'hex', label: 'Hex' },
      { value: 'rgb', label: 'RGB' },
      { value: 'hsl', label: 'HSL' },
      { value: 'oklch', label: 'OKLCH' },
    ];
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

  private setFormat(event: Event): void {
    this.format.set((event.target as HTMLSelectElement).value as ScColorFormat);
  }
}`;
}
