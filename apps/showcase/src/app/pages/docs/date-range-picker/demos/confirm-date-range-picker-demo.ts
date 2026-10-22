import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarFooter,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarValue,
  ScDatePicker,
  ScDatePickerApply,
  ScDatePickerCancel,
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

/** confirm: picks and presets are a draft, kept by scDatePickerApply — Cancel, Escape or a click outside drop it. Two months and presets, as on an analytics page. */
@Component({
  selector: 'app-confirm-date-range-picker-demo',
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
    ScDatePickerApply,
    ScDatePickerCancel,
    ScCalendarFooter,
    SiCalendarIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div
      scDatePicker
      #dp="scDatePicker"
      mode="range"
      confirm
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
              [numberOfMonths]="2"
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
              <div scCalendarFooter class="justify-end">
                <button scDatePickerCancel>Cancel</button>
                <button scDatePickerApply>Apply</button>
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
export class ConfirmDateRangePickerDemo {
  readonly presets = scDateRangePresets({
    today: 'Today',
    yesterday: 'Yesterday',
    last7Days: 'Last 7 days',
    last30Days: 'Last 30 days',
    thisMonth: 'This month',
    lastMonth: 'Last month',
  });
  readonly range = signal<ScCalendarValue>(this.presets[2].value);
}
