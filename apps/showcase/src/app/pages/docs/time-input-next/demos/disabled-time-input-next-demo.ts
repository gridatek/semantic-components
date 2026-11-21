import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScField, ScLabel, ScTimeInputNext } from '@semantic-components/ui';

/** Disabled: its parts leave the tab order. */
@Component({
  selector: 'app-disabled-time-input-next-demo',
  imports: [ScField, ScLabel, ScTimeInputNext],
  template: `
    <div scField class="w-44">
      <label scLabel>Start time</label>
      <div scTimeInputNext disabled [(value)]="time"></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledTimeInputNextDemo {
  private readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('09:30'),
  );
}
