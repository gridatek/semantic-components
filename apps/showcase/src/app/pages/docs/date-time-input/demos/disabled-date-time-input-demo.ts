import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScDateTimeInput, ScField, ScLabel } from '@semantic-components/ui';

/** Disabled: its parts leave the tab order. */
@Component({
  selector: 'app-disabled-date-time-input-demo',
  imports: [ScDateTimeInput, ScField, ScLabel],
  template: `
    <div scField class="w-64">
      <label scLabel>Starts</label>
      <div scDateTimeInput disabled [(value)]="starts"></div>
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledDateTimeInputDemo {
  private readonly starts = signal<Temporal.PlainDateTime | null>(
    Temporal.PlainDateTime.from('2026-11-02T09:30'),
  );
}
