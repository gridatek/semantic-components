import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScButton,
  ScField,
  ScFieldErrors,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScTimeInput,
  ScTimePickerNext,
  ScTimePickerNextColumns,
  ScTimePickerNextTrigger,
} from '@semantic-components/ui';
import { SiClockIcon } from '@semantic-icons/lucide-icons';

/** A [formField] on the time input: required, from the schema — its message under it once the columns close. */
@Component({
  selector: 'app-form-time-picker-next-demo',
  imports: [
    CdkOverlayOrigin,
    FormField,
    FormRoot,
    ScButton,
    ScField,
    ScFieldErrors,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    ScPopover,
    ScPopoverPortal,
    ScPopoverProvider,
    ScTimeInput,
    ScTimePickerNext,
    ScTimePickerNextColumns,
    ScTimePickerNextTrigger,
    SiClockIcon,
  ],
  template: `
    <form [formRoot]="callForm" class="grid w-48 gap-3">
      <div scField class="w-full">
        <label scLabel>Call at</label>
        <div scTimePickerNext>
          <div scPopoverProvider [origin]="anchor" alignment="start">
            <div scInputGroup cdkOverlayOrigin #anchor="cdkOverlayOrigin">
              <div scTimeInput [formField]="callForm.at"></div>
              <div scInputGroupAddon side="inline-end">
                <button scTimePickerNextTrigger>
                  <svg siClockIcon></svg>
                  <span class="sr-only">Choose a time</span>
                </button>
              </div>
            </div>
            <ng-template scPopoverPortal>
              <div scPopover class="w-auto p-0" aria-label="Choose a time">
                <div scTimePickerNextColumns></div>
              </div>
            </ng-template>
          </div>
        </div>
        <div scFieldErrors></div>
      </div>
      <button scButton type="submit" class="justify-self-start">Book</button>
      @if (booked()) {
        <p class="text-sm" role="status">Call booked at {{ booked() }}.</p>
      }
    </form>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class FormTimePickerNextDemo {
  private readonly model = signal<{ at: Temporal.PlainTime | null }>({
    at: null,
  });
  private readonly booked = signal('');
  private readonly callForm = form(
    this.model,
    (s) => required(s.at, { message: 'Pick a time.' }),
    {
      submission: {
        action: async () =>
          this.booked.set(
            this.model().at?.toString({ smallestUnit: 'minute' }) ?? '',
          ),
      },
    },
  );
}
