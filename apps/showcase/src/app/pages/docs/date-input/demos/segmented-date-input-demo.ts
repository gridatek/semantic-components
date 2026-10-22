import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScSegmentedDateInput,
} from '@semantic-components/ui';

/** scSegmentedDateInput: typed part by part — each part a spin button. Digits fill it and move on, arrows step it (an empty part starts at today), Backspace clears it; the day stays within its month. Its value is null until every part is filled. */
@Component({
  selector: 'app-segmented-date-input-demo',
  imports: [ScSegmentedDateInput, ScField, ScLabel],
  template: `
    <div scField class="w-40">
      <label scLabel>Start date</label>
      <div scSegmentedDateInput [(value)]="date"></div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ date()?.toString() ?? 'No date.' }}
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class SegmentedDateInputDemo {
  readonly date = signal<Temporal.PlainDate | null>(null);
}
