import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarHeading,
  ScCalendarNext,
  ScCalendarPrevious,
  ScCalendarValue,
  ScDateRange,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
} from '@semantic-components/ui';
import {
  ScDateRangePicker,
  ScDateRangePickerTrigger,
} from '@semantic-components/ui-lab';
import {
  SiCalendarIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-no-clear-date-range-picker-demo',
  imports: [
    ScDateRangePicker,
    ScDateRangePickerTrigger,
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
    <div class="space-y-4">
      <p class="text-muted-foreground text-sm">
        No footer — auto-closes when both dates are selected.
      </p>
      <div scDateRangePicker [(value)]="range" #drp="scDateRangePicker">
        <div
          scPopoverProvider
          [origin]="trigger.overlayOrigin"
          align="start"
          #pop
        >
          <button scDateRangePickerTrigger #trigger="scDateRangePickerTrigger">
            <svg siCalendarIcon class="mr-2 size-4"></svg>
            <span [class]="drp.displayText() ? '' : 'text-muted-foreground'">
              {{ drp.displayText() || drp.placeholder() }}
            </span>
          </button>
          <ng-template scPopoverPortal>
            <div scPopover class="w-auto p-0">
              <div class="p-3">
                <div
                  scCalendar
                  mode="range"
                  [value]="drp.value()"
                  (valueChange)="onValueChange($event, pop)"
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
              </div>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NoClearDateRangePickerDemo {
  readonly range = signal<ScDateRange>({ from: undefined, to: undefined });

  onValueChange(value: ScCalendarValue, pop: ScPopoverProvider): void {
    this.range.set(value as ScDateRange);
    const range = value as ScDateRange;
    if (range?.from && range?.to) {
      pop.open.set(false);
    }
  }
}
