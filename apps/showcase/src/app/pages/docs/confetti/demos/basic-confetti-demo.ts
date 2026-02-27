import {
  ChangeDetectionStrategy,
  Component,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ScConfetti } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-confetti-demo',
  imports: [ScConfetti],
  template: `
    <sc-confetti #confetti />
    <button
      class="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium"
      (click)="fire()"
    >
      Fire Confetti!
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicConfettiDemo {
  readonly confetti = viewChild.required<ScConfetti>('confetti');

  fire(): void {
    this.confetti().fire();
  }
}
