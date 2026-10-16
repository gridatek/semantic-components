import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AlphaColorPickerNextDemoContainer } from './demos/alpha-color-picker-next-demo-container';
import { BasicColorPickerNextDemoContainer } from './demos/basic-color-picker-next-demo-container';
import { FormColorPickerNextDemoContainer } from './demos/form-color-picker-next-demo-container';
import { FormatsColorPickerNextDemoContainer } from './demos/formats-color-picker-next-demo-container';
import { SwatchesColorPickerNextDemoContainer } from './demos/swatches-color-picker-next-demo-container';

@Component({
  selector: 'app-color-picker-next-page',
  imports: [
    BasicColorPickerNextDemoContainer,
    AlphaColorPickerNextDemoContainer,
    FormatsColorPickerNextDemoContainer,
    SwatchesColorPickerNextDemoContainer,
    FormColorPickerNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Color Picker Next</h1>
        <p class="text-muted-foreground">
          The color picker, rebuilt: an area and channel sliders, with alpha; a
          field that takes any CSS colour; swatches as a radio group; the value
          in the format you choose — a form field.
        </p>
        <app-component-badges path="color-picker-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Basic</h2>
        <p class="text-muted-foreground">
          The area (saturation and brightness), the hue, the colour and its
          field. The field takes any CSS colour — try a name, or oklch().
        </p>
        <app-basic-color-picker-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Alpha</h2>
        <p class="text-muted-foreground">
          An opacity slider, on a checkerboard; the value carries it —
          #rrggbbaa, or rgb(… / a).
        </p>
        <app-alpha-color-picker-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Formats</h2>
        <p class="text-muted-foreground">
          The value in hex, rgb(), hsl() or oklch() — the format is an input;
          changed, the value is written again.
        </p>
        <app-formats-color-picker-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Swatches</h2>
        <p class="text-muted-foreground">
          Preset colours, a radio group — the arrows move and choose; the one
          that is the colour is checked. Where the browser can, pick from the
          screen.
        </p>
        <app-swatches-color-picker-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Popover in a form</h2>
        <p class="text-muted-foreground">
          A [formField]: the trigger shows the colour, the picker opens in a
          popover; required in the schema.
        </p>
        <app-form-color-picker-next-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ColorPickerNextPage {}
