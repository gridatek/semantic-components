import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScAnimatedCounter } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-prefix-animated-counter-demo',
  imports: [ScAnimatedCounter, ScButton],
  template: `
    <div class="flex items-center gap-4">
      <span
        scAnimatedCounter
        [value]="value()"
        prefix="$"
        [decimalPlaces]="2"
        class="text-3xl font-bold text-green-600"
      ></span>
      <button scButton (click)="add()">+$50</button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrefixAnimatedCounterDemo {
  readonly value = signal(0);

  add(): void {
    this.value.update((v) => v + 50);
  }
}
