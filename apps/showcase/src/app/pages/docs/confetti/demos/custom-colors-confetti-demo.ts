import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-custom-colors-confetti-demo',
  template: `
    <button
      class="inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
      (click)="fire()"
    >
      Purple Party
    </button>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomColorsConfettiDemo {
  fire(): void {
    confetti({
      colors: ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe'],
      particleCount: 80,
    });
  }
}
