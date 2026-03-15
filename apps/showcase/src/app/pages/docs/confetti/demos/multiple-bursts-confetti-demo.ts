import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-multiple-bursts-confetti-demo',
  imports: [ScButton],
  template: `
    <button scButton variant="secondary" (click)="fire()">
      Big Celebration
    </button>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleBurstsConfettiDemo {
  fire(): void {
    confetti({ origin: { x: 0.3, y: 0.6 }, particleCount: 50 });
    setTimeout(() => {
      confetti({ origin: { x: 0.7, y: 0.6 }, particleCount: 50 });
    }, 200);
    setTimeout(() => {
      confetti({ origin: { x: 0.5, y: 0.4 }, particleCount: 80 });
    }, 400);
  }
}
