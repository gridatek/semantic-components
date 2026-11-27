import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ConstraintsDateRangePickerDemo } from './constraints-date-range-picker-demo';

@Component({
  selector: 'app-constraints-date-range-picker-demo-container',
  imports: [DemoContainer, ConstraintsDateRangePickerDemo],
  template: `
    <app-demo-container
      title="Constraints"
      [code]="code"
      demoUrl="/demos/date-range-picker/constraints-date-range-picker-demo"
    >
      <app-constraints-date-range-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ConstraintsDateRangePickerDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarRange,
  ScDateRangePicker,
  ScDateRangePickerTrigger,
  ScInputButton,
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

/** minDate and maxDate on the picker and its calendar: from today, up to 90 days ahead. */
@Component({
  selector: 'app-constraints-date-range-picker-demo',
  imports: [
    ScInputButton,
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
  template: \`
    <div
      scDateRangePicker
      #dp="scDateRangePicker"
      [minDate]="today"
      [maxDate]="latest"
      [(value)]="range"
      class="w-72"
    >
      <div scPopoverProvider [origin]="trigger.overlayOrigin" alignment="start">
        <button
          scInputButton
          scDateRangePickerTrigger
          #trigger="scDateRangePickerTrigger"
        >
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
              [minDate]="today"
              [maxDate]="latest"
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
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class ConstraintsDateRangePickerDemo {
  // The value as written: Intl's, in the user's digits — or your own format.
  private readonly formatDate = injectFormatDate();
  private readonly range = signal<ScCalendarRange | null>(null);
  private readonly today = Temporal.Now.plainDateISO();
  private readonly latest = this.today.add({ days: 90 });
}`;
}
