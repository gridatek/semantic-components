import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScDateInput,
  ScField,
  ScFieldDescription,
  ScLabel,
} from '@semantic-components/ui';

/** In a right-to-left page: an Arabic date reads right to left — the day at the right; the arrows follow the parts as they show. */
@Component({
  selector: 'app-rtl-date-input-demo',
  imports: [Dir, ScDateInput, ScField, ScFieldDescription, ScLabel],
  template: `
    <div dir="rtl" lang="ar" scField class="w-44">
      <label scLabel>تاريخ البدء</label>
      <div scDateInput [(value)]="start"></div>
      <p scFieldDescription>يوم بدء العمل.</p>
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlDateInputDemo {
  private readonly start = signal<Temporal.PlainDate | null>(
    Temporal.PlainDate.from('2026-11-02'),
  );
}
