import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendarNext,
  ScCalendarNextHeader,
  ScCalendarNextHeading,
  ScCalendarNextNext,
  ScCalendarNextPrevious,
  type ScCalendarNextValue,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** locale="fr-FR": the days, months and heading in French, the week from Monday — as the locale has it — and showWeekNumbers. */
@Component({
  selector: 'app-locale-calendar-next-demo',
  imports: [
    ScCalendarNext,
    ScCalendarNextHeader,
    ScCalendarNextHeading,
    ScCalendarNextPrevious,
    ScCalendarNextNext,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div
      scCalendarNext
      #cal="scCalendarNext"
      aria-label="Calendrier"
      locale="fr-FR"
      showWeekNumbers
      [(value)]="date"
      class="rounded-lg border"
    >
      <div scCalendarNextHeader>
        <button scCalendarNextPrevious>
          <svg siChevronLeftIcon></svg>
          <span class="sr-only">{{ previousLabel[cal.view()] }}</span>
        </button>
        <button scCalendarNextHeading>{{ cal.heading() }}</button>
        <button scCalendarNextNext>
          <svg siChevronRightIcon></svg>
          <span class="sr-only">{{ nextLabel[cal.view()] }}</span>
        </button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleCalendarNextDemo {
  readonly date = signal<ScCalendarNextValue>(
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
