import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicConfettiDemo } from './basic-confetti-demo';

@Component({
  selector: 'app-basic-confetti-demo-container',
  imports: [DemoContainer, BasicConfettiDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-confetti-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicConfettiDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ScConfetti } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-confetti-demo',
  imports: [ScConfetti],
  template: \`
    <sc-confetti #confetti />
    <button
      class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      (click)="fire()"
    >
      Fire Confetti!
    </button>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicConfettiDemo {
  readonly confetti = viewChild.required<ScConfetti>('confetti');

  fire(): void {
    this.confetti().fire();
  }
}`;
}
