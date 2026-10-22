import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScButton,
  ScField,
  ScFieldErrors,
  ScLabel,
  ScTimeInput,
} from '@semantic-components/ui';

/** A [formField]: required, from the schema — null until every part is filled; marked once left. */
@Component({
  selector: 'app-form-time-input-demo',
  imports: [
    FormField,
    FormRoot,
    ScTimeInput,
    ScField,
    ScLabel,
    ScFieldErrors,
    ScButton,
  ],
  template: `
    <form [formRoot]="alarmForm" class="grid w-48 gap-3">
      <div scField>
        <label scLabel>Alarm</label>
        <div scTimeInput [formField]="alarmForm.alarm"></div>
        <div scFieldErrors></div>
      </div>
      <button scButton type="submit" class="justify-self-start">Set</button>
      @if (set()) {
        <p class="text-sm" role="status">Alarm set for {{ set() }}.</p>
      }
    </form>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class FormTimeInputDemo {
  readonly model = signal<{ alarm: Temporal.PlainTime | null }>({
    alarm: null,
  });
  readonly set = signal('');
  readonly alarmForm = form(
    this.model,
    (s) => required(s.alarm, { message: 'Set a time.' }),
    {
      submission: {
        action: async () =>
          this.set.set(
            this.model().alarm?.toString({ smallestUnit: 'minute' }) ?? '',
          ),
      },
    },
  );
}
