import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BirthDatePickerNextDemo } from './birth-date-picker-next-demo';

@Component({
  selector: 'app-birth-date-picker-next-demo-container',
  imports: [DemoContainer, BirthDatePickerNextDemo],
  template: `
    <app-demo-container
      title="Date of birth"
      [code]="code"
      demoUrl="/demos/date-picker-next/birth-date-picker-next-demo"
    >
      <app-birth-date-picker-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BirthDatePickerNextDemoContainer {
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

/** A date of birth: the calendar opens on the years — a year, its month, its day; 18 or older: nothing after this day 18 years ago. Typed too. */
@Component({
  selector: 'app-birth-date-picker-next-demo',
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
      <label scLabel>Date of birth</label>
      <div
        scDatePickerNext
        #dp="scDatePickerNext"
        [maxDate]="adult"
        [(value)]="date"
      >
        <div scPopoverProvider [origin]="trigger.overlayOrigin" align="end">
          <div scInputGroup>
            <input scDatePickerNextInput placeholder="MM/DD/YYYY" />
            <div scInputGroupAddon align="inline-end">
              <button
                scDatePickerNextTrigger
                #trigger="scDatePickerNextTrigger"
              >
                <svg siCalendarIcon></svg>
                <span class="sr-only">Choose your date of birth</span>
              </button>
            </div>
          </div>
          <ng-template scPopoverPortal>
            <div
              scPopover
              class="w-auto p-0"
              aria-label="Choose your date of birth"
            >
              <div
                scCalendar
                #cal="scCalendar"
                initialFocus
                startView="year"
                [maxDate]="adult"
                aria-label="Choose your date of birth"
                [mode]="dp.mode()"
                [value]="dp.value()"
                (valueChange)="dp.pick($event)"
              >
                <div scCalendarHeader>
                  <button scCalendarPrevious>
                    <svg siChevronLeftIcon></svg>
                    <span class="sr-only">
                      @switch (cal.view()) {
                        @case ('year') {
                          Previous years
                        }
                        @case ('month') {
                          Previous year
                        }
                        @default {
                          Previous month
                        }
                      }
                    </span>
                  </button>
                  <button scCalendarHeading>{{ cal.heading() }}</button>
                  <button scCalendarNext>
                    <svg siChevronRightIcon></svg>
                    <span class="sr-only">
                      @switch (cal.view()) {
                        @case ('year') {
                          Next years
                        }
                        @case ('month') {
                          Next year
                        }
                        @default {
                          Next month
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
      <p scFieldDescription>You must be 18 or older.</p>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ dp.text() || 'Nothing picked.' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class BirthDatePickerNextDemo {
  /** 18 years old today, at the latest. */
  readonly adult = Temporal.Now.plainDateISO().subtract({ years: 18 });
  readonly date = signal<ScCalendarValue>(null);
}`;
}
