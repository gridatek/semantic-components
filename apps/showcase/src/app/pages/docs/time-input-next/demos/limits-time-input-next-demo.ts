import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScLabel,
  ScTimeInputNext,
} from '@semantic-components/ui';

/** minTime and maxTime: a time outside them is marked invalid. */
@Component({
  selector: 'app-limits-time-input-next-demo',
  imports: [ScField, ScFieldDescription, ScLabel, ScTimeInputNext],
  template: `
    <div scField class="w-44">
      <label scLabel>Opening time</label>
      <div
        scTimeInputNext
        [minTime]="open"
        [maxTime]="close"
        [(value)]="time"
      ></div>
      <p scFieldDescription>Between 9:00 AM and 5:30 PM.</p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LimitsTimeInputNextDemo {
  private readonly open = Temporal.PlainTime.from('09:00');
  private readonly close = Temporal.PlainTime.from('17:30');
  private readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('10:00'),
  );
}
