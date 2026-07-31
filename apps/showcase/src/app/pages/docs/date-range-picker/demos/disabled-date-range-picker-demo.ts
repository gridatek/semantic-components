import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarHeading,
  ScCalendarNext,
  ScCalendarPrevious,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
} from '@semantic-components/ui';
import {
  ScDateRangePicker,
  ScDateRangePickerFooter,
  ScDateRangePickerTrigger,
} from '@semantic-components/ui-lab';
import {
  SiCalendarIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-disabled-date-range-picker-demo',
  imports: [
    ScDateRangePicker,
    ScDateRangePickerTrigger,
    ScDateRangePickerFooter,
    ScPopoverProvider,
    ScPopoverPortal,
    ScPopover,
    ScCalendar,
    ScCalendarHeader,
    ScCalendarHeading,
    ScCalendarPrevious,
    ScCalendarNext,
    SiCalendarIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div scDateRangePicker placeholder="Disabled" #drp="scDateRangePicker">
      <div scPopoverProvider [origin]="trigger.overlayOrigin" align="start">
        <button
          scDateRangePickerTrigger
          disabled
          #trigger="scDateRangePickerTrigger"
        >
          <svg siCalendarIcon class="mr-2 size-4"></svg>
          <span class="text-muted-foreground">
            {{ drp.placeholder() }}
          </span>
        </button>
        <ng-template scPopoverPortal>
          <div scPopover class="w-auto p-0">
            <div class="p-3">
              <div
                scCalendar
                mode="range"
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
              <div scDateRangePickerFooter></div>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledDateRangePickerDemo {}
