import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ControlledProgressDemo } from './controlled-progress-demo';

@Component({
  selector: 'app-controlled-progress-demo-container',
  imports: [DemoContainer, ControlledProgressDemo],
  template: `
    <app-demo-container
      title="Controlled"
      demoUrl="/demos/progress/controlled-progress-demo"
      [code]="code"
    >
      <app-controlled-progress-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledProgressDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScProgress,
  ScProgressRange,
  ScProgressTrack,
  ScSlider,
} from '@semantic-components/ui';

/** Its value from your state: here, a slider's. */
@Component({
  selector: 'app-controlled-progress-demo',
  imports: [ScProgress, ScProgressRange, ScProgressTrack, ScSlider],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-4">
      <div scProgress [value]="value()" aria-label="Progress" class="w-full">
        <div scProgressTrack><div scProgressRange></div></div>
      </div>
      <input scSlider [(value)]="value" aria-label="Progress" />
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledProgressDemo {
  protected readonly value = signal(50);
}`;
}
