import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { ScField, ScLabel, ScTextarea } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-textarea-demo',
  imports: [FormField, ScField, ScLabel, ScTextarea],
  template: `
    <div scField>
      <label scLabel>Your message</label>
      <textarea
        scTextarea
        [formField]="textareaForm.message"
        placeholder="Type your message here."
      ></textarea>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicTextareaDemo {
  readonly formModel = signal({ message: '' });
  readonly textareaForm = form(this.formModel);
}
