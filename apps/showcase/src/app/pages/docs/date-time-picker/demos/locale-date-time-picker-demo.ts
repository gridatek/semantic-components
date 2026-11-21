import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  ScDateTimeInput,
  ScDateTimePicker,
  ScDateTimePickerTrigger,
  ScField,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScTimePickerColumns,
} from '@semantic-components/ui';
import {
  SiCalendarClockIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** LOCALE_ID provided as 'de-DE': the date day first, a 24-hour clock, the calendar and the columns in German. */
@Component({
  selector: 'app-locale-date-time-picker-demo',
  imports: [
    CdkOverlayOrigin,
    ScCalendar,
    ScCalendarHeader,
    ScCalendarNext,
    ScCalendarPrevious,
    ScDateTimeInput,
    ScDateTimePicker,
    ScDateTimePickerTrigger,
    ScField,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    ScPopover,
    ScPopoverPortal,
    ScPopoverProvider,
    ScTimePickerColumns,
    SiCalendarClockIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div lang="de">
      <div scField class="w-64">
        <label scLabel>Abfahrt</label>
        <div scDateTimePicker #dtp="scDateTimePicker">
          <div scPopoverProvider [origin]="anchor" alignment="start">
            <div scInputGroup cdkOverlayOrigin #anchor="cdkOverlayOrigin">
              <div scDateTimeInput [(value)]="when"></div>
              <div scInputGroupAddon side="inline-end">
                <button scDateTimePickerTrigger>
                  <svg siCalendarClockIcon></svg>
                  <span class="sr-only">Datum und Uhrzeit wählen</span>
                </button>
              </div>
            </div>
            <ng-template scPopoverPortal>
              <div
                scPopover
                class="w-auto flex-row gap-0 p-0"
                aria-label="Datum und Uhrzeit wählen"
              >
                <div
                  scCalendar
                  initialFocus
                  aria-label="Datum wählen"
                  [value]="dtp.date()"
                  [minDate]="dtp.minDate()"
                  [maxDate]="dtp.maxDate()"
                  [unavailable]="dtp.unavailable()"
                  (valueChange)="dtp.pickDate($event)"
                >
                  <div scCalendarHeader>
                    <button scCalendarPrevious>
                      <svg siChevronLeftIcon></svg>
                      <span class="sr-only">Vorheriger Monat</span>
                    </button>
                    <button scCalendarNext>
                      <svg siChevronRightIcon></svg>
                      <span class="sr-only">Nächster Monat</span>
                    </button>
                  </div>
                </div>
                <div
                  scTimePickerColumns
                  [initialFocus]="false"
                  class="border-s"
                ></div>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ when()?.toString() ?? 'No date and time.' }}
    </p>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'de-DE' }],
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleDateTimePickerDemo {
  private readonly when = signal<Temporal.PlainDateTime | null>(
    Temporal.PlainDateTime.from('2026-11-02T14:30'),
  );
}
