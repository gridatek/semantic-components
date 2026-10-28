import { LOCALE_ID, Pipe, type PipeTransform, inject } from '@angular/core';

/** An ISO date (`2026-01-15`), written in the app's locale. */
@Pipe({ name: 'localDate' })
export class LocalDatePipe implements PipeTransform {
  private readonly locale = inject(LOCALE_ID);

  transform(
    date: string,
    style: Intl.DateTimeFormatOptions['dateStyle'] = 'medium',
  ): string {
    return Temporal.PlainDate.from(date).toLocaleString(this.locale, {
      dateStyle: style,
    });
  }
}
