import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { EventCountdownDemo } from './event-countdown-demo';

@Component({
  selector: 'app-event-countdown-demo-container',
  imports: [DemoContainer, EventCountdownDemo],
  template: `
    <app-demo-container title="Event" [code]="code">
      <app-event-countdown-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCountdownDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCountdown } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-event-countdown-demo',
  imports: [ScCountdown],
  template: \`
    <div
      class="max-w-md rounded-lg border bg-gradient-to-br from-primary/10 to-primary/5 p-8 text-center"
    >
      <h4 class="text-lg font-semibold mb-2">Product Launch</h4>
      <p class="text-muted-foreground mb-6">Get ready for something amazing!</p>
      <sc-countdown
        [targetDate]="futureDate"
        variant="cards"
        daysLabel="DAYS"
        hoursLabel="HRS"
        minutesLabel="MIN"
        secondsLabel="SEC"
      />
      <button
        class="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Notify Me
      </button>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCountdownDemo {
  readonly futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
}`;
}
