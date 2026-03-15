import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-custom-colors-confetti-demo',
  imports: [ScButton],
  template: `
    <button scButton variant="secondary" (click)="fire()">Purple Party</button>
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
