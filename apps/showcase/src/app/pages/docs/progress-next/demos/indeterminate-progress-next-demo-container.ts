import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { IndeterminateProgressNextDemo } from './indeterminate-progress-next-demo';

@Component({
  selector: 'app-indeterminate-progress-next-demo-container',
  imports: [DemoContainer, IndeterminateProgressNextDemo],
  template: `
    <app-demo-container
      title="Indeterminate"
      demoUrl="/demos/progress-next/indeterminate-progress-next-demo"
      [code]="code"
    >
      <app-indeterminate-progress-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class IndeterminateProgressNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScProgressNext,
  ScProgressNextCircle,
  ScProgressNextLabel,
  ScProgressNextRange,
  ScProgressNextTrack,
} from '@semantic-components/ui';

@Component({
  selector: 'app-indeterminate-progress-next-demo',
  imports: [
    ScProgressNext,
    ScProgressNextCircle,
    ScProgressNextLabel,
    ScProgressNextRange,
    ScProgressNextTrack,
  ],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-6">
      <div scProgressNext>
        <span scProgressNextLabel>Connecting</span>
        <div scProgressNextTrack><div scProgressNextRange></div></div>
      </div>
      <div scProgressNext aria-label="Loading" class="size-8">
        <svg scProgressNextCircle></svg>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class IndeterminateProgressNextDemo {}`;
}
