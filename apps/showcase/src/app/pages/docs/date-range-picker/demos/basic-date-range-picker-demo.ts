import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarHeading,
  ScCalendarNextButton,
  ScCalendarPrevious,
  ScDateRange,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
} from '@semantic-components/ui';
import {
  ScDateRangePicker,
  ScDateRangePickerApply,
  ScDateRangePickerCancel,
  ScDateRangePickerFooter,
  ScDateRangePickerTrigger,
} from '@semantic-components/ui-lab';
import {
  SiCalendarIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-date-range-picker-demo',
  imports: [
    ScDateRangePicker,
    ScDateRangePickerTrigger,
    ScDateRangePickerApply,
    ScDateRangePickerCancel,
    ScDateRangePickerFooter,
    ScPopoverProvider,
    ScPopoverPortal,
    ScPopover,
    ScCalendar,
    ScCalendarHeader,
    ScCalendarHeading,
    ScCalendarPrevious,
    ScCalendarNextButton,
    SiCalendarIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div class="space-y-4">
      <div
        scDateRangePicker
        [(value)]="range"
        (apply)="onRangeApply($event)"
        #drp="scDateRangePicker"
      >
        <div scPopoverProvider [origin]="trigger.overlayOrigin" align="start">
          <button scDateRangePickerTrigger #trigger="scDateRangePickerTrigger">
            <svg siCalendarIcon class="mr-2 size-4"></svg>
            <span [class]="drp.displayText() ? '' : 'text-muted-foreground'">
              {{ drp.displayText() || 'Select date range' }}
            </span>
          </button>
          <ng-template scPopoverPortal>
            <div scPopover class="w-auto p-0">
              <div class="p-3">
                <div
                  scCalendar
                  aria-label="Calendar"
                  mode="range"
                  [numberOfMonths]="2"
                  [value]="drp.value()"
                  (valueChange)="drp.onValueChange($event)"
                  #cal="scCalendar"
                >
                  <div scCalendarHeader>
                    <button scCalendarPrevious>
                      <svg siChevronLeftIcon class="size-4"></svg>
                      <span class="sr-only">
                        @switch (cal.viewMode()) {
                          @case ('day') {
                            Go to previous month
                          }
                          @case ('month') {
                            Go to previous year
                          }
                          @case ('year') {
                            Go to previous decade
                          }
                        }
                      </span>
                    </button>
                    <button scCalendarHeading>{{ cal.heading() }}</button>
                    <button scCalendarNext>
                      <svg siChevronRightIcon class="size-4"></svg>
                      <span class="sr-only">
                        @switch (cal.viewMode()) {
                          @case ('day') {
                            Go to next month
                          }
                          @case ('month') {
                            Go to next year
                          }
                          @case ('year') {
                            Go to next decade
                          }
                        }
                      </span>
                    </button>
                  </div>
                </div>
                <div scDateRangePickerFooter>
                  <button scDateRangePickerCancel>Cancel</button>
                  <button scDateRangePickerApply>Apply</button>
                </div>
              </div>
            </div>
          </ng-template>
        </div>
      </div>

      <div class="bg-muted w-[580px] rounded-md p-4">
        @if (range().from && range().to) {
          <p class="text-sm font-medium">Selected Range</p>
          <p class="text-muted-foreground text-sm">
            {{ range().from?.toLocaleString() }} -
            {{ range().to?.toLocaleString() }}
          </p>
        } @else {
          <p class="text-muted-foreground text-sm">No range selected</p>
        }
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicDateRangePickerDemo {
  readonly range = signal<ScDateRange>({ from: undefined, to: undefined });

  onRangeApply(range: ScDateRange): void {
    console.log('Range applied:', range);
  }
}
