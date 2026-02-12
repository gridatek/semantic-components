import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CornerBurstsConfettiDemo } from './corner-bursts-confetti-demo';

@Component({
  selector: 'app-corner-bursts-confetti-demo-container',
  imports: [DemoContainer, CornerBurstsConfettiDemo],
  template: `
    <app-demo-container title="Corner Bursts" [code]="code">
      <app-corner-bursts-confetti-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CornerBurstsConfettiDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ScConfetti } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-corner-bursts-confetti-demo',
  imports: [ScConfetti],
  template: \`
    <sc-confetti #confetti />
    <button
      class="inline-flex items-center justify-center rounded-md bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700"
      (click)="fire()"
    >
      Fire from Corners
    </button>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CornerBurstsConfettiDemo {
  readonly confetti = viewChild.required<ScConfetti>('confetti');

  fire(): void {
    this.confetti().fire({
      origin: { x: 0, y: 1 },
      spread: 45,
      particleCount: 30,
    });
    this.confetti().fire({
      origin: { x: 1, y: 1 },
      spread: 45,
      particleCount: 30,
    });
  }
}`;
}
