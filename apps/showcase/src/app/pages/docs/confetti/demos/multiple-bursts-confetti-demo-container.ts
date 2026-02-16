import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MultipleBurstsConfettiDemo } from './multiple-bursts-confetti-demo';

@Component({
  selector: 'app-multiple-bursts-confetti-demo-container',
  imports: [DemoContainer, MultipleBurstsConfettiDemo],
  template: `
    <app-demo-container title="Multiple Bursts" [code]="code">
      <app-multiple-bursts-confetti-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleBurstsConfettiDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ScConfetti } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-multiple-bursts-confetti-demo',
  imports: [ScConfetti],
  template: \`
    <sc-confetti #confetti />
    <button
      class="inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
      (click)="fire()"
    >
      Big Celebration
    </button>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleBurstsConfettiDemo {
  readonly confetti = viewChild.required<ScConfetti>('confetti');

  fire(): void {
    this.confetti().fire({ origin: { x: 0.3, y: 0.6 }, particleCount: 50 });
    setTimeout(() => {
      this.confetti().fire({ origin: { x: 0.7, y: 0.6 }, particleCount: 50 });
    }, 200);
    setTimeout(() => {
      this.confetti().fire({ origin: { x: 0.5, y: 0.4 }, particleCount: 80 });
    }, 400);
  }
}`;
}
