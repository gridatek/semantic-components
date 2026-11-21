import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScDateInputNext,
  ScField,
  ScFieldDescription,
  ScLabel,
} from '@semantic-components/ui';

/** minDate and maxDate: a day outside them is marked invalid. */
@Component({
  selector: 'app-limits-date-input-next-demo',
  imports: [ScDateInputNext, ScField, ScFieldDescription, ScLabel],
  template: `
    <div scField class="w-44">
      <label scLabel>Check-in</label>
      <div
        scDateInputNext
        [minDate]="first"
        [maxDate]="last"
        [(value)]="checkIn"
      ></div>
      <p scFieldDescription>Any day in 2026.</p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LimitsDateInputNextDemo {
  private readonly first = Temporal.PlainDate.from('2026-01-01');
  private readonly last = Temporal.PlainDate.from('2026-12-31');
  private readonly checkIn = signal<Temporal.PlainDate | null>(
    Temporal.PlainDate.from('2026-11-02'),
  );
}
