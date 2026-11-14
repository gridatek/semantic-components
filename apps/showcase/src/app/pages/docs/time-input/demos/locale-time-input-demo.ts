import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import { ScField, ScLabel, ScTimeInput } from '@semantic-components/ui';

/** LOCALE_ID provided as 'fr-FR': 24 hours, the parts named in French. hourCycle overrides the locale’s 12 or 24 hours. */
@Component({
  selector: 'app-locale-time-input-demo',
  imports: [ScTimeInput, ScField, ScLabel],
  template: `
    <div scField class="w-40">
      <label scLabel>Heure d’arrivée</label>
      <div scTimeInput [(value)]="time"></div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ time()?.toString() ?? 'No time.' }}
    </p>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleTimeInputDemo {
  readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('14:30'),
  );
}
