import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScDateTimeInput, ScField, ScLabel } from '@semantic-components/ui';

/** The locale's clock by default; 24 hours with seconds, or 12 with the hour in two digits. */
@Component({
  selector: 'app-hour-cycle-date-time-input-demo',
  imports: [ScDateTimeInput, ScField, ScLabel],
  template: `
    <div class="grid w-full max-w-xl gap-4 sm:grid-cols-2">
      <div scField>
        <label scLabel>24 hours, with seconds</label>
        <div
          scDateTimeInput
          granularity="second"
          [hourCycle]="24"
          [(value)]="logged"
        ></div>
      </div>
      <div scField>
        <label scLabel>12 hours, two-digit hour</label>
        <div
          scDateTimeInput
          [hourCycle]="12"
          leadingZeros
          [(value)]="logged"
        ></div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class HourCycleDateTimeInputDemo {
  private readonly logged = signal<Temporal.PlainDateTime | null>(
    Temporal.PlainDateTime.from('2026-11-02T09:05:30'),
  );
}
