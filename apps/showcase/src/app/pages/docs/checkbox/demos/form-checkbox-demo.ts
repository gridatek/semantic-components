import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScCheckbox, ScCheckboxField, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-form-checkbox-demo',
  imports: [ScCheckboxField, ScCheckbox, ScLabel],
  template: `
    <div class="max-w-md rounded-lg border p-6">
      <div class="space-y-4">
        <h4 class="font-semibold">Notification Preferences</h4>
        <div class="space-y-4">
          <div scCheckboxField>
            <input type="checkbox" scCheckbox [(checked)]="emailNotif" />
            <label scLabel>Email notifications</label>
          </div>
          <div scCheckboxField>
            <input type="checkbox" scCheckbox [(checked)]="smsNotif" />
            <label scLabel>SMS notifications</label>
          </div>
          <div scCheckboxField>
            <input type="checkbox" scCheckbox [(checked)]="pushNotif" />
            <label scLabel>Push notifications</label>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCheckboxDemo {
  readonly emailNotif = signal(true);
  readonly smsNotif = signal(false);
  readonly pushNotif = signal(true);
}
