import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScDateInputNext,
  ScField,
  ScFieldDescription,
  ScLabel,
} from '@semantic-components/ui';

/** A date in a field: named by its label, described by its description. */
@Component({
  selector: 'app-date-input-next-usage-demo',
  imports: [ScDateInputNext, ScField, ScFieldDescription, ScLabel],
  template: `
    <div scField class="w-44">
      <label scLabel>Birthday</label>
      <div scDateInputNext [(value)]="birthday"></div>
      <p scFieldDescription>We send a card on the day.</p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DateInputNextUsageDemo {
  private readonly birthday = signal<Temporal.PlainDate | null>(null);
}
