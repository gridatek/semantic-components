import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScFieldDescription,
  ScLabelText,
  ScSwitch,
  ScSwitchField,
} from '@semantic-components/ui';

@Component({
  selector: 'app-input-first-switch-demo',
  imports: [ScSwitch, ScSwitchField, ScFieldDescription, ScLabelText],
  template: `
    <div class="w-[400px] rounded-lg border p-4">
      <div class="space-y-4">
        <label scSwitchField>
          <input type="checkbox" scSwitch [(checked)]="marketing" />
          <p scLabelText>Marketing emails</p>
          <p scFieldDescription>
            Receive emails about new products and features.
          </p>
        </label>
        <label scSwitchField>
          <input type="checkbox" scSwitch [(checked)]="security" />
          <p scLabelText>Security emails</p>
          <p scFieldDescription>Receive emails about your account security.</p>
        </label>
        <label scSwitchField>
          <input type="checkbox" scSwitch [(checked)]="updates" />
          <p scLabelText>Product updates</p>
          <p scFieldDescription>
            Receive emails about product updates and tips.
          </p>
        </label>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InputFirstSwitchDemo {
  readonly marketing = signal(false);
  readonly security = signal(true);
  readonly updates = signal(false);
}
