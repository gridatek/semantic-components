import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AnalyticsDateRangePickerDemo } from './analytics-date-range-picker-demo';

@Component({
  selector: 'app-analytics-date-range-picker-demo-container',
  imports: [DemoContainer, AnalyticsDateRangePickerDemo],
  template: `
    <app-demo-container
      title="Analytics Example"
      demoUrl="/demos/date-range-picker/analytics-date-range-picker-demo"
      [code]="code"
    >
      <app-analytics-date-range-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsDateRangePickerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarHeading,
  ScCalendarNext,
  ScCalendarPrevious,
  ScDateRange,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
} from '@semantic-components/ui';
import {
  ScDateRangePicker,
  ScDateRangePickerFooter,
  ScDateRangePickerPreset,
  ScDateRangePickerPresets,
  ScDateRangePickerTrigger,
  ScDateRangePreset,
  createScDateRangePresets,
} from '@semantic-components/ui-lab';
import {
  SiCalendarIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-analytics-date-range-picker-demo',
  imports: [
    ScDateRangePicker,
    ScDateRangePickerTrigger,
    ScDateRangePickerFooter,
    ScDateRangePickerPresets,
    ScDateRangePickerPreset,
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
    <div class="max-w-2xl space-y-4 rounded-lg border p-4">
      <div class="flex items-center justify-between">
        <h4 class="font-medium">Analytics Dashboard</h4>
        <div scDateRangePicker [(value)]="range" #drp="scDateRangePicker">
          <div scPopoverProvider [origin]="trigger.overlayOrigin" align="start">
            <button
              scDateRangePickerTrigger
              #trigger="scDateRangePickerTrigger"
            >
              <svg siCalendarIcon class="mr-2 size-4"></svg>
              <span [class]="drp.displayText() ? '' : 'text-muted-foreground'">
                {{ drp.displayText() || 'Select period' }}
              </span>
            </button>
            <ng-template scPopoverPortal>
              <div scPopover class="w-auto p-0">
                <div class="flex">
                  <div scDateRangePickerPresets>
                    @for (preset of presets; track preset.label) {
                      <button scDateRangePickerPreset [value]="preset.value">
                        {{ preset.label }}
                      </button>
                    }
                  </div>
                  <div class="p-3">
                    <div
                      scCalendar
                      mode="range"
                      [value]="drp.value()"
                      (valueChange)="drp.onValueChange($event)"
                      #cal="scCalendar"
                    >
                      <div scCalendarHeader>
                        <button scCalendarPrevious>
                          <svg siChevronLeftIcon class="size-4"></svg>
                          <span class="sr-only">
                            @switch (cal.viewMode()) {
                              @case ('day') {
                                Go to previous month
                              }
                              @case ('month') {
                                Go to previous year
                              }
                              @case ('year') {
                                Go to previous decade
                              }
                            }
                          </span>
                        </button>
                        <button scCalendarHeading>{{ cal.heading() }}</button>
                        <button scCalendarNext>
                          <svg siChevronRightIcon class="size-4"></svg>
                          <span class="sr-only">
                            @switch (cal.viewMode()) {
                              @case ('day') {
                                Go to next month
                              }
                              @case ('month') {
                                Go to next year
                              }
                              @case ('year') {
                                Go to next decade
                              }
                            }
                          </span>
                        </button>
                      </div>
                    </div>
                    <div scDateRangePickerFooter></div>
                  </div>
                </div>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4">
        <div class="bg-muted rounded-lg p-4">
          <div class="text-2xl font-bold">12,345</div>
          <div class="text-muted-foreground text-sm">Page Views</div>
        </div>
        <div class="bg-muted rounded-lg p-4">
          <div class="text-2xl font-bold">1,234</div>
          <div class="text-muted-foreground text-sm">Unique Visitors</div>
        </div>
        <div class="bg-muted rounded-lg p-4">
          <div class="text-2xl font-bold">5.2%</div>
          <div class="text-muted-foreground text-sm">Conversion Rate</div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsDateRangePickerDemo {
  readonly range = signal<ScDateRange>({ from: undefined, to: undefined });
  readonly presets: ScDateRangePreset[] = createScDateRangePresets();
}`;
}
