import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScLabel,
  ScTimeInput,
} from '@semantic-components/ui';

/** step, 15 minutes here, for the arrows; minTime and maxTime: a time outside them is marked. */
@Component({
  selector: 'app-limits-time-input-demo',
  imports: [ScTimeInput, ScField, ScLabel, ScFieldDescription],
  template: `
    <div scField class="w-40">
      <label scLabel>Opening</label>
      <div
        scTimeInput
        [step]="{ minutes: 15 }"
        [minTime]="open"
        [maxTime]="close"
        [(value)]="time"
      ></div>
      <p scFieldDescription>Between 9 AM and 5 PM.</p>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ time()?.toString() ?? 'No time.' }}
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class LimitsTimeInputDemo {
  readonly open = Temporal.PlainTime.from('09:00');
  readonly close = Temporal.PlainTime.from('17:00');
  readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('09:00'),
  );
}
