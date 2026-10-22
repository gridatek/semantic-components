import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScAnimatedCounter } from '@semantic-components/ui-lab/animated-counter';

/** effect="roll": each digit rolls to its new place, like an odometer — the separators and the currency stay still. */
@Component({
  selector: 'app-roll-animated-counter-demo',
  imports: [ScAnimatedCounter, ScButton],
  template: `
    <div
      class="bg-muted/30 grid h-32 w-72 place-items-center rounded-xl border"
    >
      <span
        scAnimatedCounter
        effect="roll"
        [value]="price()"
        [format]="{ style: 'currency', currency: 'USD' }"
        class="text-5xl font-bold"
      ></span>
    </div>
    <div class="flex gap-2">
      <button scButton (click)="price.set(price() + 12.5)">+$12.50</button>
      <button scButton variant="secondary" (click)="price.set(price() - 7.25)">
        −$7.25
      </button>
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class RollAnimatedCounterDemo {
  readonly price = signal(1249.99);
}
