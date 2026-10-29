import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScProgress,
  ScProgressCircle,
  ScProgressLabel,
  ScProgressRange,
  ScProgressTrack,
  ScProgressValueText,
} from '@semantic-components/ui';

@Component({
  selector: 'app-steps-progress-demo',
  imports: [
    ScButton,
    ScProgress,
    ScProgressCircle,
    ScProgressLabel,
    ScProgressRange,
    ScProgressTrack,
    ScProgressValueText,
  ],
  template: `
    <div class="flex w-full max-w-sm items-center gap-6">
      <div class="flex-1">
        <div scProgress [value]="done()" [max]="5">
          <span scProgressLabel>Setup</span>
          <span scProgressValueText>{{ done() }} of 5 steps</span>
          <div scProgressTrack><div scProgressRange></div></div>
        </div>
      </div>
      <div scProgress [value]="done()" [max]="5" aria-label="Setup">
        <svg scProgressCircle></svg>
        <span scProgressValueText>{{ done() }}/5</span>
      </div>
    </div>
    <div class="flex gap-2">
      <button
        scButton
        variant="outline"
        size="sm"
        [disabled]="done() === 0"
        (click)="step(-1)"
      >
        Back
      </button>
      <button scButton size="sm" [disabled]="done() === 5" (click)="step(1)">
        Next step
      </button>
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class StepsProgressDemo {
  readonly done = signal(2);

  step(by: number): void {
    this.done.update((done) => Math.min(Math.max(done + by, 0), 5));
  }
}
