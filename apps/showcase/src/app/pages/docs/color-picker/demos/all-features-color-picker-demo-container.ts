import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AllFeaturesColorPickerDemo } from './all-features-color-picker-demo';

@Component({
  selector: 'app-all-features-color-picker-demo-container',
  imports: [DemoContainer, AllFeaturesColorPickerDemo],
  template: `
    <app-demo-container
      title="All features"
      [code]="code"
      demoUrl="/demos/color-picker/all-features-color-picker-demo"
    >
      <app-all-features-color-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AllFeaturesColorPickerDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  type ScColorFormat,
  ScColorPicker,
  ScColorPickerArea,
  ScColorPickerEyeDropper,
  ScColorPickerInput,
  ScColorPickerSlider,
  ScColorPickerSwatch,
  ScColorPickerSwatchItem,
  ScColorPickerSwatches,
  ScField,
  ScLabel,
  ScSelect,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiChevronDownIcon,
  SiPipetteIcon,
} from '@semantic-icons/lucide-icons';

/** Every part: drag or choose a preset; pick HSL to write the colour again; type a name like "rebeccapurple" and press Enter. */
@Component({
  selector: 'app-all-features-color-picker-demo',
  imports: [
    ScField,
    ScLabel,
    ScColorPicker,
    ScColorPickerArea,
    ScColorPickerEyeDropper,
    ScColorPickerInput,
    ScColorPickerSlider,
    ScColorPickerSwatch,
    ScColorPickerSwatchItem,
    ScColorPickerSwatches,
    ScSelect,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
    SiCheckIcon,
    SiChevronDownIcon,
    SiPipetteIcon,
  ],
  template: \`
    <div class="grid w-96 max-w-full gap-3">
      <div
        scColorPicker
        aria-label="Color"
        class="grid gap-3"
        [format]="format()"
        [(value)]="color"
      >
        <div scColorPickerArea aria-label="Saturation and brightness"></div>
        <div class="flex items-center gap-3">
          <button scColorPickerEyeDropper>
            <svg siPipetteIcon></svg>
            <span class="sr-only">Pick from screen</span>
          </button>
          <div class="grid flex-1 gap-3">
            <input scColorPickerSlider="hue" aria-label="Hue" />
            <input scColorPickerSlider="alpha" aria-label="Opacity" />
          </div>
          <span scColorPickerSwatch></span>
        </div>
        <div class="flex gap-2">
          <div scField class="w-24 shrink-0">
            <label class="sr-only" scLabel>Format</label>
            <div scSelect [items]="formats" [(value)]="format">
              <div scSelectTrigger class="w-full">
                <span scSelectValue></span>
                <svg scSelectIcon siChevronDownIcon></svg>
              </div>
              <ng-template scSelectPortal>
                <div scSelectPopup>
                  <div scSelectList>
                    @for (item of formats; track item.value) {
                      <div scSelectItem [value]="item.value">
                        <span scSelectItemText>{{ item.label }}</span>
                        <span scSelectItemIndicator
                          ><svg siCheckIcon></svg
                        ></span>
                      </div>
                    }
                  </div>
                </div>
              </ng-template>
            </div>
          </div>
          <input scColorPickerInput aria-label="Color value" class="min-w-0" />
        </div>
        <div scColorPickerSwatches aria-label="Presets">
          @for (preset of presets; track preset.value) {
            <button [scColorPickerSwatchItem]="preset.value">
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
export class AllFeaturesColorPickerDemo {
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
}`;
}
