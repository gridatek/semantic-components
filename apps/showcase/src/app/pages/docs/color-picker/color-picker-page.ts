import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AllFeaturesColorPickerDemoContainer } from './demos/all-features-color-picker-demo-container';

@Component({
  selector: 'app-color-picker-page',
  imports: [
    AllFeaturesColorPickerDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scTypeset>Color Picker</h1>
        <p class="text-muted-foreground">
          An area and channel sliders, with alpha; a field that takes any CSS
          colour; swatches as a radio group; the value in the format you choose
          — a form field.
        </p>
        <app-component-badges path="color-picker" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Example</h2>
        <p class="text-muted-foreground">
          Every part at once, in a form: drag across the area or along the
          sliders, pick from the screen, choose a preset — a radio group, the
          arrows move — type any CSS colour (a name, oklch()), write it as Hex,
          RGB, HSL or OKLCH, or disable the picker. The colour is a Signal Forms
          field, required.
        </p>
        <app-all-features-color-picker-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ColorPickerPage {}
