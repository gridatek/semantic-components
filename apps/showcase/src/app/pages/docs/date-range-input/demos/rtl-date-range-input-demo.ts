import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  type ScCalendarRange,
  ScDateInput,
  ScDateRangeInput,
  ScField,
  ScLabel,
} from '@semantic-components/ui';

/** In a right-to-left page: each Arabic end reads right to left, the start at the right. */
@Component({
  selector: 'app-rtl-date-range-input-demo',
  imports: [Dir, ScDateInput, ScDateRangeInput, ScField, ScLabel],
  template: `
    <div dir="rtl" lang="ar">
      <div scField class="w-80">
        <label scLabel>الإقامة</label>
        <div scDateRangeInput [(value)]="stay">
          <div scDateInput part="start" aria-label="الوصول"></div>
          <span aria-hidden="true" class="text-muted-foreground">–</span>
          <div scDateInput part="end" aria-label="المغادرة"></div>
        </div>
      </div>
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlDateRangeInputDemo {
  private readonly stay = signal<ScCalendarRange | null>({
    from: Temporal.PlainDate.from('2026-11-02'),
    to: Temporal.PlainDate.from('2026-11-06'),
  });
}
