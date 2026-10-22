import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicDatePickerNextDemo } from './basic-date-picker-next-demo';

@Component({
  selector: 'app-basic-date-picker-next-demo-container',
  imports: [DemoContainer, BasicDatePickerNextDemo],
  template: `
    <app-demo-container
      title="Basic"
      [code]="code"
      demoUrl="/demos/date-picker-next/basic-date-picker-next-demo"
    >
      <app-basic-date-picker-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicDatePickerNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
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

/** A button showing the day, opening the calendar — focus on its day. A pick closes it, focus back on the button; Escape closes it too. */
@Component({
  selector: 'app-basic-date-picker-next-demo',
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
  template: \`
    <div scDatePickerNext #dp="scDatePickerNext" [(value)]="date" class="w-fit">
      <div scPopoverProvider [origin]="trigger.overlayOrigin" align="start">
        <button
          scDatePickerNextTrigger
          #trigger="scDatePickerNextTrigger"
          class="w-64"
        >
          <svg siCalendarIcon></svg>
          <span>{{ dp.text() || 'Pick a date' }}</span>
        </button>
        <ng-template scPopoverPortal>
          <div scPopover class="w-auto p-0" aria-label="Choose a date">
            <div
              scCalendar
              #cal="scCalendar"
              initialFocus
              aria-label="Choose a date"
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
export class BasicDatePickerNextDemo {
  readonly date = signal<ScCalendarValue>(null);
}`;
}
