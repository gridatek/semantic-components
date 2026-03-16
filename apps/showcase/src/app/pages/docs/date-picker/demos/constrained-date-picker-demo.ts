import { Temporal } from '@js-temporal/polyfill';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarHeading,
  ScCalendarNext,
  ScCalendarPrevious,
  ScDatePicker,
  ScDatePickerTrigger,
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
  selector: 'app-constrained-date-picker-demo',
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
      <p class="text-muted-foreground text-xs">
        Only dates within the next 30 days
      </p>
      <div
        scDatePicker
        [(value)]="selectedDate"
        placeholder="Pick a date (next 30 days)"
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
                [value]="dp.value()"
                [minDate]="minDate"
                [maxDate]="maxDate"
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

      @if (selectedDate(); as date) {
        <div
          class="bg-muted/50 flex items-center justify-between rounded-md border p-4"
        >
          <div>
            <p class="text-sm font-medium">Selected Date</p>
            <p class="text-muted-foreground text-sm">
              {{
                date.toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              }}
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
          No date selected
        </p>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstrainedDatePickerDemo {
  readonly selectedDate = signal<Temporal.PlainDate | undefined>(undefined);
  readonly minDate = Temporal.Now.plainDateISO();
  readonly maxDate = Temporal.Now.plainDateISO().add({ days: 30 });

  clearSelection(): void {
    this.selectedDate.set(undefined);
  }
}
