import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScField, ScLabel, ScTimeInputNext } from '@semantic-components/ui';

/** The locale's clock by default; 12 or 24 hours, seconds, the hour in two digits. */
@Component({
  selector: 'app-hour-cycle-time-input-next-demo',
  imports: [ScField, ScLabel, ScTimeInputNext],
  template: `
    <div class="grid w-full max-w-md gap-4 sm:grid-cols-2">
      <div scField>
        <label scLabel>12-hour clock</label>
        <div scTimeInputNext [hourCycle]="12" [(value)]="afternoon"></div>
      </div>
      <div scField>
        <label scLabel>24-hour clock</label>
        <div scTimeInputNext [hourCycle]="24" [(value)]="afternoon"></div>
      </div>
      <div scField>
        <label scLabel>With seconds</label>
        <div
          scTimeInputNext
          granularity="second"
          [hourCycle]="24"
          [(value)]="evening"
        ></div>
      </div>
      <div scField>
        <label scLabel>Leading zeros</label>
        <div scTimeInputNext leadingZeros [(value)]="morning"></div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HourCycleTimeInputNextDemo {
  private readonly afternoon = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('14:30'),
  );
  private readonly evening = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('18:45:30'),
  );
  private readonly morning = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('09:05'),
  );
}
