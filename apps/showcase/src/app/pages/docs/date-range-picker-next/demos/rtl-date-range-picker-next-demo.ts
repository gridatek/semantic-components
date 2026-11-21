import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarRange,
  ScDateRangePickerNext,
  ScDateRangePickerNextTrigger,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the months right to left, the span written in Arabic. */
@Component({
  selector: 'app-rtl-date-range-picker-next-demo',
  imports: [
    Dir,
    ScDateRangePickerNext,
    ScDateRangePickerNextTrigger,
    ScPopoverProvider,
    ScPopoverPortal,
    ScPopover,
    ScCalendar,
    ScCalendarHeader,
    ScCalendarPrevious,
    ScCalendarNext,
    SiCalendarIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div
      dir="rtl"
      lang="ar"
      scDateRangePickerNext
      #dp="scDateRangePickerNext"
      [(value)]="range"
      class="w-72"
    >
      <div scPopoverProvider [origin]="trigger.overlayOrigin" alignment="start">
        <button
          scDateRangePickerNextTrigger
          #trigger="scDateRangePickerNextTrigger"
        >
          <svg siCalendarIcon></svg>
          <span>{{ dp.text() || 'اختر التواريخ' }}</span>
        </button>
        <ng-template scPopoverPortal>
          <div scPopover class="w-auto p-0" aria-label="اختر التواريخ">
            <div
              scCalendar
              initialFocus
              aria-label="اختر التواريخ"
              mode="range"
              [numberOfMonths]="2"
              [value]="dp.draft()"
              (valueChange)="dp.pick($event)"
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
          </div>
        </ng-template>
      </div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ dp.text() || 'لم يُختر شيء.' }}
    </p>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlDateRangePickerNextDemo {
  private readonly range = signal<ScCalendarRange | null>({
    from: Temporal.PlainDate.from('2026-11-02'),
    to: Temporal.PlainDate.from('2026-11-06'),
  });
}
