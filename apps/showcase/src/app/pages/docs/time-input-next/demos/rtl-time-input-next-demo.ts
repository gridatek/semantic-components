import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScLabel,
  ScTimeInputNext,
} from '@semantic-components/ui';

/** In a right-to-left page: the clock's digits stay left to right, AM/PM on the side the locale puts it; the arrows follow the parts as they show. */
@Component({
  selector: 'app-rtl-time-input-next-demo',
  imports: [Dir, ScField, ScFieldDescription, ScLabel, ScTimeInputNext],
  template: `
    <div dir="rtl" lang="ar" scField class="w-44">
      <label scLabel>وقت الاجتماع</label>
      <div scTimeInputNext [(value)]="time"></div>
      <p scFieldDescription>بتوقيتك المحلي.</p>
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTimeInputNextDemo {
  private readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('14:30'),
  );
}
