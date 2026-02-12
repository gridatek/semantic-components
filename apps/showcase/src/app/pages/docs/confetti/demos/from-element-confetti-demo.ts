import {
  ChangeDetectionStrategy,
  Component,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ScConfetti } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-from-element-confetti-demo',
  imports: [ScConfetti],
  template: `
    <sc-confetti #confetti />
    <button
      #celebrateBtn
      class="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
      (click)="fire(celebrateBtn)"
    >
      Celebrate!
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FromElementConfettiDemo {
  readonly confetti = viewChild.required<ScConfetti>('confetti');

  fire(button: HTMLButtonElement): void {
    this.confetti().fireFromElement(button, {
      particleCount: 50,
      spread: 60,
    });
  }
}
