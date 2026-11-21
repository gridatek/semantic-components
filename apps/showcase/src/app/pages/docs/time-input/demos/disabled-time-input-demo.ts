import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScField, ScLabel, ScTimeInput } from '@semantic-components/ui';

/** Disabled: its parts leave the tab order. */
@Component({
  selector: 'app-disabled-time-input-demo',
  imports: [ScField, ScLabel, ScTimeInput],
  template: `
    <div scField class="w-44">
      <label scLabel>Start time</label>
      <div scTimeInput disabled [(value)]="time"></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledTimeInputDemo {
  private readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('09:30'),
  );
}
