import { JsonPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, minLength } from '@angular/forms/signals';
import {
  ScCheckbox,
  ScCheckboxGroup,
  ScField,
  ScFieldDescription,
  ScFieldset,
  ScFrame,
  ScLegend,
} from '@semantic-components/ui';

/** Bound with [formField] on the group, in a fieldset: at least one ticked (minLength), the form's value. */
@Component({
  selector: 'app-form-checkbox-group-demo',
  imports: [
    FormField,
    JsonPipe,
    ScCheckbox,
    ScCheckboxGroup,
    ScFieldDescription,
    ScFieldset,
    ScFrame,
    ScLegend,
    ScField,
  ],
  template: `
    <div class="flex w-72 flex-col gap-4">
      <fieldset scFieldset>
        <legend scLegend variant="label">Allowed network protocols</legend>
        <p scFieldDescription>Pick at least one.</p>
        <div scCheckboxGroup [formField]="networkForm.protocols">
          <label scField orientation="horizontal">
            <input scCheckbox value="http" />
            HTTP
          </label>
          <label scField orientation="horizontal">
            <input scCheckbox value="https" />
            HTTPS
          </label>
          <label scField orientation="horizontal">
            <input scCheckbox value="ssh" />
            SSH
          </label>
        </div>
      </fieldset>
      <pre scFrame class="bg-muted p-4 text-xs">{{ model() | json }}</pre>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormCheckboxGroupDemo {
  protected readonly model = signal<{
    protocols: ('http' | 'https' | 'ssh')[];
  }>({
    protocols: ['https'],
  });
  protected readonly networkForm = form(this.model, (path) => {
    minLength(path.protocols, 1);
  });
}
