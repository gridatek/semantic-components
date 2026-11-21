import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScLabel,
  ScTimeInput,
} from '@semantic-components/ui';

/** A time in a field: named by its label, described by its description. */
@Component({
  selector: 'app-time-input-usage-demo',
  imports: [ScField, ScFieldDescription, ScLabel, ScTimeInput],
  template: `
    <div scField class="w-44">
      <label scLabel>Meeting time</label>
      <div scTimeInput [(value)]="time"></div>
      <p scFieldDescription>In your local time.</p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TimeInputUsageDemo {
  private readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('09:30'),
  );
}
