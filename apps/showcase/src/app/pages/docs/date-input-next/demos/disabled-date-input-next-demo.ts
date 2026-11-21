import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScDateInputNext, ScField, ScLabel } from '@semantic-components/ui';

/** Disabled: its parts leave the tab order. */
@Component({
  selector: 'app-disabled-date-input-next-demo',
  imports: [ScDateInputNext, ScField, ScLabel],
  template: `
    <div scField class="w-44">
      <label scLabel>Start date</label>
      <div scDateInputNext disabled [(value)]="start"></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledDateInputNextDemo {
  private readonly start = signal<Temporal.PlainDate | null>(
    Temporal.PlainDate.from('2026-11-02'),
  );
}
