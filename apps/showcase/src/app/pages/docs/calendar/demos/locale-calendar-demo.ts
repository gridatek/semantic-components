import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarHeading,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarValue,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** locale="fr-FR": the days, months and heading in French, the week from Monday — as the locale has it — and showWeekNumbers. */
@Component({
  selector: 'app-locale-calendar-demo',
  imports: [
    ScCalendar,
    ScCalendarHeader,
    ScCalendarHeading,
    ScCalendarPrevious,
    ScCalendarNext,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div
      scCalendar
      #cal="scCalendar"
      aria-label="Calendrier"
      locale="fr-FR"
      showWeekNumbers
      [(value)]="date"
      class="rounded-lg border"
    >
      <div scCalendarHeader>
        <button scCalendarPrevious>
          <svg siChevronLeftIcon></svg>
          <span class="sr-only">{{ previousLabel[cal.view()] }}</span>
        </button>
        <button scCalendarHeading>{{ cal.heading() }}</button>
        <button scCalendarNext>
          <svg siChevronRightIcon></svg>
          <span class="sr-only">{{ nextLabel[cal.view()] }}</span>
        </button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleCalendarDemo {
  readonly date = signal<ScCalendarValue>(
    Temporal.PlainDate.from('2026-10-14'),
  );
  readonly previousLabel = {
    day: 'Mois précédent',
    month: 'Année précédente',
    year: 'Années précédentes',
  };
  readonly nextLabel = {
    day: 'Mois suivant',
    month: 'Année suivante',
    year: 'Années suivantes',
  };
}
