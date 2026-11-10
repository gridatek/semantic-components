import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VerticalSliderNextDemo } from './vertical-slider-next-demo';

@Component({
  selector: 'app-vertical-slider-next-demo-container',
  imports: [DemoContainer, VerticalSliderNextDemo],
  template: `
    <app-demo-container
      title="Vertical"
      demoUrl="/demos/slider-next/vertical-slider-next-demo"
      [code]="code"
    >
      <app-vertical-slider-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalSliderNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScSliderNext } from '@semantic-components/ui';

/** orientation="vertical": the value grows upward; the arrows still move it. */
@Component({
  selector: 'app-vertical-slider-next-demo',
  imports: [ScSliderNext],
  template: \`
    <div class="flex h-40 items-center justify-center gap-6">
      <input
        type="range"
        scSliderNext
        orientation="vertical"
        [(value)]="bass"
        aria-label="Bass"
      />
      <input
        type="range"
        scSliderNext
        orientation="vertical"
        [(value)]="treble"
        aria-label="Treble"
      />
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalSliderNextDemo {
  protected readonly bass = signal(50);
  protected readonly treble = signal(25);
}`;
}
