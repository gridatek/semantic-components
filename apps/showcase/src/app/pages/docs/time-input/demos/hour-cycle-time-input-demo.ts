import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScField, ScLabel, ScTimeInput } from '@semantic-components/ui';

/** The locale's clock by default; 12 or 24 hours, seconds, the hour in two digits. */
@Component({
  selector: 'app-hour-cycle-time-input-demo',
  imports: [ScField, ScLabel, ScTimeInput],
  template: `
    <div class="grid w-full max-w-md gap-4 sm:grid-cols-2">
      <div scField>
        <label scLabel>12-hour clock</label>
        <div scTimeInput [hourCycle]="12" [(value)]="afternoon"></div>
      </div>
      <div scField>
        <label scLabel>24-hour clock</label>
        <div scTimeInput [hourCycle]="24" [(value)]="afternoon"></div>
      </div>
      <div scField>
        <label scLabel>With seconds</label>
        <div
          scTimeInput
          granularity="second"
          [hourCycle]="24"
          [(value)]="evening"
        ></div>
      </div>
      <div scField>
        <label scLabel>Leading zeros</label>
        <div scTimeInput leadingZeros [(value)]="morning"></div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HourCycleTimeInputDemo {
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
