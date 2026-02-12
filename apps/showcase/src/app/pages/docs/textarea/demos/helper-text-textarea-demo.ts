import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import {
  ScField,
  ScFieldDescription,
  ScLabel,
  ScTextarea,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-helper-text-textarea-demo',
  imports: [FormField, ScField, ScFieldDescription, ScLabel, ScTextarea],
  template: `
    <div sc-field>
      <label sc-label>Bio</label>
      <textarea
        sc-textarea
        [formField]="bioForm.bio"
        placeholder="Tell us about yourself"
      ></textarea>
      <p sc-field-description>
        Your bio will be visible on your public profile.
      </p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelperTextTextareaDemo {
  readonly formModel = signal({ bio: '' });
  readonly bioForm = form(this.formModel);
}
