import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormCheckboxDemo } from './form-checkbox-demo';

@Component({
  selector: 'app-form-checkbox-demo-container',
  imports: [DemoContainer, FormCheckboxDemo],
  template: `
    <app-demo-container
      title="Form Example"
      demoUrl="/demos/checkbox/form-checkbox-demo"
      [code]="code"
    >
      <app-form-checkbox-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCheckboxDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScCheckboxField, ScCheckbox, ScLabel } from '@semantic-components/ui-lab';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-checkbox-demo',
  imports: [ScCheckboxField, ScCheckbox, ScLabel, FormsModule],
  template: \`
    <div class="rounded-lg border p-6 max-w-md">
      <div class="space-y-4">
        <h4 class="font-semibold">Notification Preferences</h4>
        <div class="space-y-4">
          <div sc-checkbox-field>
            <input
              type="checkbox"
              sc-checkbox
              [(ngModel)]="emailNotif"
              id="email-notif"
              name="emailNotifications"
            />
            <label sc-label for="email-notif">Email notifications</label>
          </div>
          <div sc-checkbox-field>
            <input
              type="checkbox"
              sc-checkbox
              [(ngModel)]="smsNotif"
              id="sms-notif"
              name="smsNotifications"
            />
            <label sc-label for="sms-notif">SMS notifications</label>
          </div>
          <div sc-checkbox-field>
            <input
              type="checkbox"
              sc-checkbox
              [(ngModel)]="pushNotif"
              id="push-notif"
              name="pushNotifications"
            />
            <label sc-label for="push-notif">Push notifications</label>
          </div>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCheckboxDemo {
  readonly emailNotif = signal(true);
  readonly smsNotif = signal(false);
  readonly pushNotif = signal(true);
}`;
}
