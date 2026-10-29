import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { StepsProgressNextDemo } from './steps-progress-next-demo';

@Component({
  selector: 'app-steps-progress-next-demo-container',
  imports: [DemoContainer, StepsProgressNextDemo],
  template: `
    <app-demo-container
      title="Min and Max"
      demoUrl="/demos/progress-next/steps-progress-next-demo"
      [code]="code"
    >
      <app-steps-progress-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StepsProgressNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScProgressNext,
  ScProgressNextCircle,
  ScProgressNextLabel,
  ScProgressNextRange,
  ScProgressNextTrack,
  ScProgressNextValueText,
} from '@semantic-components/ui';

@Component({
  selector: 'app-steps-progress-next-demo',
  imports: [
    ScButton,
    ScProgressNext,
    ScProgressNextCircle,
    ScProgressNextLabel,
    ScProgressNextRange,
    ScProgressNextTrack,
    ScProgressNextValueText,
  ],
  template: \`
    <div class="flex w-full max-w-sm items-center gap-6">
      <div class="flex-1">
        <div scProgressNext [value]="done()" [max]="5">
          <span scProgressNextLabel>Setup</span>
          <span scProgressNextValueText>{{ done() }} of 5 steps</span>
          <div scProgressNextTrack><div scProgressNextRange></div></div>
        </div>
      </div>
      <div scProgressNext [value]="done()" [max]="5" aria-label="Setup">
        <svg scProgressNextCircle></svg>
        <span scProgressNextValueText>{{ done() }}/5</span>
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
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class StepsProgressNextDemo {
  readonly done = signal(2);

  step(by: number): void {
    this.done.update((done) => Math.min(Math.max(done + by, 0), 5));
  }
}`;
}
