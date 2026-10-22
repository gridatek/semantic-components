import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScField, ScLabel, ScTimeInput } from '@semantic-components/ui';

/** In a field, named by its label. Type the digits — it moves on by itself — or use the arrows; AM/PM takes a or p. */
@Component({
  selector: 'app-basic-time-input-demo',
  imports: [ScTimeInput, ScField, ScLabel],
  template: `
    <div scField class="w-40">
      <label scLabel>Start time</label>
      <div scTimeInput [(value)]="time"></div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ time()?.toString() ?? 'No time.' }}
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicTimeInputDemo {
  readonly time = signal<Temporal.PlainTime | null>(null);
}
