import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScFieldDescription,
  ScInlineLabel,
  ScSwitch,
  ScSwitchField,
} from '@semantic-components/ui';

@Component({
  selector: 'app-form-switch-demo',
  imports: [ScSwitch, ScSwitchField, ScFieldDescription, ScInlineLabel],
  template: `
    <div class="w-[400px] rounded-lg border p-4">
      <div class="space-y-4">
        <label scSwitchField reversed>
          <input type="checkbox" scSwitch [(checked)]="marketing" />
          <p scInlineLabel>Marketing emails</p>
          <p scFieldDescription>
            Receive emails about new products and features.
          </p>
        </label>
        <label scSwitchField reversed>
          <input type="checkbox" scSwitch [(checked)]="security" />
          <p scInlineLabel>Security emails</p>
          <p scFieldDescription>Receive emails about your account security.</p>
        </label>
        <label scSwitchField reversed>
          <input type="checkbox" scSwitch [(checked)]="updates" />
          <p scInlineLabel>Product updates</p>
          <p scFieldDescription>
            Receive emails about product updates and tips.
          </p>
        </label>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSwitchDemo {
  readonly marketing = signal(false);
  readonly security = signal(true);
  readonly updates = signal(false);
}
