import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScDateInputNext, ScField, ScLabel } from '@semantic-components/ui';

/** Read-only: its parts can be focused and read, not changed. */
@Component({
  selector: 'app-read-only-date-input-next-demo',
  imports: [ScDateInputNext, ScField, ScLabel],
  template: `
    <div scField class="w-44">
      <label scLabel>Signed on</label>
      <div scDateInputNext readonly [(value)]="signed"></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlyDateInputNextDemo {
  private readonly signed = signal<Temporal.PlainDate | null>(
    Temporal.PlainDate.from('2026-10-14'),
  );
}
