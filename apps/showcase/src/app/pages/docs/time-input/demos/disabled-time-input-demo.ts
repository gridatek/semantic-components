import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScField, ScLabel, ScTimeInput } from '@semantic-components/ui';

/** disabled: shown, not edited — out of the tab order. */
@Component({
  selector: 'app-disabled-time-input-demo',
  imports: [ScTimeInput, ScField, ScLabel],
  template: `
    <div scField class="w-40">
      <label scLabel>Check-out</label>
      <div scTimeInput disabled [(value)]="time"></div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ time()?.toString() ?? 'No time.' }}
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledTimeInputDemo {
  readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('11:00'),
  );
}
