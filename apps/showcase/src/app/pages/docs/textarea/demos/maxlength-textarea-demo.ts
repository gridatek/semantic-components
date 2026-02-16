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
} from '@semantic-components/ui';

@Component({
  selector: 'app-maxlength-textarea-demo',
  imports: [FormField, ScField, ScFieldDescription, ScLabel, ScTextarea],
  template: `
    <div scField>
      <label scLabel>Description</label>
      <textarea
        scTextarea
        [formField]="descForm.description"
        placeholder="Enter description..."
      ></textarea>
      <p scFieldDescription>Max 200 characters.</p>
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
