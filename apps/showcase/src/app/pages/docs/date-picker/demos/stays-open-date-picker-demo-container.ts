import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { StaysOpenDatePickerDemo } from './stays-open-date-picker-demo';

@Component({
  selector: 'app-stays-open-date-picker-demo-container',
  imports: [DemoContainer, StaysOpenDatePickerDemo],
  template: `
    <app-demo-container
      title="Stays open"
      [code]="code"
      demoUrl="/demos/date-picker/stays-open-date-picker-demo"
    >
      <app-stays-open-date-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StaysOpenDatePickerDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
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

/** [closeOnPick]="false": a day picked, the calendar stays open — try another — until Enter, Escape or a click outside. */
@Component({
  selector: 'app-stays-open-date-picker-demo',
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
    <div
      scDatePicker
      #dp="scDatePicker"
      [closeOnPick]="false"
      [(value)]="date"
      class="w-fit"
    >
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
export class StaysOpenDatePickerDemo {
  private readonly date = signal<ScCalendarValue>(null);
}`;
}
