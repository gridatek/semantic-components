import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarHeading,
  ScCalendarNext,
  ScCalendarPrevious,
  ScDatePicker,
  ScDatePickerTrigger,
  ScDateRange,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-range-date-picker-demo',
  imports: [
    ScDatePicker,
    ScDatePickerTrigger,
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
      <div
        scDatePicker
        mode="range"
        [(value)]="selectedRange"
        placeholder="Pick a date range"
        #dp="scDatePicker"
      >
        <div scPopoverProvider [origin]="trigger.overlayOrigin" align="start">
          <button scDatePickerTrigger #trigger="scDatePickerTrigger">
            <svg siCalendarIcon class="mr-2 size-4"></svg>
            <span [class]="dp.displayText() ? '' : 'text-muted-foreground'">
              {{ dp.displayText() || dp.placeholder() }}
            </span>
          </button>
          <ng-template scPopoverPortal>
            <div scPopover class="w-auto p-0">
              <div
                scCalendar
                mode="range"
                [value]="dp.value()"
                (valueChange)="dp.onValueChange($event)"
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
          </ng-template>
        </div>
      </div>

      @if (selectedRange().from) {
        <div
          class="bg-muted/50 flex items-center justify-between rounded-md border p-4"
        >
          <div>
            <p class="text-sm font-medium">Selected Range</p>
            <p class="text-muted-foreground text-sm">
              @if (selectedRange().to) {
                {{ selectedRange().from?.toLocaleString() }} -
                {{ selectedRange().to?.toLocaleString() }}
              } @else {
                {{ selectedRange().from?.toLocaleString() }} - ...
              }
            </p>
          </div>
          <button
            type="button"
            class="hover:bg-accent rounded-md border px-3 py-1 text-sm"
            (click)="clearSelection()"
          >
            Clear
          </button>
        </div>
      } @else {
        <p
          class="text-muted-foreground rounded-md border p-4 text-center text-sm"
        >
          No range selected
        </p>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RangeDatePickerDemo {
  readonly selectedRange = signal<ScDateRange>({
    from: undefined,
    to: undefined,
  });

  clearSelection(): void {
    this.selectedRange.set({ from: undefined, to: undefined });
  }
}
