import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { disabled, form, FormField } from '@angular/forms/signals';
import { ScField, ScLabel, ScTextarea } from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-textarea-demo',
  imports: [FormField, ScField, ScLabel, ScTextarea],
  template: `
    <div sc-field>
      <label sc-label>Disabled</label>
      <textarea
        sc-textarea
        [formField]="disabledForm.message"
        placeholder="Disabled textarea"
      ></textarea>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledTextareaDemo {
  readonly formModel = signal({ message: '' });
  readonly disabledForm = form(this.formModel, (s) => {
    disabled(s.message);
  });
}
