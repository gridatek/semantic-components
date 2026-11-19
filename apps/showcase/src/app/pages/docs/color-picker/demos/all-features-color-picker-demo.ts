import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  disabled,
  form,
  required,
} from '@angular/forms/signals';
import {
  ScButton,
  type ScColorFormat,
  ScColorPicker,
  ScColorPickerArea,
  ScColorPickerEyeDropper,
  ScColorPickerInput,
  ScColorPickerOption,
  ScColorPickerSlider,
  ScColorPickerSwatch,
  ScColorPickerSwatches,
  ScField,
  ScFieldErrors,
  ScLabel,
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
  ScNativeSelectOption,
  ScSwitch,
} from '@semantic-components/ui';
import { SiChevronDownIcon, SiPipetteIcon } from '@semantic-icons/lucide-icons';

/**
 * Every part at once, in a form: the area; the eyedropper, the hue and
 * opacity sliders and the colour beside them; the format and the text; the
 * presets. The colour is a Signal Forms field (required); the format and
 * the picker's disabled state are settings below it.
 */
@Component({
  selector: 'app-all-features-color-picker-demo',
  imports: [
    DecimalPipe,
    FormField,
    FormRoot,
    ScButton,
    ScColorPicker,
    ScColorPickerArea,
    ScColorPickerEyeDropper,
    ScColorPickerInput,
    ScColorPickerOption,
    ScColorPickerSlider,
    ScColorPickerSwatch,
    ScColorPickerSwatches,
    ScField,
    ScFieldErrors,
    ScLabel,
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    ScNativeSelectOption,
    ScSwitch,
    SiChevronDownIcon,
    SiPipetteIcon,
  ],
  template: `
    <form [formRoot]="themeForm" class="w-80 space-y-4">
      <div scField>
        <label scLabel>Brand colour</label>
        <div
          scColorPicker
          #picker="scColorPicker"
          [formField]="themeForm.brand"
          [format]="settings().format"
          class="space-y-3"
        >
          <div
            scColorPickerArea
            aria-label="Saturation and brightness"
            [attr.aria-valuetext]="
              'Saturation ' +
              (picker.hsva().s | number: '1.0-0') +
              '%, brightness ' +
              (picker.hsva().v | number: '1.0-0') +
              '%'
            "
            class="aspect-[8/5] h-auto"
          ></div>

          <!-- The eyedropper, the sliders, the colour as large as both. -->
          <div class="flex items-center gap-3">
            @if (picker.canPickFromScreen()) {
              <button scColorPickerEyeDropper class="size-10">
                <svg siPipetteIcon></svg>
                <span class="sr-only">Pick from screen</span>
              </button>
            }
            <div class="flex-1 space-y-3">
              <input scColorPickerSlider="hue" aria-label="Hue" />
              <input scColorPickerSlider="alpha" aria-label="Opacity" />
            </div>
            <span scColorPickerSwatch class="size-10"></span>
          </div>

          <!-- The format, and the colour as text (any CSS colour). -->
          <div class="flex items-center gap-3">
            <div scNativeSelectContainer class="w-28 shrink-0">
              <select
                scNativeSelect
                aria-label="Format"
                [formField]="settingsForm.format"
              >
                @for (format of formats; track format.value) {
                  <option scNativeSelectOption [value]="format.value">
                    {{ format.label }}
                  </option>
                }
              </select>
              <svg siChevronDownIcon scNativeSelectIcon></svg>
            </div>
            <input scColorPickerInput aria-label="Colour" class="flex-1" />
          </div>

          <div
            scColorPickerSwatches
            aria-label="Presets"
            class="flex justify-between"
          >
            @for (preset of presets; track preset.color) {
              <button [scColorPickerOption]="preset.color">
                <span class="sr-only">{{ preset.name }}</span>
              </button>
            }
          </div>
        </div>
        <p scFieldErrors></p>
      </div>

      <div scField orientation="horizontal">
        <input scSwitch [formField]="settingsForm.disabled" />
        <label scLabel>Disabled</label>
      </div>

      <div class="flex items-center justify-between gap-3">
        <code class="text-muted-foreground font-mono text-xs">{{
          model().brand || '—'
        }}</code>
        <button scButton type="submit">Save</button>
      </div>
      <p role="status" class="text-sm">{{ saved() }}</p>
    </form>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AllFeaturesColorPickerDemo {
  private readonly settings = signal<{
    format: ScColorFormat;
    disabled: boolean;
  }>({ format: 'hex', disabled: false });
  private readonly settingsForm = form(this.settings);

  private readonly model = signal({ brand: '#0ea5e9' });
  private readonly themeForm = form(
    this.model,
    (path) => {
      required(path.brand, { message: 'Choose a colour.' });
      // The switch below: in the schema, as every Signal Forms constraint.
      disabled(path.brand, () => this.settings().disabled);
    },
    {
      submission: {
        action: async () => {
          this.saved.set(`Saved: ${this.model().brand}`);
        },
      },
    },
  );
  private readonly saved = signal('');

  private readonly formats: { value: ScColorFormat; label: string }[] = [
    { value: 'hex', label: 'Hex' },
    { value: 'rgb', label: 'RGB' },
    { value: 'hsl', label: 'HSL' },
    { value: 'oklch', label: 'OKLCH' },
  ];
  private readonly presets = [
    { color: '#ef4444', name: 'Red' },
    { color: '#f97316', name: 'Orange' },
    { color: '#eab308', name: 'Yellow' },
    { color: '#22c55e', name: 'Green' },
    { color: '#0ea5e9', name: 'Sky' },
    { color: '#6366f1', name: 'Indigo' },
    { color: '#a855f7', name: 'Purple' },
    { color: '#ec4899', name: 'Pink' },
  ];
}
