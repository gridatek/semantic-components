import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarRange,
  ScDateRangePicker,
  ScDateRangePickerTrigger,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  injectFormatDate,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** Two clicks in two months — the start, then the end: written as one span ("Oct 12 – 18, 2026"); it closes once both ends are picked. */
@Component({
  selector: 'app-basic-date-range-picker-demo',
  imports: [
    ScDateRangePicker,
    ScDateRangePickerTrigger,
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
      scDateRangePicker
      #dp="scDateRangePicker"
      [(value)]="range"
      class="w-72"
    >
      <div scPopoverProvider [origin]="trigger.overlayOrigin" alignment="start">
        <button scDateRangePickerTrigger #trigger="scDateRangePickerTrigger">
          <svg siCalendarIcon></svg>
          <span>{{ formatDate(range()) || 'Pick dates' }}</span>
        </button>
        <ng-template scPopoverPortal>
          <div scPopover class="w-auto p-0" aria-label="Choose dates">
            <div
              scCalendar
              initialFocus
              aria-label="Choose dates"
              mode="range"
              [numberOfMonths]="2"
              [value]="dp.draft()"
              (valueChange)="dp.pick($event)"
            >
              <div scCalendarHeader>
                <button scCalendarPrevious>
                  <svg siChevronLeftIcon></svg>
                  <span class="sr-only">Previous month</span>
                </button>
                <button scCalendarNext>
                  <svg siChevronRightIcon></svg>
                  <span class="sr-only">Next month</span>
                </button>
              </div>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ formatDate(range()) || 'Nothing picked.' }}
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicDateRangePickerDemo {
  // The value as written: Intl's, in the user's digits — or your own format.
  private readonly formatDate = injectFormatDate();
  private readonly range = signal<ScCalendarRange | null>(null);
}
