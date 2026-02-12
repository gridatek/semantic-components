import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormRadioGroupDemo } from './form-radio-group-demo';

@Component({
  selector: 'app-form-radio-group-demo-container',
  imports: [DemoContainer, FormRadioGroupDemo],
  template: `
    <app-demo-container title="Form" [code]="code">
      <app-form-radio-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormRadioGroupDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { ScRadioGroup, ScRadioField, ScRadio } from '@semantic-components/ui-lab';

interface NotificationFormModel {
  notify: string;
}

@Component({
  selector: 'app-form-radio-group-demo',
  imports: [ScRadioGroup, ScRadioField, ScRadio, FormField],
  template: \`
    <div class="rounded-lg border p-6 max-w-md">
      <div class="space-y-4">
        <h4 id="notify-heading" class="font-semibold">
          Notification Preferences
        </h4>
        <div sc-radio-group class="gap-3">
          <label sc-radio-field class="flex items-center space-x-2">
            <input
              type="radio"
              sc-radio
              value="all"
              [formField]="notificationForm.notify"
              id="notify-all"
            />
            <span class="text-sm font-medium">All new messages</span>
          </label>
          <label sc-radio-field class="flex items-center space-x-2">
            <input
              type="radio"
              sc-radio
              value="mentions"
              [formField]="notificationForm.notify"
              id="notify-mentions"
            />
            <span class="text-sm font-medium">
              Direct messages and mentions
            </span>
          </label>
          <label sc-radio-field class="flex items-center space-x-2">
            <input
              type="radio"
              sc-radio
              value="none"
              [formField]="notificationForm.notify"
              id="notify-none"
            />
            <span class="text-sm font-medium">Nothing</span>
          </label>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormRadioGroupDemo {
  readonly formModel = signal<NotificationFormModel>({
    notify: 'mentions',
  });

  readonly notificationForm = form(this.formModel);
}`;
}
