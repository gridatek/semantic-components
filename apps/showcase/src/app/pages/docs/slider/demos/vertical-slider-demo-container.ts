import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VerticalSliderDemo } from './vertical-slider-demo';

@Component({
  selector: 'app-vertical-slider-demo-container',
  imports: [DemoContainer, VerticalSliderDemo],
  template: `
    <app-demo-container
      title="Vertical"
      demoUrl="/demos/slider/vertical-slider-demo"
      [code]="code"
    >
      <app-vertical-slider-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalSliderDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScSlider } from '@semantic-components/ui';

/** orientation="vertical": the value grows upward; the arrows still move it. */
@Component({
  selector: 'app-vertical-slider-demo',
  imports: [ScSlider],
  template: \`
    <div class="flex h-40 items-center justify-center gap-6">
      <input
        scSlider
        orientation="vertical"
        [(value)]="bass"
        aria-label="Bass"
      />
      <input
        scSlider
        orientation="vertical"
        [(value)]="treble"
        aria-label="Treble"
      />
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalSliderDemo {
  protected readonly bass = signal(50);
  protected readonly treble = signal(25);
}`;
}
