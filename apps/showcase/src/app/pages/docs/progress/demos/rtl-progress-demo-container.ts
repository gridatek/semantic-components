import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlProgressDemo } from './rtl-progress-demo';

@Component({
  selector: 'app-rtl-progress-demo-container',
  imports: [DemoContainer, RtlProgressDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/progress/rtl-progress-demo"
      [code]="code"
    >
      <app-rtl-progress-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlProgressDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScProgress,
  ScProgressCircle,
  ScProgressLabel,
  ScProgressRange,
  ScProgressTrack,
  ScProgressValueText,
} from '@semantic-components/ui';

@Component({
  selector: 'app-rtl-progress-demo',
  imports: [
    ScProgress,
    ScProgressCircle,
    ScProgressLabel,
    ScProgressRange,
    ScProgressTrack,
    ScProgressValueText,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="flex w-full max-w-sm items-center gap-6">
      <div class="flex-1">
        <div scProgress [value]="40">
          <span scProgressLabel>التحميل</span>
          <span scProgressValueText>٪٤٠</span>
          <div scProgressTrack><div scProgressRange></div></div>
        </div>
      </div>
      <div scProgress [value]="40" aria-label="التحميل">
        <svg scProgressCircle></svg>
        <span scProgressValueText>٪٤٠</span>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlProgressDemo {}`;
}
