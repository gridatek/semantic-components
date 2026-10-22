import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CardAnimatedCounterNextDemo } from './card-animated-counter-next-demo';

@Component({
  selector: 'app-card-animated-counter-next-demo-container',
  imports: [DemoContainer, CardAnimatedCounterNextDemo],
  template: `
    <app-demo-container
      title="In a stat card"
      [code]="code"
      demoUrl="/demos/animated-counter-next/card-animated-counter-next-demo"
    >
      <app-card-animated-counter-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CardAnimatedCounterNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScStatCard, ScStatCardLabel, ScStatCardValue, ScStatCardDescription } from '@semantic-components/ui-lab';
import { ScAnimatedCounter } from '@semantic-components/ui-lab/animated-counter';

/** In the stat card’s value: the figure moves to its new value as the data comes in. */
@Component({
  selector: 'app-card-animated-counter-next-demo',
  imports: [ScAnimatedCounter, ScStatCard, ScStatCardLabel, ScStatCardValue, ScStatCardDescription, ScButton],
  template: \`
    <dl scStatCard class="w-64">
      <dt scStatCardLabel>Active users</dt>
      <dd scStatCardValue>
        <span scAnimatedCounter [value]="users()"></span>
      </dd>
      <dd scStatCardDescription>right now</dd>
    </dl>
    <button scButton variant="outline" (click)="refresh()">Refresh</button>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class CardAnimatedCounterNextDemo {
  readonly users = signal(1_284);
  private turn = 0;

  /** New figures, as from a server. */
  refresh(): void {
    this.users.update((v) => v + [137, -58, 412, -201][this.turn++ % 4]);
  }
}`;
}
