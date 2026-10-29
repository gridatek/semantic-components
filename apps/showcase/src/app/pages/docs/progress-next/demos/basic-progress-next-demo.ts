import { PercentPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScProgressNext,
  ScProgressNextLabel,
  ScProgressNextRange,
  ScProgressNextTrack,
  ScProgressNextValueText,
} from '@semantic-components/ui';

@Component({
  selector: 'app-basic-progress-next-demo',
  imports: [
    PercentPipe,
    ScProgressNext,
    ScProgressNextLabel,
    ScProgressNextRange,
    ScProgressNextTrack,
    ScProgressNextValueText,
  ],
  template: `
    <div class="w-full max-w-sm">
      <div scProgressNext [value]="value">
        <span scProgressNextLabel>Uploading</span>
        <span scProgressNextValueText>{{ value / 100 | percent }}</span>
        <div scProgressNextTrack><div scProgressNextRange></div></div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicProgressNextDemo {
  readonly value = 33;
}
