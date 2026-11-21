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
  ScTimePickerNext,
  ScTimePickerNextColumns,
  ScTimePickerNextDuration,
  ScTimePickerNextTrigger,
} from '@semantic-components/ui';
import { SiClockIcon } from '@semantic-icons/lucide-icons';

/** A start and an end: the end's startTime — earlier times can't be picked, and its duration counts from it. */
@Component({
  selector: 'app-range-time-picker-next-demo',
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
    ScTimePickerNext,
    ScTimePickerNextColumns,
    ScTimePickerNextDuration,
    ScTimePickerNextTrigger,
    SiClockIcon,
  ],
  template: `
    <div class="flex flex-wrap justify-center gap-4">
      <div scField class="w-44">
        <label scLabel>Start</label>
        <div scTimePickerNext>
          <div scPopoverProvider [origin]="startAnchor" alignment="start">
            <div scInputGroup cdkOverlayOrigin #startAnchor="cdkOverlayOrigin">
              <div scTimeInput [(value)]="start"></div>
              <div scInputGroupAddon side="inline-end">
                <button scTimePickerNextTrigger>
                  <svg siClockIcon></svg>
                  <span class="sr-only">Choose a start time</span>
                </button>
              </div>
            </div>
            <ng-template scPopoverPortal>
              <div
                scPopover
                class="w-auto p-0"
                aria-label="Choose a start time"
              >
                <div scTimePickerNextColumns></div>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
      <div scField class="w-44">
        <label scLabel>End</label>
        <div scTimePickerNext [startTime]="start() ?? undefined">
          <div scPopoverProvider [origin]="endAnchor" alignment="start">
            <div scInputGroup cdkOverlayOrigin #endAnchor="cdkOverlayOrigin">
              <div scTimeInput [(value)]="end"></div>
              <div scInputGroupAddon side="inline-end">
                <button scTimePickerNextTrigger>
                  <svg siClockIcon></svg>
                  <span class="sr-only">Choose an end time</span>
                </button>
              </div>
            </div>
            <ng-template scPopoverPortal>
              <div scPopover class="w-auto p-0" aria-label="Choose an end time">
                <div scTimePickerNextColumns></div>
                <div class="border-t px-3 py-2">
                  <span scTimePickerNextDuration></span>
                </div>
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
export class RangeTimePickerNextDemo {
  private readonly start = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('09:00'),
  );
  private readonly end = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('10:30'),
  );
}
