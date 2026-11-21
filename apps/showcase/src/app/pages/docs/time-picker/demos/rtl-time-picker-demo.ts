import { Dir } from '@angular/cdk/bidi';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScTimeInput,
  ScTimePicker,
  ScTimePickerColumns,
  ScTimePickerTrigger,
} from '@semantic-components/ui';
import { SiClockIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the clock's columns stay left to right, AM/PM where the locale puts it; the arrows follow the columns as they show. */
@Component({
  selector: 'app-rtl-time-picker-demo',
  imports: [
    Dir,
    CdkOverlayOrigin,
    ScField,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    ScPopover,
    ScPopoverPortal,
    ScPopoverProvider,
    ScTimeInput,
    ScTimePicker,
    ScTimePickerColumns,
    ScTimePickerTrigger,
    SiClockIcon,
  ],
  template: `
    <div dir="rtl" lang="ar">
      <div scField class="w-44">
        <label scLabel>وقت الاجتماع</label>
        <div scTimePicker>
          <div scPopoverProvider [origin]="anchor" alignment="start">
            <div scInputGroup cdkOverlayOrigin #anchor="cdkOverlayOrigin">
              <div scTimeInput [(value)]="time"></div>
              <div scInputGroupAddon side="inline-end">
                <button scTimePickerTrigger>
                  <svg siClockIcon></svg>
                  <span class="sr-only">اختر وقتًا</span>
                </button>
              </div>
            </div>
            <ng-template scPopoverPortal>
              <div scPopover class="w-auto p-0" aria-label="اختر وقتًا">
                <div scTimePickerColumns></div>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTimePickerDemo {
  private readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('14:30'),
  );
}
