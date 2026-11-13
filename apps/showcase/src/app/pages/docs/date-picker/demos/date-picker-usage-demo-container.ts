import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { DatePickerUsageDemo } from './date-picker-usage-demo';

@Component({
  selector: 'app-date-picker-usage-demo-container',
  imports: [UsageCode, DatePickerUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-date-picker-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DatePickerUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarValue,
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

/** A button showing the day, opening the calendar — focus on its day. A pick closes it, focus back on the button; Escape closes it too. */
@Component({
  selector: 'app-date-picker-usage-demo',
  imports: [
    ScDatePicker,
    ScDatePickerTrigger,
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
    <div scDatePicker #dp="scDatePicker" [(value)]="date" class="w-fit">
      <div scPopoverProvider [origin]="trigger.overlayOrigin" alignment="start">
        <button scDatePickerTrigger #trigger="scDatePickerTrigger" class="w-64">
          <svg siCalendarIcon></svg>
          <span>{{ dp.text() || 'Pick a date' }}</span>
        </button>
        <ng-template scPopoverPortal>
          <div scPopover class="w-auto p-0" aria-label="Choose a date">
            <div
              scCalendar
              initialFocus
              aria-label="Choose a date"
              [mode]="dp.mode()"
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
      {{ dp.text() || 'Nothing picked.' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class DatePickerUsageDemo {
  readonly date = signal<ScCalendarValue>(null);
}`;
}
