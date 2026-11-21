import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { StepsDateTimePickerDemo } from './steps-date-time-picker-demo';

@Component({
  selector: 'app-steps-date-time-picker-demo-container',
  imports: [DemoContainer, StepsDateTimePickerDemo],
  template: `
    <app-demo-container
      title="Steps"
      [code]="code"
      demoUrl="/demos/date-time-picker/steps-date-time-picker-demo"
    >
      <app-steps-date-time-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StepsDateTimePickerDemoContainer {
  private readonly code = `import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  ScDateTimeInput,
  ScDateTimePicker,
  ScDateTimePickerTrigger,
  ScField,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScTimePickerColumns,
} from '@semantic-components/ui';
import {
  SiCalendarClockIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** minuteStep: the minute column every 15 minutes. Typing still takes any minute. */
@Component({
  selector: 'app-steps-date-time-picker-demo',
  imports: [
    CdkOverlayOrigin,
    ScCalendar,
    ScCalendarHeader,
    ScCalendarNext,
    ScCalendarPrevious,
    ScDateTimeInput,
    ScDateTimePicker,
    ScDateTimePickerTrigger,
    ScField,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    ScPopover,
    ScPopoverPortal,
    ScPopoverProvider,
    ScTimePickerColumns,
    SiCalendarClockIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div scField class="w-64">
      <label scLabel>Meeting</label>
      <div scDateTimePicker #dtp="scDateTimePicker" [minuteStep]="15">
        <div scPopoverProvider [origin]="anchor" alignment="start">
          <div scInputGroup cdkOverlayOrigin #anchor="cdkOverlayOrigin">
            <div scDateTimeInput [(value)]="when"></div>
            <div scInputGroupAddon side="inline-end">
              <button scDateTimePickerTrigger>
                <svg siCalendarClockIcon></svg>
                <span class="sr-only">Choose a date and time</span>
              </button>
            </div>
          </div>
          <ng-template scPopoverPortal>
            <div
              scPopover
              class="w-auto flex-row gap-0 p-0"
              aria-label="Choose a date and time"
            >
              <div
                scCalendar
                initialFocus
                aria-label="Choose a date"
                [value]="dtp.date()"
                [minDate]="dtp.minDate()"
                [maxDate]="dtp.maxDate()"
                [unavailable]="dtp.unavailable()"
                (valueChange)="dtp.pickDate($event)"
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
              <div
                scTimePickerColumns
                [initialFocus]="false"
                class="border-s"
              ></div>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ when()?.toString() ?? 'No date and time.' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class StepsDateTimePickerDemo {
  private readonly when = signal<Temporal.PlainDateTime | null>(
    Temporal.PlainDateTime.from('2026-11-02T10:15'),
  );
}`;
}
