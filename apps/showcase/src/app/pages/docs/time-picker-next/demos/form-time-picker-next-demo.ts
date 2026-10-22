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
  ScTimePickerNextList,
  ScTimePickerNextTrigger,
} from '@semantic-components/ui';
import { SiClockIcon } from '@semantic-icons/lucide-icons';

/** The [formField] is on the time input; the list fills it. Required — marked once the list closes or the input is left. */
@Component({
  selector: 'app-form-time-picker-next-demo',
  imports: [
    FormField,
    FormRoot,
    ScTimePickerNext,
    ScTimePickerNextTrigger,
    ScTimePickerNextList,
    ScTimeInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScPopoverProvider,
    ScPopoverPortal,
    ScPopover,
    ScField,
    ScLabel,
    ScFieldErrors,
    ScButton,
    SiClockIcon,
  ],
  template: `
    <form [formRoot]="tableForm" class="grid w-48 gap-3">
      <div scField>
        <label scLabel>Table at</label>
        <div scTimePickerNext>
          <div scPopoverProvider [origin]="trigger.overlayOrigin" align="end">
            <div scInputGroup>
              <div scTimeInput [formField]="tableForm.at"></div>
              <div scInputGroupAddon align="inline-end">
                <button
                  scTimePickerNextTrigger
                  #trigger="scTimePickerNextTrigger"
                >
                  <svg siClockIcon></svg>
                  <span class="sr-only">Choose a time</span>
                </button>
              </div>
            </div>
            <ng-template scPopoverPortal>
              <div scPopover class="w-auto p-0" aria-label="Choose a time">
                <div scTimePickerNextList aria-label="Times"></div>
              </div>
            </ng-template>
          </div>
        </div>
        <div scFieldErrors></div>
      </div>
      <button scButton type="submit" class="justify-self-start">Book</button>
      @if (booked()) {
        <p class="text-sm" role="status">Table booked at {{ booked() }}.</p>
      }
    </form>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class FormTimePickerNextDemo {
  readonly model = signal<{ at: Temporal.PlainTime | null }>({ at: null });
  readonly booked = signal('');
  readonly tableForm = form(
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
