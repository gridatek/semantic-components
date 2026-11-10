import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CustomColorSliderDemo } from './custom-color-slider-demo';

@Component({
  selector: 'app-custom-color-slider-demo-container',
  imports: [DemoContainer, CustomColorSliderDemo],
  template: `
    <app-demo-container
      title="Custom color"
      demoUrl="/demos/slider/custom-color-slider-demo"
      [code]="code"
    >
      <app-custom-color-slider-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomColorSliderDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScField, ScLabel, ScSlider } from '@semantic-components/ui';

/** The app's colours, changed on a part of the page: --primary, --muted, --ring. */
@Component({
  selector: 'app-custom-color-slider-demo',
  imports: [ScField, ScLabel, ScSlider],
  template: \`
    <div
      scField
      class="w-72"
      style="--primary: oklch(0.6 0.25 30); --muted: oklch(0.9 0.05 30); --ring: oklch(0.6 0.25 30)"
    >
      <label scLabel>Temperature — {{ temperature() }}</label>
      <input scSlider [(value)]="temperature" />
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomColorSliderDemo {
  protected readonly temperature = signal(50);
}`;
}
