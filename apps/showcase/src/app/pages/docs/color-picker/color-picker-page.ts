import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { CompactColorPickerDemoContainer } from './demos/compact-color-picker-demo-container';
import { EyedropperColorPickerDemoContainer } from './demos/eyedropper-color-picker-demo-container';
import { FullColorPickerDemoContainer } from './demos/full-color-picker-demo-container';
import { HslColorPickerDemoContainer } from './demos/hsl-color-picker-demo-container';
import { PreviewColorPickerDemoContainer } from './demos/preview-color-picker-demo-container';
import { RgbColorPickerDemoContainer } from './demos/rgb-color-picker-demo-container';
import { SimpleColorPickerDemoContainer } from './demos/simple-color-picker-demo-container';
import { SwatchesColorPickerDemoContainer } from './demos/swatches-color-picker-demo-container';

@Component({
  selector: 'app-color-picker-page',
  imports: [
    FullColorPickerDemoContainer,
    SwatchesColorPickerDemoContainer,
    EyedropperColorPickerDemoContainer,
    SimpleColorPickerDemoContainer,
    CompactColorPickerDemoContainer,
    RgbColorPickerDemoContainer,
    HslColorPickerDemoContainer,
    PreviewColorPickerDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>ColorPicker</h1>
        <p class="text-muted-foreground">
          A component for selecting colors with various formats.
        </p>
        <app-component-badges path="color-picker" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-full-color-picker-demo-container />
        <app-swatches-color-picker-demo-container />
        <app-eyedropper-color-picker-demo-container />
        <app-simple-color-picker-demo-container />
        <app-compact-color-picker-demo-container />
        <app-rgb-color-picker-demo-container />
        <app-hsl-color-picker-demo-container />
        <app-preview-color-picker-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ColorPickerPage {}
