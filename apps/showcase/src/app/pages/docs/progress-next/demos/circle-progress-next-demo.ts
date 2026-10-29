import { PercentPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScProgressNext,
  ScProgressNextCircle,
  ScProgressNextValueText,
} from '@semantic-components/ui';

@Component({
  selector: 'app-circle-progress-next-demo',
  imports: [
    PercentPipe,
    ScProgressNext,
    ScProgressNextCircle,
    ScProgressNextValueText,
  ],
  template: `
    <div class="flex flex-wrap items-center gap-6">
      @for (value of values; track value) {
        <div scProgressNext [value]="value" aria-label="Storage used">
          <svg scProgressNextCircle></svg>
          <span scProgressNextValueText>{{ value / 100 | percent }}</span>
        </div>
      }
      <div
        scProgressNext
        [value]="60"
        aria-label="Storage used"
        class="size-24"
      >
        <svg scProgressNextCircle [thickness]="4"></svg>
        <span scProgressNextValueText>{{ 0.6 | percent }}</span>
      </div>
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class CircleProgressNextDemo {
  readonly values = [0, 25, 50, 75, 100];
}
