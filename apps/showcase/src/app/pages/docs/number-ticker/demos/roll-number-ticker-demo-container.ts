import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RollNumberTickerDemo } from './roll-number-ticker-demo';

@Component({
  selector: 'app-roll-number-ticker-demo-container',
  imports: [DemoContainer, RollNumberTickerDemo],
  template: `
    <app-demo-container
      title="Roll"
      description='effect="roll": each digit rolls to its new place, like an odometer — the separators and the currency stay still.'
      [code]="code"
      demoUrl="/demos/number-ticker/roll-number-ticker-demo"
    >
      <app-roll-number-ticker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RollNumberTickerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScNumberTicker } from '@semantic-components/ui';

/** effect="roll": each digit rolls to its new place, like an odometer — the separators and the currency stay still. */
@Component({
  selector: 'app-roll-number-ticker-demo',
  imports: [ScNumberTicker, ScButton],
  template: \`
    <div
      class="bg-muted/30 grid h-32 w-72 place-items-center rounded-xl border"
    >
      <span
        scNumberTicker
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
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class RollNumberTickerDemo {
  readonly price = signal(1249.99);
}`;
}
