import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarRange,
  ScDateInput,
  ScDateRangeInput,
  ScDateRangePickerNext,
  ScDateRangePickerNextTrigger,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabelText,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** Typed in a scDateRangeInput — its two ends part by part, in one input group: the picker’s value and limits; an end before the start is marked. The button in the field opens the calendar. */
@Component({
  selector: 'app-typed-date-range-picker-next-demo',
  imports: [
    CdkOverlayOrigin,
    ScDateRangePickerNext,
    ScDateRangePickerNextTrigger,
    ScPopoverProvider,
    ScPopoverPortal,
    ScPopover,
    ScCalendar,
    ScCalendarHeader,
    ScCalendarPrevious,
    ScCalendarNext,
    ScDateInput,
    ScDateRangeInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabelText,
    SiCalendarIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div class="grid w-80 gap-2">
      <p scLabelText id="stay-label">Stay</p>
      <div scDateRangePickerNext #dp="scDateRangePickerNext" [(value)]="range">
        <div scPopoverProvider [origin]="anchor" alignment="start">
          <div scInputGroup cdkOverlayOrigin #anchor="cdkOverlayOrigin">
            <div scDateRangeInput aria-labelledby="stay-label">
              <div scDateInput part="start" aria-label="Check-in"></div>
              <span aria-hidden="true" class="text-muted-foreground">–</span>
              <div scDateInput part="end" aria-label="Check-out"></div>
            </div>
            <div scInputGroupAddon side="inline-end">
              <button
                scDateRangePickerNextTrigger
                #trigger="scDateRangePickerNextTrigger"
              >
                <svg siCalendarIcon></svg>
                <span class="sr-only">Choose dates</span>
              </button>
            </div>
          </div>
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
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ dp.text() || 'Nothing picked.' }}
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class TypedDateRangePickerNextDemo {
  private readonly range = signal<ScCalendarRange | null>({
    from: Temporal.PlainDate.from('2026-10-14'),
    to: Temporal.PlainDate.from('2026-10-18'),
  });
}
