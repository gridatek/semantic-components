import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicProgressDemo } from './basic-progress-demo';

@Component({
  selector: 'app-basic-progress-demo-container',
  imports: [DemoContainer, BasicProgressDemo],
  template: `
    <app-demo-container
      title="Bar"
      demoUrl="/demos/progress/basic-progress-demo"
      [code]="code"
    >
      <app-basic-progress-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicProgressDemoContainer {
  readonly code = `import { PercentPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScProgress,
  ScProgressLabel,
  ScProgressRange,
  ScProgressTrack,
  ScProgressValueText,
} from '@semantic-components/ui';

@Component({
  selector: 'app-basic-progress-demo',
  imports: [
    PercentPipe,
    ScProgress,
    ScProgressLabel,
    ScProgressRange,
    ScProgressTrack,
    ScProgressValueText,
  ],
  template: \`
    <div class="w-full max-w-sm">
      <div scProgress [value]="value">
        <span scProgressLabel>Uploading</span>
        <span scProgressValueText>{{ value / 100 | percent }}</span>
        <div scProgressTrack><div scProgressRange></div></div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicProgressDemo {
  readonly value = 33;
}`;
}
