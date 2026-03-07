import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCountdown } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-event-countdown-demo',
  imports: [ScCountdown],
  template: `
    <div
      class="from-primary/10 to-primary/5 max-w-md rounded-lg border bg-linear-to-br p-8 text-center"
    >
      <h4 class="mb-2 text-lg font-semibold">Product Launch</h4>
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
        class="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 inline-flex h-10 items-center justify-center rounded-md px-6 text-sm font-medium"
      >
        Notify Me
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCountdownDemo {
  readonly futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
}
