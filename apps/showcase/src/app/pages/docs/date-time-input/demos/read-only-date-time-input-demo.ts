import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScDateTimeInput, ScField, ScLabel } from '@semantic-components/ui';

/** Read-only: its parts can be focused and read, not changed. */
@Component({
  selector: 'app-read-only-date-time-input-demo',
  imports: [ScDateTimeInput, ScField, ScLabel],
  template: `
    <div scField class="w-64">
      <label scLabel>Signed</label>
      <div scDateTimeInput readonly [(value)]="signed"></div>
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlyDateTimeInputDemo {
  private readonly signed = signal<Temporal.PlainDateTime | null>(
    Temporal.PlainDateTime.from('2026-10-14T16:05'),
  );
}
