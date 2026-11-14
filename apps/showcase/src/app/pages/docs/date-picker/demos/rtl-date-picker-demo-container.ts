import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlDatePickerDemo } from './rtl-date-picker-demo';

@Component({
  selector: 'app-rtl-date-picker-demo-container',
  imports: [DemoContainer, RtlDatePickerDemo],
  template: `
    <app-demo-container
      title="RTL"
      description="In a right-to-left page: the button and the calendar mirrored (its arrows too), the day written in Arabic."
      demoUrl="/demos/date-picker/rtl-date-picker-demo"
      [code]="code"
    >
      <app-rtl-date-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlDatePickerDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarValue,
  ScDatePicker,
  ScDatePickerTrigger,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the button and the calendar mirrored (its arrows too), the day written in Arabic. */
@Component({
  selector: 'app-rtl-date-picker-demo',
  imports: [
    Dir,
    ScDatePicker,
    ScDatePickerTrigger,
    ScPopoverProvider,
    ScPopoverPortal,
    ScPopover,
    ScCalendar,
    ScCalendarHeader,
    ScCalendarPrevious,
    ScCalendarNext,
    SiCalendarIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="flex flex-col items-center gap-2">
      <div scDatePicker #dp="scDatePicker" [(value)]="date" class="w-fit">
        <div
          scPopoverProvider
          [origin]="trigger.overlayOrigin"
          alignment="start"
        >
          <button
            scDatePickerTrigger
            #trigger="scDatePickerTrigger"
            class="w-64"
          >
            <svg siCalendarIcon></svg>
            <span>{{ dp.text() || 'اختر تاريخًا' }}</span>
          </button>
          <ng-template scPopoverPortal>
            <div scPopover class="w-auto p-0" aria-label="اختر تاريخًا">
              <div
                scCalendar
                initialFocus
                class="[--cell-size:--spacing(12)]"
                aria-label="اختر تاريخًا"
                [mode]="dp.mode()"
                [value]="dp.draft()"
                (valueChange)="dp.pick($event)"
              >
                <div scCalendarHeader>
                  <button scCalendarPrevious>
                    <svg siChevronLeftIcon></svg>
                    <span class="sr-only">الشهر السابق</span>
                  </button>
                  <button scCalendarNext>
                    <svg siChevronRightIcon></svg>
                    <span class="sr-only">الشهر التالي</span>
                  </button>
                </div>
              </div>
            </div>
          </ng-template>
        </div>
      </div>
      <p class="text-muted-foreground text-sm" data-testid="picked">
        {{ dp.text() || 'لم يُختر شيء.' }}
      </p>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlDatePickerDemo {
  readonly date = signal<ScCalendarValue>(null);
}`;
}
