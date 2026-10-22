import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarHeading,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarValue,
  ScDatePickerNext,
  ScDatePickerNextTrigger,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** Several days, written as a list in the app’s language; it stays open while you pick. */
@Component({
  selector: 'app-multiple-date-picker-next-demo',
  imports: [
    ScDatePickerNext,
    ScDatePickerNextTrigger,
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
    <div
      scDatePickerNext
      #dp="scDatePickerNext"
      mode="multiple"
      [(value)]="days"
      class="w-fit"
    >
      <div scPopoverProvider [origin]="trigger.overlayOrigin" align="start">
        <button
          scDatePickerNextTrigger
          #trigger="scDatePickerNextTrigger"
          class="w-80"
        >
          <svg siCalendarIcon></svg>
          <span>{{ dp.text() || 'Pick days' }}</span>
        </button>
        <ng-template scPopoverPortal>
          <div scPopover class="w-auto p-0" aria-label="Choose days">
            <div
              scCalendar
              #cal="scCalendar"
              initialFocus
              aria-label="Choose days"
              [mode]="dp.mode()"
              [value]="dp.value()"
              (valueChange)="dp.pick($event)"
            >
              <div scCalendarHeader>
                <button scCalendarPrevious>
                  <svg siChevronLeftIcon></svg>
                  <span class="sr-only">Previous month</span>
                </button>
                <button scCalendarHeading>{{ cal.heading() }}</button>
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
      {{ dp.text() || 'Nothing picked.' }}
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class MultipleDatePickerNextDemo {
  readonly days = signal<ScCalendarValue>(null);
}
