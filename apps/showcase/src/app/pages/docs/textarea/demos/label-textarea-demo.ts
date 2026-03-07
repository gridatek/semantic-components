import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import { ScField, ScLabel, ScTextarea } from '@semantic-components/ui';

@Component({
  selector: 'app-label-textarea-demo',
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
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelTextareaDemo {
  readonly formModel = signal({ message: '' });
  readonly textareaForm = form(this.formModel, (s) => {
    required(s.message);
  });
}
