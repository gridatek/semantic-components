import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScLabel,
  ScRadio,
  ScRadioField,
  ScRadioGroup,
} from '@semantic-components/ui';

interface NotificationFormModel {
  notify: string;
}

@Component({
  selector: 'app-form-radio-group-demo',
  imports: [ScRadioGroup, ScRadioField, ScRadio, ScLabel, FormField],
  template: `
    <div class="max-w-md rounded-lg border p-6">
      <div class="space-y-4">
        <h4 class="font-semibold">Notification Preferences</h4>
        <div scRadioGroup>
          <label scRadioField>
            <input
              type="radio"
              scRadio
              value="all"
              [formField]="notificationForm.notify"
            />
            <label scLabel>All new messages</label>
          </label>
          <label scRadioField>
            <input
              type="radio"
              scRadio
              value="mentions"
              [formField]="notificationForm.notify"
            />
            <label scLabel>Direct messages and mentions</label>
          </label>
          <label scRadioField>
            <input
              type="radio"
              scRadio
              value="none"
              [formField]="notificationForm.notify"
            />
            <label scLabel>Nothing</label>
          </label>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormRadioGroupDemo {
  readonly formModel = signal<NotificationFormModel>({
    notify: 'mentions',
  });

  readonly notificationForm = form(this.formModel);
}
