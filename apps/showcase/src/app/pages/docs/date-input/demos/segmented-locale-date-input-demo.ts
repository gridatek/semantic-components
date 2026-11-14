import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScSegmentedDateInput,
} from '@semantic-components/ui';

/** LOCALE_ID provided as 'fr-FR': day, month, year — the parts named in French. */
@Component({
  selector: 'app-segmented-locale-date-input-demo',
  imports: [ScSegmentedDateInput, ScField, ScLabel],
  template: `
    <div scField class="w-40">
      <label scLabel>Date d’arrivée</label>
      <div scSegmentedDateInput [(value)]="date"></div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ date()?.toString() ?? 'No date.' }}
    </p>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class SegmentedLocaleDateInputDemo {
  readonly date = signal<Temporal.PlainDate | null>(
    Temporal.PlainDate.from('2026-10-14'),
  );
}
