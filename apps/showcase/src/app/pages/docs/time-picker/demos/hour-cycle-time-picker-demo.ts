import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, ViewEncapsulation, signal } from '@angular/core';
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

/** The time input's clock: AM/PM's column on a 12-hour clock, none on 24; a seconds column with granularity="second". */
@Component({
  selector: 'app-hour-cycle-time-picker-demo',
  imports: [
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
    <div class="flex flex-wrap justify-center gap-4">
      <div scField class="w-44">
        <label scLabel>12-hour clock</label>
        <div scTimePicker>
          <div scPopoverProvider [origin]="twelve" alignment="start">
            <div scInputGroup cdkOverlayOrigin #twelve="cdkOverlayOrigin">
              <div scTimeInput [hourCycle]="12" [(value)]="afternoon"></div>
              <div scInputGroupAddon side="inline-end">
                <button scTimePickerTrigger>
                  <svg siClockIcon></svg>
                  <span class="sr-only">Choose a time</span>
                </button>
              </div>
            </div>
            <ng-template scPopoverPortal>
              <div scPopover class="w-auto p-0" aria-label="Choose a time">
                <div scTimePickerColumns></div>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
      <div scField class="w-44">
        <label scLabel>With seconds</label>
        <div scTimePicker>
          <div scPopoverProvider [origin]="seconds" alignment="start">
            <div scInputGroup cdkOverlayOrigin #seconds="cdkOverlayOrigin">
              <div
                scTimeInput
                [hourCycle]="24"
                granularity="second"
                [(value)]="evening"
              ></div>
              <div scInputGroupAddon side="inline-end">
                <button scTimePickerTrigger>
                  <svg siClockIcon></svg>
                  <span class="sr-only">Choose a time</span>
                </button>
              </div>
            </div>
            <ng-template scPopoverPortal>
              <div scPopover class="w-auto p-0" aria-label="Choose a time">
                <div scTimePickerColumns></div>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class HourCycleTimePickerDemo {
  private readonly afternoon = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('14:30'),
  );
  private readonly evening = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('18:45:30'),
  );
}
