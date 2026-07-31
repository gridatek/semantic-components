import { Temporal } from '@js-temporal/polyfill';
import { Component, ViewEncapsulation, signal } from '@angular/core';
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
  ScDateRangePickerTrigger,
} from '@semantic-components/ui-lab';
import {
  SiCalendarIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-formats-date-range-picker-demo',
  imports: [
    ScDateRangePicker,
    ScDateRangePickerTrigger,
    ScDateRangePickerFooter,
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
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <span class="text-muted-foreground w-12 text-sm">Short:</span>
        <div
          scDateRangePicker
          dateFormat="short"
          placeholder="Short format"
          [(value)]="shortRange"
          #drpShort="scDateRangePicker"
        >
          <div
            scPopoverProvider
            [origin]="triggerShort.overlayOrigin"
            align="start"
          >
            <button
              scDateRangePickerTrigger
              #triggerShort="scDateRangePickerTrigger"
            >
              <svg siCalendarIcon class="mr-2 size-4"></svg>
              <span
                [class]="drpShort.displayText() ? '' : 'text-muted-foreground'"
              >
                {{ drpShort.displayText() || drpShort.placeholder() }}
              </span>
            </button>
            <ng-template scPopoverPortal>
              <div scPopover class="w-auto p-0">
                <div class="p-3">
                  <div
                    scCalendar
                    mode="range"
                    [value]="drpShort.value()"
                    (valueChange)="drpShort.onValueChange($event)"
                    #calShort="scCalendar"
                  >
                    <div scCalendarHeader>
                      <button scCalendarPrevious>
                        <svg siChevronLeftIcon class="size-4"></svg>
                        <span class="sr-only">Go to previous</span>
                      </button>
                      <button scCalendarHeading>
                        {{ calShort.heading() }}
                      </button>
                      <button scCalendarNext>
                        <svg siChevronRightIcon class="size-4"></svg>
                        <span class="sr-only">Go to next</span>
                      </button>
                    </div>
                  </div>
                  <div scDateRangePickerFooter></div>
                </div>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <span class="text-muted-foreground w-12 text-sm">Long:</span>
        <div
          scDateRangePicker
          dateFormat="long"
          placeholder="Long format"
          [(value)]="longRange"
          #drpLong="scDateRangePicker"
        >
          <div
            scPopoverProvider
            [origin]="triggerLong.overlayOrigin"
            align="start"
          >
            <button
              scDateRangePickerTrigger
              #triggerLong="scDateRangePickerTrigger"
            >
              <svg siCalendarIcon class="mr-2 size-4"></svg>
              <span
                [class]="drpLong.displayText() ? '' : 'text-muted-foreground'"
              >
                {{ drpLong.displayText() || drpLong.placeholder() }}
              </span>
            </button>
            <ng-template scPopoverPortal>
              <div scPopover class="w-auto p-0">
                <div class="p-3">
                  <div
                    scCalendar
                    mode="range"
                    [value]="drpLong.value()"
                    (valueChange)="drpLong.onValueChange($event)"
                    #calLong="scCalendar"
                  >
                    <div scCalendarHeader>
                      <button scCalendarPrevious>
                        <svg siChevronLeftIcon class="size-4"></svg>
                        <span class="sr-only">Go to previous</span>
                      </button>
                      <button scCalendarHeading>
                        {{ calLong.heading() }}
                      </button>
                      <button scCalendarNext>
                        <svg siChevronRightIcon class="size-4"></svg>
                        <span class="sr-only">Go to next</span>
                      </button>
                    </div>
                  </div>
                  <div scDateRangePickerFooter></div>
                </div>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <span class="text-muted-foreground w-12 text-sm">ISO:</span>
        <div
          scDateRangePicker
          dateFormat="iso"
          placeholder="ISO format"
          [(value)]="isoRange"
          #drpIso="scDateRangePicker"
        >
          <div
            scPopoverProvider
            [origin]="triggerIso.overlayOrigin"
            align="start"
          >
            <button
              scDateRangePickerTrigger
              #triggerIso="scDateRangePickerTrigger"
            >
              <svg siCalendarIcon class="mr-2 size-4"></svg>
              <span
                [class]="drpIso.displayText() ? '' : 'text-muted-foreground'"
              >
                {{ drpIso.displayText() || drpIso.placeholder() }}
              </span>
            </button>
            <ng-template scPopoverPortal>
              <div scPopover class="w-auto p-0">
                <div class="p-3">
                  <div
                    scCalendar
                    mode="range"
                    [value]="drpIso.value()"
                    (valueChange)="drpIso.onValueChange($event)"
                    #calIso="scCalendar"
                  >
                    <div scCalendarHeader>
                      <button scCalendarPrevious>
                        <svg siChevronLeftIcon class="size-4"></svg>
                        <span class="sr-only">Go to previous</span>
                      </button>
                      <button scCalendarHeading>
                        {{ calIso.heading() }}
                      </button>
                      <button scCalendarNext>
                        <svg siChevronRightIcon class="size-4"></svg>
                        <span class="sr-only">Go to next</span>
                      </button>
                    </div>
                  </div>
                  <div scDateRangePickerFooter></div>
                </div>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormatsDateRangePickerDemo {
  private readonly today = Temporal.Now.plainDateISO();
  private readonly weekAgo = this.today.subtract({ days: 6 });

  readonly shortRange = signal<ScDateRange>({
    from: this.weekAgo,
    to: this.today,
  });
  readonly longRange = signal<ScDateRange>({
    from: this.weekAgo,
    to: this.today,
  });
  readonly isoRange = signal<ScDateRange>({
    from: this.weekAgo,
    to: this.today,
  });
}
