import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarValue,
  ScDatePicker,
  ScDatePickerInput,
  ScDatePickerTrigger,
  ScInputGroup,
  ScInputGroupAddon,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** locale="fr-FR" and a long format: the value, the calendar and the typed order (jj/mm/aaaa) in French. */
@Component({
  selector: 'app-locale-date-picker-demo',
  imports: [
    ScInputGroup,
    ScInputGroupAddon,
    ScDatePicker,
    ScDatePickerTrigger,
    ScPopoverProvider,
    ScPopoverPortal,
    ScPopover,
    ScCalendar,
    ScCalendarHeader,
    ScCalendarPrevious,
    ScCalendarNext,
    ScDatePickerInput,
    SiCalendarIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div
      scDatePicker
      #dp="scDatePicker"
      locale="fr-FR"
      [format]="{ dateStyle: 'long' }"
      [(value)]="date"
      class="w-64"
    >
      <div scPopoverProvider [origin]="trigger.overlayOrigin" align="end">
        <div scInputGroup>
          <input
            scDatePickerInput
            aria-label="Date d’arrivée"
            placeholder="jj/mm/aaaa"
          />
          <div scInputGroupAddon align="inline-end">
            <button scDatePickerTrigger #trigger="scDatePickerTrigger">
              <svg siCalendarIcon></svg>
              <span class="sr-only">Choisir une date</span>
            </button>
          </div>
        </div>
        <ng-template scPopoverPortal>
          <div scPopover class="w-auto p-0" aria-label="Choisir une date">
            <div
              scCalendar
              initialFocus
              aria-label="Choisir une date"
              [mode]="dp.mode()"
              [value]="dp.draft()"
              (valueChange)="dp.pick($event)"
              locale="fr-FR"
            >
              <div scCalendarHeader>
                <button scCalendarPrevious>
                  <svg siChevronLeftIcon></svg>
                  <span class="sr-only">Mois précédent</span>
                </button>
                <button scCalendarNext>
                  <svg siChevronRightIcon></svg>
                  <span class="sr-only">Mois suivant</span>
                </button>
              </div>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ dp.text() || 'Nothing picked.' }}
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleDatePickerDemo {
  readonly date = signal<ScCalendarValue>(
    Temporal.PlainDate.from('2026-10-14'),
  );
}
