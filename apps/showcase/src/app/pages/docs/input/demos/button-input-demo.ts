import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { ScButton, ScField, ScLabel } from '@semantic-components/ui';
import { ScInput } from '@semantic-components/ui';

@Component({
  selector: 'app-button-input-demo',
  imports: [FormField, ScButton, ScField, ScInput, ScLabel],
  template: `
    <div class="flex max-w-sm items-end gap-2">
      <div scField class="flex-1">
        <label scLabel>Email</label>
        <input
          scInput
          type="email"
          [formField]="emailForm.email"
          placeholder="Email"
        />
      </div>
      <button scButton>Subscribe</button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonInputDemo {
  readonly formModel = signal({ email: '' });
  readonly emailForm = form(this.formModel);
}
