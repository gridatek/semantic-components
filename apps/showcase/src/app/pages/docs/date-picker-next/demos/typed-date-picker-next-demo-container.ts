import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TypedDatePickerNextDemo } from './typed-date-picker-next-demo';

@Component({
  selector: 'app-typed-date-picker-next-demo-container',
  imports: [DemoContainer, TypedDatePickerNextDemo],
  template: `
    <app-demo-container
      title="Typed"
      [code]="code"
      demoUrl="/demos/date-picker-next/typed-date-picker-next-demo"
    >
      <app-typed-date-picker-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TypedDatePickerNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarHeading,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarValue,
  ScDatePickerNext,
  ScDatePickerNextInput,
  ScDatePickerNextTrigger,
  ScField,
  ScFieldDescription,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** Typed, or picked: the locale’s numeric order (here 10/14/2026) or ISO, read on Enter or leaving; text that is not a day stays, marked. The button in the field opens the calendar. */
@Component({
  selector: 'app-typed-date-picker-next-demo',
  imports: [
    ScInputGroup,
    ScInputGroupAddon,
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
    ScDatePickerNextInput,
    ScField,
    ScFieldDescription,
    ScLabel,
    SiCalendarIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div scField class="w-64">
      <label scLabel>Start date</label>
      <div scDatePickerNext #dp="scDatePickerNext" [(value)]="date">
        <div scPopoverProvider [origin]="trigger.overlayOrigin" align="end">
          <div scInputGroup>
            <input scDatePickerNextInput placeholder="MM/DD/YYYY" />
            <div scInputGroupAddon align="inline-end">
              <button
                scDatePickerNextTrigger
                #trigger="scDatePickerNextTrigger"
              >
                <svg siCalendarIcon></svg>
                <span class="sr-only">Choose a date</span>
              </button>
            </div>
          </div>
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
      <p scFieldDescription>Month, day, year.</p>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ dp.text() || 'Nothing picked.' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class TypedDatePickerNextDemo {
  readonly date = signal<ScCalendarValue>(null);
}`;
}
