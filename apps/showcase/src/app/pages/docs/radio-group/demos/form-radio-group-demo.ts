import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScFrame,
  ScRadio,
  ScRadioGroup,
} from '@semantic-components/ui';

interface NotificationFormModel {
  notify: string;
}

@Component({
  selector: 'app-form-radio-group-demo',
  imports: [ScFrame, ScRadioGroup, ScRadio, FormField, ScField],
  template: `
    <div scFrame class="max-w-md p-6">
      <div class="space-y-4">
        <h4 class="font-semibold">Notification Preferences</h4>
        <div scRadioGroup [formField]="notificationForm.notify">
          <label scField orientation="horizontal">
            <input scRadio value="all" />
            All new messages
          </label>
          <label scField orientation="horizontal">
            <input scRadio value="mentions" />
            Direct messages and mentions
          </label>
          <label scField orientation="horizontal">
            <input scRadio value="none" />
            Nothing
          </label>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormRadioGroupDemo {
  readonly formModel = signal<NotificationFormModel>({
    notify: 'mentions',
  });

  readonly notificationForm = form(this.formModel);
}
