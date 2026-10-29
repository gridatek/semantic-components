import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CircleProgressDemo } from './circle-progress-demo';

@Component({
  selector: 'app-circle-progress-demo-container',
  imports: [DemoContainer, CircleProgressDemo],
  template: `
    <app-demo-container
      title="Circle"
      demoUrl="/demos/progress/circle-progress-demo"
      [code]="code"
    >
      <app-circle-progress-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CircleProgressDemoContainer {
  readonly code = `import { PercentPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScProgress,
  ScProgressCircle,
  ScProgressValueText,
} from '@semantic-components/ui';

@Component({
  selector: 'app-circle-progress-demo',
  imports: [
    PercentPipe,
    ScProgress,
    ScProgressCircle,
    ScProgressValueText,
  ],
  template: \`
    <div class="flex flex-wrap items-center gap-6">
      @for (value of values; track value) {
        <div scProgress [value]="value" aria-label="Storage used">
          <svg scProgressCircle></svg>
          <span scProgressValueText>{{ value / 100 | percent }}</span>
        </div>
      }
      <div
        scProgress
        [value]="60"
        aria-label="Storage used"
        class="size-24"
      >
        <svg scProgressCircle [thickness]="4"></svg>
        <span scProgressValueText>{{ 0.6 | percent }}</span>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class CircleProgressDemo {
  readonly values = [0, 25, 50, 75, 100];
}`;
}
