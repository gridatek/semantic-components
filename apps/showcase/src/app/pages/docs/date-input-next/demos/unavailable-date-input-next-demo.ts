import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScDateInputNext,
  ScField,
  ScFieldDescription,
  ScLabel,
} from '@semantic-components/ui';

/** unavailable: days that can’t be picked — here weekends — are marked invalid. */
@Component({
  selector: 'app-unavailable-date-input-next-demo',
  imports: [ScDateInputNext, ScField, ScFieldDescription, ScLabel],
  template: `
    <div scField class="w-44">
      <label scLabel>Delivery date</label>
      <div scDateInputNext [unavailable]="weekend" [(value)]="delivery"></div>
      <p scFieldDescription>We deliver Monday to Friday.</p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class UnavailableDateInputNextDemo {
  private readonly weekend = (date: Temporal.PlainDate) => date.dayOfWeek > 5;
  private readonly delivery = signal<Temporal.PlainDate | null>(
    Temporal.PlainDate.from('2026-11-04'),
  );
}
