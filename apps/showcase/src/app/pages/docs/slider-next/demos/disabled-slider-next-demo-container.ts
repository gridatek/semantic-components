import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledSliderNextDemo } from './disabled-slider-next-demo';

@Component({
  selector: 'app-disabled-slider-next-demo-container',
  imports: [DemoContainer, DisabledSliderNextDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/slider-next/disabled-slider-next-demo"
      [code]="code"
    >
      <app-disabled-slider-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledSliderNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScSliderNext } from '@semantic-components/ui';

/** Disabled: dimmed, out of the Tab order. */
@Component({
  selector: 'app-disabled-slider-next-demo',
  imports: [ScSliderNext],
  template: \`
    <input
      type="range"
      scSliderNext
      [value]="50"
      disabled
      aria-label="Volume"
      class="max-w-xs"
    />
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledSliderNextDemo {}`;
}
