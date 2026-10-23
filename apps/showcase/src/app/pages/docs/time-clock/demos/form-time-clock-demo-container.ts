import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormTimeClockDemo } from './form-time-clock-demo';

@Component({
  selector: 'app-form-time-clock-demo-container',
  imports: [DemoContainer, FormTimeClockDemo],
  template: `
    <app-demo-container
      title="In a form"
      [code]="code"
      demoUrl="/demos/time-clock/form-time-clock-demo"
    >
      <app-form-time-clock-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormTimeClockDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScButton,
  ScField,
  ScFieldErrors,
  ScTimeClock,
  ScTimeClockDial,
  ScTimeClockHeader,
} from '@semantic-components/ui';

/** A [formField]: required, from the schema; marked once left. */
@Component({
  selector: 'app-form-time-clock-demo',
  imports: [
    FormField,
    FormRoot,
    ScButton,
    ScFieldErrors,
    ScField,
    ScTimeClock,
    ScTimeClockHeader,
    ScTimeClockDial,
  ],
  template: \`
    <form [formRoot]="callForm" class="flex flex-col items-center gap-3">
      <div scField class="items-center">
        <div scTimeClock #clock="scTimeClock" [formField]="callForm.at">
          <div scTimeClockHeader></div>
          <div
            scTimeClockDial
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
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class FormTimeClockDemo {
  readonly model = signal<{ at: Temporal.PlainTime | null }>({ at: null });
  readonly booked = signal('');
  readonly callForm = form(
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
}`;
}
