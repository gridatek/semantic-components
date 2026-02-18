import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScSwitch, ScSwitchField } from '@semantic-components/ui';

@Component({
  selector: 'app-form-switch-demo',
  imports: [ScSwitch, ScSwitchField],
  template: `
    <div class="w-[400px] rounded-lg border p-4">
      <div class="space-y-4">
        <label scSwitchField class="flex-row-reverse justify-between w-full">
          <input type="checkbox" scSwitch [(checked)]="marketing" />
          <div class="space-y-0.5">
            <p class="text-sm font-medium">Marketing emails</p>
            <p class="text-sm text-muted-foreground">
              Receive emails about new products and features.
            </p>
          </div>
        </label>
        <label scSwitchField class="flex-row-reverse justify-between w-full">
          <input type="checkbox" scSwitch [(checked)]="security" />
          <div class="space-y-0.5">
            <p class="text-sm font-medium">Security emails</p>
            <p class="text-sm text-muted-foreground">
              Receive emails about your account security.
            </p>
          </div>
        </label>
        <label scSwitchField class="flex-row-reverse justify-between w-full">
          <input type="checkbox" scSwitch [(checked)]="updates" />
          <div class="space-y-0.5">
            <p class="text-sm font-medium">Product updates</p>
            <p class="text-sm text-muted-foreground">
              Receive emails about product updates and tips.
            </p>
          </div>
        </label>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSwitchDemo {
  readonly marketing = signal(false);
  readonly security = signal(true);
  readonly updates = signal(false);
}
