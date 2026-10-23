import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScStatCard,
  ScStatCardDescription,
  ScStatCardLabel,
  ScStatCardValue,
} from '@semantic-components/ui';
import { ScAnimatedCounter } from '@semantic-components/ui/animated-counter';

/** In the stat card’s value: the figure moves to its new value as the data comes in. */
@Component({
  selector: 'app-card-animated-counter-demo',
  imports: [
    ScAnimatedCounter,
    ScStatCard,
    ScStatCardLabel,
    ScStatCardValue,
    ScStatCardDescription,
    ScButton,
  ],
  template: `
    <dl scStatCard class="w-64">
      <dt scStatCardLabel>Active users</dt>
      <dd scStatCardValue>
        <span scAnimatedCounter [value]="users()"></span>
      </dd>
      <dd scStatCardDescription>right now</dd>
    </dl>
    <button scButton variant="outline" (click)="refresh()">Refresh</button>
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class CardAnimatedCounterDemo {
  readonly users = signal(1_284);
  private turn = 0;

  /** New figures, as from a server. */
  refresh(): void {
    this.users.update((v) => v + [137, -58, 412, -201][this.turn++ % 4]);
  }
}
