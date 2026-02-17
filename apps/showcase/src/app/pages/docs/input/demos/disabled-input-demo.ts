import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { disabled, form, FormField } from '@angular/forms/signals';
import { ScField, ScLabel } from '@semantic-components/ui';
import { ScInput } from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-input-demo',
  imports: [FormField, ScField, ScInput, ScLabel],
  template: `
    <div scField>
      <label scLabel>Disabled</label>
      <input
        scInput
        type="text"
        [formField]="disabledForm.text"
        placeholder="Disabled input"
      />
    </div>
    <pre class="mt-4 text-xs">
invalid: {{ disabledForm.text().invalid() }}
disabled: {{ disabledForm.text().disabled() }}
dirty: {{ disabledForm.text().dirty() }}
value: "{{ disabledForm.text().value() }}"
    </pre
    >
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledInputDemo {
  readonly formModel = signal({ text: '' });
  readonly disabledForm = form(this.formModel, (s) => {
    disabled(s.text);
  });
}
