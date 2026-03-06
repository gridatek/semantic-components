import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CardsCountdownDemo } from './cards-countdown-demo';

@Component({
  selector: 'app-cards-countdown-demo-container',
  imports: [DemoContainer, CardsCountdownDemo],
  template: `
    <app-demo-container title="Cards" [code]="code">
      <app-cards-countdown-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsCountdownDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCountdown } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-cards-countdown-demo',
  imports: [ScCountdown],
  template: \`
    <div class="inline-block rounded-lg border p-6">
      <sc-countdown [targetDate]="futureDate" variant="cards" />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsCountdownDemo {
  readonly futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
}`;
}
