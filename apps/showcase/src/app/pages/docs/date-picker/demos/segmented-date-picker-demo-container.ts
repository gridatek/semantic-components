import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SegmentedDatePickerDemo } from './segmented-date-picker-demo';

@Component({
  selector: 'app-segmented-date-picker-demo-container',
  imports: [DemoContainer, SegmentedDatePickerDemo],
  template: `
    <app-demo-container
      title="Segmented"
      [code]="code"
      demoUrl="/demos/date-picker/segmented-date-picker-demo"
    >
      <app-segmented-date-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SegmentedDatePickerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarValue,
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
  ScSegmentedDateInput,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** scSegmentedDateInput in the picker: typed part by part, the picker’s value — or picked. The button in the field opens the calendar. */
@Component({
  selector: 'app-segmented-date-picker-demo',
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
    ScSegmentedDateInput,
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
      <div scDatePicker #dp="scDatePicker" [(value)]="date">
        <div scPopoverProvider [origin]="trigger.overlayOrigin" align="end">
          <div scInputGroup>
            <div scSegmentedDateInput></div>
            <div scInputGroupAddon align="inline-end">
              <button scDatePickerTrigger #trigger="scDatePickerTrigger">
                <svg siCalendarIcon></svg>
                <span class="sr-only">Choose a date</span>
              </button>
            </div>
          </div>
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
      <p scFieldDescription>Month, day, year.</p>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ dp.text() || 'Nothing picked.' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class SegmentedDatePickerDemo {
  readonly date = signal<ScCalendarValue>(
    Temporal.PlainDate.from('2026-10-14'),
  );
}`;
}
