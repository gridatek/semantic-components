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
} from '@semantic-components/ui';

@Component({
  selector: 'app-helper-text-textarea-demo',
  imports: [FormField, ScField, ScFieldDescription, ScLabel, ScTextarea],
  template: `
    <div scField>
      <label scLabel>Bio</label>
      <textarea
        scTextarea
        [formField]="bioForm.bio"
        placeholder="Tell us about yourself"
      ></textarea>
      <p scFieldDescription>
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
