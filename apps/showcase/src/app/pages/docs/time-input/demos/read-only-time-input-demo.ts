import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScField, ScLabel, ScTimeInput } from '@semantic-components/ui';

/** Read-only: its parts can be focused and read, not changed. */
@Component({
  selector: 'app-read-only-time-input-demo',
  imports: [ScField, ScLabel, ScTimeInput],
  template: `
    <div scField class="w-44">
      <label scLabel>Signed at</label>
      <div scTimeInput readonly [(value)]="time"></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlyTimeInputDemo {
  private readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('14:05'),
  );
}
