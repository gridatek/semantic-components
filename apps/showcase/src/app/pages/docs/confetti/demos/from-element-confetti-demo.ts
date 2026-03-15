import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-from-element-confetti-demo',
  template: `
    <button
      #celebrateBtn
      class="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
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
