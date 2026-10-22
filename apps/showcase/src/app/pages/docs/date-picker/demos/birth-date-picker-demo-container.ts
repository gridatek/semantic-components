import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BirthDatePickerDemo } from './birth-date-picker-demo';

@Component({
  selector: 'app-birth-date-picker-demo-container',
  imports: [DemoContainer, BirthDatePickerDemo],
  template: `
    <app-demo-container
      title="Date of birth"
      [code]="code"
      demoUrl="/demos/date-picker/birth-date-picker-demo"
    >
      <app-birth-date-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BirthDatePickerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarValue,
  ScDateInput,
  ScDatePicker,
  ScDatePickerTrigger,
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
  selector: 'app-birth-date-picker-demo',
  imports: [
    ScInputGroup,
    ScInputGroupAddon,
    ScDatePicker,
    ScDatePickerTrigger,
    ScPopoverProvider,
    ScPopoverPortal,
    ScPopover,
    ScCalendar,
    ScCalendarHeader,
    ScCalendarPrevious,
    ScCalendarNext,
    ScDateInput,
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
      <div scDatePicker #dp="scDatePicker" [maxDate]="adult" [(value)]="date">
        <div scPopoverProvider [origin]="trigger.overlayOrigin" align="end">
          <div scInputGroup>
            <input scDateInput placeholder="MM/DD/YYYY" />
            <div scInputGroupAddon align="inline-end">
              <button scDatePickerTrigger #trigger="scDatePickerTrigger">
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
                [value]="dp.draft()"
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
export class BirthDatePickerDemo {
  /** 18 years old today, at the latest. */
  readonly adult = Temporal.Now.plainDateISO().subtract({ years: 18 });
  readonly date = signal<ScCalendarValue>(null);
}`;
}
