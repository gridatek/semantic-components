import { Dir } from '@angular/cdk/bidi';
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

/** In a right-to-left page: the field and the calendar right to left, the clock's columns left to right; the arrows follow what shows. */
@Component({
  selector: 'app-rtl-date-time-picker-demo',
  imports: [
    Dir,
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
    <div dir="rtl" lang="ar">
      <div scField class="w-64">
        <label scLabel>موعد المغادرة</label>
        <div scDateTimePicker #dtp="scDateTimePicker">
          <div scPopoverProvider [origin]="anchor" alignment="start">
            <div scInputGroup cdkOverlayOrigin #anchor="cdkOverlayOrigin">
              <div scDateTimeInput [(value)]="when"></div>
              <div scInputGroupAddon side="inline-end">
                <button scDateTimePickerTrigger>
                  <svg siCalendarClockIcon></svg>
                  <span class="sr-only">اختر التاريخ والوقت</span>
                </button>
              </div>
            </div>
            <ng-template scPopoverPortal>
              <div
                scPopover
                class="w-auto flex-col gap-0 p-0 sm:flex-row"
                aria-label="اختر التاريخ والوقت"
              >
                <div
                  scCalendar
                  initialFocus
                  aria-label="اختر التاريخ"
                  [value]="dtp.date()"
                  [minDate]="dtp.minDate()"
                  [maxDate]="dtp.maxDate()"
                  [unavailable]="dtp.unavailable()"
                  (valueChange)="dtp.pickDate($event)"
                >
                  <div scCalendarHeader>
                    <button scCalendarPrevious>
                      <svg siChevronLeftIcon></svg>
                      <span class="sr-only">الشهر السابق</span>
                    </button>
                    <button scCalendarNext>
                      <svg siChevronRightIcon></svg>
                      <span class="sr-only">الشهر التالي</span>
                    </button>
                  </div>
                </div>
                <div
                  scTimePickerColumns
                  [initialFocus]="false"
                  class="border-t sm:border-s sm:border-t-0"
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
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlDateTimePickerDemo {
  private readonly when = signal<Temporal.PlainDateTime | null>(
    Temporal.PlainDateTime.from('2026-11-02T14:30'),
  );
}
