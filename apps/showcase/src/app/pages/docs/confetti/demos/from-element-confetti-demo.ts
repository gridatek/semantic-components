import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-from-element-confetti-demo',
  imports: [ScButton],
  template: `
    <button
      #celebrateBtn
      scButton
      variant="secondary"
      (click)="fire(celebrateBtn)"
    >
      Celebrate!
    </button>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FromElementConfettiDemo {
  fire(button: HTMLButtonElement): void {
    const rect = button.getBoundingClientRect();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
    });
  }
}
