import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MultipleDatePickerDemo } from './multiple-date-picker-demo';

@Component({
  selector: 'app-multiple-date-picker-demo-container',
  imports: [DemoContainer, MultipleDatePickerDemo],
  template: `
    <app-demo-container
      title="Multiple"
      [code]="code"
      demoUrl="/demos/date-picker/multiple-date-picker-demo"
    >
      <app-multiple-date-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MultipleDatePickerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarHeading,
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

/** Several days, written as a list in the app’s language; it stays open while you pick. */
@Component({
  selector: 'app-multiple-date-picker-demo',
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
  template: \`
    <div
      scDatePicker
      #dp="scDatePicker"
      mode="multiple"
      [(value)]="days"
      class="w-fit"
    >
      <div scPopoverProvider [origin]="trigger.overlayOrigin" align="start">
        <button scDatePickerTrigger #trigger="scDatePickerTrigger" class="w-80">
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
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class MultipleDatePickerDemo {
  readonly days = signal<ScCalendarValue>(null);
}`;
}
