import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScAnimatedCounter } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-animated-counter-demo',
  imports: [ScAnimatedCounter, ScButton],
  template: `
    <div class="flex items-center gap-4">
      <span
        scAnimatedCounter
        [value]="value()"
        class="text-4xl font-bold"
      ></span>
      <button scButton (click)="increment()">+100</button>
      <button scButton variant="secondary" (click)="reset()">Reset</button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicAnimatedCounterDemo {
  readonly value = signal(0);

  increment(): void {
    this.value.update((v) => v + 100);
  }

  reset(): void {
    this.value.set(0);
  }
}
