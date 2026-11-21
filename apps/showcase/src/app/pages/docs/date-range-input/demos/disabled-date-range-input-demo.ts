import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  type ScCalendarRange,
  ScDateInput,
  ScDateRangeInput,
  ScField,
  ScLabel,
} from '@semantic-components/ui';

/** Disabled: both ends leave the tab order. */
@Component({
  selector: 'app-disabled-date-range-input-demo',
  imports: [ScDateInput, ScDateRangeInput, ScField, ScLabel],
  template: `
    <div scField class="w-80">
      <label scLabel>Stay</label>
      <div scDateRangeInput disabled [(value)]="stay">
        <div scDateInput part="start" aria-label="Check-in"></div>
        <span aria-hidden="true" class="text-muted-foreground">–</span>
        <div scDateInput part="end" aria-label="Check-out"></div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledDateRangeInputDemo {
  private readonly stay = signal<ScCalendarRange | null>({
    from: Temporal.PlainDate.from('2026-11-02'),
    to: Temporal.PlainDate.from('2026-11-06'),
  });
}
