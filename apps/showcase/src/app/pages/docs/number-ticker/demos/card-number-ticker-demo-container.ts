import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CardNumberTickerDemo } from './card-number-ticker-demo';

@Component({
  selector: 'app-card-number-ticker-demo-container',
  imports: [DemoContainer, CardNumberTickerDemo],
  template: `
    <app-demo-container
      title="In a stat card"
      description="In the stat card’s value: the figure moves to its new value as the data comes in."
      [code]="code"
      demoUrl="/demos/number-ticker/card-number-ticker-demo"
    >
      <app-card-number-ticker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CardNumberTickerDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScStatCard,
  ScStatCardDescription,
  ScStatCardLabel,
  ScStatCardValue,
} from '@semantic-components/ui';
import { ScNumberTicker } from '@semantic-components/ui';

/** In the stat card’s value: the figure moves to its new value as the data comes in. */
@Component({
  selector: 'app-card-number-ticker-demo',
  imports: [
    ScNumberTicker,
    ScStatCard,
    ScStatCardLabel,
    ScStatCardValue,
    ScStatCardDescription,
    ScButton,
  ],
  template: \`
    <dl scStatCard class="w-64">
      <dt scStatCardLabel>Active users</dt>
      <dd scStatCardValue>
        <span scNumberTicker [value]="users()"></span>
      </dd>
      <dd scStatCardDescription>right now</dd>
    </dl>
    <button scButton variant="outline" (click)="refresh()">Refresh</button>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class CardNumberTickerDemo {
  private readonly users = signal(1_284);
  private turn = 0;

  /** New figures, as from a server. */
  private refresh(): void {
    this.users.update((v) => v + [137, -58, 412, -201][this.turn++ % 4]);
  }
}`;
}
