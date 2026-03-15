import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-multiple-bursts-confetti-demo',
  template: `
    <button
      class="inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
      (click)="fire()"
    >
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
