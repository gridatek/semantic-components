import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-corner-bursts-confetti-demo',
  imports: [ScButton],
  template: `
    <button scButton variant="secondary" (click)="fire()">
      Fire from Corners
    </button>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CornerBurstsConfettiDemo {
  fire(): void {
    confetti({
      angle: 60,
      origin: { x: 0, y: 1 },
      spread: 45,
      particleCount: 30,
    });
    confetti({
      angle: 120,
      origin: { x: 1, y: 1 },
      spread: 45,
      particleCount: 30,
    });
  }
}
