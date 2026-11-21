import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScDateInput, ScField, ScLabel } from '@semantic-components/ui';

/** Read-only: its parts can be focused and read, not changed. */
@Component({
  selector: 'app-read-only-date-input-demo',
  imports: [ScDateInput, ScField, ScLabel],
  template: `
    <div scField class="w-44">
      <label scLabel>Signed on</label>
      <div scDateInput readonly [(value)]="signed"></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlyDateInputDemo {
  private readonly signed = signal<Temporal.PlainDate | null>(
    Temporal.PlainDate.from('2026-10-14'),
  );
}
