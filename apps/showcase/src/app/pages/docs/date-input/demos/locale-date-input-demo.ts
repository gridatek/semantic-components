import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScDateInput, ScField, ScLabel } from '@semantic-components/ui';

/** locale="fr-FR": typed day first (14/10/2026). */
@Component({
  selector: 'app-locale-date-input-demo',
  imports: [ScDateInput, ScField, ScLabel],
  template: `
    <div scField class="w-48">
      <label scLabel>Date d’arrivée</label>
      <input
        scDateInput
        locale="fr-FR"
        placeholder="jj/mm/aaaa"
        [(value)]="date"
      />
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ date()?.toString() ?? 'No date.' }}
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleDateInputDemo {
  readonly date = signal<Temporal.PlainDate | null>(
    Temporal.PlainDate.from('2026-10-14'),
  );
}
