import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormField, disabled, form } from '@angular/forms/signals';
import { ScField, ScLabel, ScTextarea } from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-textarea-demo',
  imports: [FormField, ScField, ScLabel, ScTextarea],
  template: `
    <div scField>
      <label scLabel>Disabled</label>
      <textarea
        scTextarea
        [formField]="disabledForm.message"
        placeholder="Disabled textarea"
      ></textarea>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledTextareaDemo {
  readonly formModel = signal({ message: '' });
  readonly disabledForm = form(this.formModel, (s) => {
    disabled(s.message);
  });
}
