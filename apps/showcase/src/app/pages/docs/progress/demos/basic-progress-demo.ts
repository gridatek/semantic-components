import { PercentPipe } from '@angular/common';
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
  template: `
    <div class="w-full max-w-sm">
      <div scProgress [value]="value">
        <span scProgressLabel>Uploading</span>
        <span scProgressValueText>{{ value / 100 | percent }}</span>
        <div scProgressTrack><div scProgressRange></div></div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicProgressDemo {
  readonly value = 33;
}
