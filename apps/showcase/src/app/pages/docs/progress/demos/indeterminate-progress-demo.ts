import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScProgress,
  ScProgressCircle,
  ScProgressLabel,
  ScProgressRange,
  ScProgressTrack,
} from '@semantic-components/ui';

@Component({
  selector: 'app-indeterminate-progress-demo',
  imports: [
    ScProgress,
    ScProgressCircle,
    ScProgressLabel,
    ScProgressRange,
    ScProgressTrack,
  ],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-6">
      <div scProgress>
        <span scProgressLabel>Connecting</span>
        <div scProgressTrack><div scProgressRange></div></div>
      </div>
      <div scProgress aria-label="Loading" class="size-8">
        <svg scProgressCircle></svg>
      </div>
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class IndeterminateProgressDemo {}
