import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarValue,
  ScDatePicker,
  ScDatePickerPreset,
  ScDatePickerPresets,
  ScDatePickerTrigger,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  scDateRangePresets,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** scDatePickerPreset buttons beside the calendar: a preset is picked as the calendar’s pick would be — and pressed while it is the value. scDateRangePresets gives the common ones, named by you. */
@Component({
  selector: 'app-presets-date-range-picker-demo',
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
    ScDatePickerPreset,
    ScDatePickerPresets,
    SiCalendarIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div
      scDatePicker
      #dp="scDatePicker"
      mode="range"
      [(value)]="range"
      class="w-fit"
    >
      <div scPopoverProvider [origin]="trigger.overlayOrigin" align="start">
        <button scDatePickerTrigger #trigger="scDatePickerTrigger">
          <svg siCalendarIcon></svg>
          <span>{{ dp.text() || 'Pick dates' }}</span>
        </button>
        <ng-template scPopoverPortal>
          <div
            scPopover
            class="w-auto flex-row gap-0 p-0"
            aria-label="Choose dates"
          >
            <div scDatePickerPresets aria-label="Presets">
              @for (preset of presets; track preset.label) {
                <button scDatePickerPreset [value]="preset.value">
                  {{ preset.label }}
                </button>
              }
            </div>
            <div
              scCalendar
              initialFocus
              aria-label="Choose dates"
              [mode]="dp.mode()"
              [numberOfMonths]="1"
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
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class PresetsDateRangePickerDemo {
  readonly range = signal<ScCalendarValue>(null);
  readonly presets = scDateRangePresets({
    today: 'Today',
    yesterday: 'Yesterday',
    last7Days: 'Last 7 days',
    last30Days: 'Last 30 days',
    thisMonth: 'This month',
    lastMonth: 'Last month',
  });
}
