import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CustomColorSliderNextDemo } from './custom-color-slider-next-demo';

@Component({
  selector: 'app-custom-color-slider-next-demo-container',
  imports: [DemoContainer, CustomColorSliderNextDemo],
  template: `
    <app-demo-container
      title="Custom color"
      demoUrl="/demos/slider-next/custom-color-slider-next-demo"
      [code]="code"
    >
      <app-custom-color-slider-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomColorSliderNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScField, ScLabel, ScSliderNext } from '@semantic-components/ui';

/** The app's colours, changed on a part of the page: --primary, --muted, --ring. */
@Component({
  selector: 'app-custom-color-slider-next-demo',
  imports: [ScField, ScLabel, ScSliderNext],
  template: \`
    <div
      scField
      class="w-72"
      style="--primary: oklch(0.6 0.25 30); --muted: oklch(0.9 0.05 30); --ring: oklch(0.6 0.25 30)"
    >
      <label scLabel>Temperature — {{ temperature() }}</label>
      <input type="range" scSliderNext [(value)]="temperature" />
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomColorSliderNextDemo {
  protected readonly temperature = signal(50);
}`;
}
