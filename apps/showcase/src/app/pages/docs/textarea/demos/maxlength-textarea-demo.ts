import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField, maxLength } from '@angular/forms/signals';
import {
  ScField,
  ScFieldDescription,
  ScLabel,
  ScTextarea,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-maxlength-textarea-demo',
  imports: [FormField, ScField, ScFieldDescription, ScLabel, ScTextarea],
  template: `
    <div sc-field>
      <label sc-label>Description</label>
      <textarea
        sc-textarea
        [formField]="descForm.description"
        placeholder="Enter description..."
      ></textarea>
      <p sc-field-description>Max 200 characters.</p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaxlengthTextareaDemo {
  readonly formModel = signal({ description: '' });
  readonly descForm = form(this.formModel, (s) => {
    maxLength(s.description, 200);
  });
}
