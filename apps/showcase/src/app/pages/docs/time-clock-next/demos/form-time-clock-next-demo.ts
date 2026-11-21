import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScButton,
  ScField,
  ScFieldErrors,
  ScTimeClockNext,
  ScTimeClockNextDial,
  ScTimeClockNextHeader,
} from '@semantic-components/ui';

/** A [formField]: required, from the schema; marked once left. */
@Component({
  selector: 'app-form-time-clock-next-demo',
  imports: [
    FormField,
    FormRoot,
    ScButton,
    ScFieldErrors,
    ScField,
    ScTimeClockNext,
    ScTimeClockNextHeader,
    ScTimeClockNextDial,
  ],
  template: `
    <form [formRoot]="callForm" class="flex flex-col items-center gap-3">
      <div scField class="items-center">
        <div scTimeClockNext #clock="scTimeClockNext" [formField]="callForm.at">
          <div scTimeClockNextHeader></div>
          <div
            scTimeClockNextDial
            [attr.aria-label]="clock.view() === 'hours' ? 'Hours' : 'Minutes'"
          ></div>
        </div>
        <div scFieldErrors></div>
      </div>
      <button scButton type="submit">Book a call</button>
      @if (booked()) {
        <p class="text-sm" role="status">Call booked at {{ booked() }}.</p>
      }
    </form>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class FormTimeClockNextDemo {
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
