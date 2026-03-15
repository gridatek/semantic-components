import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-basic-confetti-demo',
  imports: [ScButton],
  template: `
    <button scButton (click)="fire()">Fire Confetti!</button>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicConfettiDemo {
  fire(): void {
    confetti();
  }
}
