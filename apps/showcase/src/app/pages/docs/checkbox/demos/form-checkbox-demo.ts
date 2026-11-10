import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCard,
  ScCardContent,
  ScCardHeader,
  ScCardTitle,
  ScCheckbox,
  ScCheckboxField,
  ScFieldGroup,
  ScLabel,
} from '@semantic-components/ui';

/** Without a form: each checked state two-way bound, [(checked)]. */
@Component({
  selector: 'app-form-checkbox-demo',
  imports: [
    ScCard,
    ScCardContent,
    ScCardHeader,
    ScCardTitle,
    ScCheckbox,
    ScCheckboxField,
    ScFieldGroup,
    ScLabel,
  ],
  template: `
    <div scCard class="w-full max-w-md">
      <div scCardHeader>
        <h3 scCardTitle>Notification Preferences</h3>
      </div>
      <div scCardContent>
        <div scFieldGroup class="gap-3">
          <div scCheckboxField>
            <input scCheckbox [(checked)]="email" />
            <label scLabel>Email notifications</label>
          </div>
          <div scCheckboxField>
            <input scCheckbox [(checked)]="sms" />
            <label scLabel>SMS notifications</label>
          </div>
          <div scCheckboxField>
            <input scCheckbox [(checked)]="push" />
            <label scLabel>Push notifications</label>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormCheckboxDemo {
  protected readonly email = signal(true);
  protected readonly sms = signal(false);
  protected readonly push = signal(true);
}
