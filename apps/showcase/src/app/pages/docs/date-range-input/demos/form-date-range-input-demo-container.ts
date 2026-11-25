import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormDateRangeInputDemo } from './form-date-range-input-demo';

@Component({
  selector: 'app-form-date-range-input-demo-container',
  imports: [DemoContainer, FormDateRangeInputDemo],
  template: `
    <app-demo-container
      title="Form"
      [code]="code"
      demoUrl="/demos/date-range-input/form-date-range-input-demo"
    >
      <app-form-date-range-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormDateRangeInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, validate } from '@angular/forms/signals';
import {
  ScButton,
  type ScCalendarRange,
  ScDateInput,
  ScDateRangeInput,
  ScField,
  ScFieldErrors,
  ScLabel,
} from '@semantic-components/ui';

/** A [formField]: both ends required, the end after the start — from the schema, their messages under it once left. */
@Component({
  selector: 'app-form-date-range-input-demo',
  imports: [
    FormField,
    FormRoot,
    ScDateInput,
    ScDateRangeInput,
    ScField,
    ScLabel,
    ScButton,
    ScFieldErrors,
  ],
  template: \`
    <form [formRoot]="bookingForm" class="grid w-full max-w-80 gap-3">
      <div scField class="w-full">
        <label scLabel>Stay</label>
        <div scDateRangeInput [formField]="bookingForm.stay">
          <div scDateInput part="start" aria-label="Check-in"></div>
          <span aria-hidden="true" class="text-muted-foreground">–</span>
          <div scDateInput part="end" aria-label="Check-out"></div>
        </div>
        <div scFieldErrors></div>
      </div>
      <button scButton type="submit" class="justify-self-start">Book</button>
      @if (booked()) {
        <p class="text-sm" role="status">Booked: {{ booked() }}.</p>
      }
    </form>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class FormDateRangeInputDemo {
  private readonly model = signal<{ stay: ScCalendarRange | null }>({
    stay: null,
  });
  private readonly booked = signal('');
  private readonly bookingForm = form(
    this.model,
    (s) =>
      validate(s.stay, ({ value }) => {
        const stay = value();
        if (!stay?.from || !stay.to)
          return { kind: 'required', message: 'Pick both days.' };
        return Temporal.PlainDate.compare(stay.to, stay.from) <= 0
          ? { kind: 'order', message: 'Check out after you check in.' }
          : null;
      }),
    {
      submission: {
        action: async () => {
          const stay = this.model().stay;
          this.booked.set(
            \`\${stay?.from?.toString()} → \${stay?.to?.toString()}\`,
          );
        },
      },
    },
  );
}`;
}
