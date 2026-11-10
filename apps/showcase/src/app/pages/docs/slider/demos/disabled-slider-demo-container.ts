import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledSliderDemo } from './disabled-slider-demo';

@Component({
  selector: 'app-disabled-slider-demo-container',
  imports: [DemoContainer, DisabledSliderDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/slider/disabled-slider-demo"
      [code]="code"
    >
      <app-disabled-slider-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledSliderDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScSlider } from '@semantic-components/ui';

/** Disabled: dimmed, out of the Tab order. */
@Component({
  selector: 'app-disabled-slider-demo',
  imports: [ScSlider],
  template: \`
    <input
      scSlider
      [value]="50"
      disabled
      aria-label="Volume"
      class="max-w-xs"
    />
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledSliderDemo {}`;
}
