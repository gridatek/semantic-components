import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScSwitch } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-form-switch-demo',
  imports: [ScSwitch],
  template: `
    <div class="w-[400px] rounded-lg border p-4">
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="space-y-0.5">
            <label for="marketing" class="text-sm font-medium">
              Marketing emails
            </label>
            <p class="text-sm text-muted-foreground">
              Receive emails about new products and features.
            </p>
          </div>
          <button sc-switch [(checked)]="marketing" id="marketing"></button>
        </div>
        <div class="flex items-center justify-between">
          <div class="space-y-0.5">
            <label for="security" class="text-sm font-medium">
              Security emails
            </label>
            <p class="text-sm text-muted-foreground">
              Receive emails about your account security.
            </p>
          </div>
          <button sc-switch [(checked)]="security" id="security"></button>
        </div>
        <div class="flex items-center justify-between">
          <div class="space-y-0.5">
            <label for="updates" class="text-sm font-medium">
              Product updates
            </label>
            <p class="text-sm text-muted-foreground">
              Receive emails about product updates and tips.
            </p>
          </div>
          <button sc-switch [(checked)]="updates" id="updates"></button>
        </div>
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
