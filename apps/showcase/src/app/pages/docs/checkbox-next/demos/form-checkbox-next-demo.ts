import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCheckboxNext,
  ScCheckboxNextField,
  ScFieldGroup,
  ScLabel,
} from '@semantic-components/ui';

/** Without a form: each checked state two-way bound, [(checked)]. */
@Component({
  selector: 'app-form-checkbox-next-demo',
  imports: [ScCheckboxNext, ScCheckboxNextField, ScFieldGroup, ScLabel],
  template: `
    <div class="w-full max-w-md rounded-lg border p-6">
      <h4 class="mb-4 font-semibold">Notification Preferences</h4>
      <div scFieldGroup class="gap-3">
        <div scCheckboxNextField>
          <input type="checkbox" scCheckboxNext [(checked)]="email" />
          <label scLabel>Email notifications</label>
        </div>
        <div scCheckboxNextField>
          <input type="checkbox" scCheckboxNext [(checked)]="sms" />
          <label scLabel>SMS notifications</label>
        </div>
        <div scCheckboxNextField>
          <input type="checkbox" scCheckboxNext [(checked)]="push" />
          <label scLabel>Push notifications</label>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormCheckboxNextDemo {
  protected readonly email = signal(true);
  protected readonly sms = signal(false);
  protected readonly push = signal(true);
}
