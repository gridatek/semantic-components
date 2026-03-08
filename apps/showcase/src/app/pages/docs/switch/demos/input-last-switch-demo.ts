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
  selector: 'app-input-last-switch-demo',
  imports: [ScSwitch, ScSwitchField, ScFieldDescription, ScInlineLabel],
  template: `
    <div class="w-[400px] rounded-lg border p-4">
      <div class="space-y-4">
        <label scSwitchField>
          <p scInlineLabel>Marketing emails</p>
          <p scFieldDescription>
            Receive emails about new products and features.
          </p>
          <input type="checkbox" scSwitch [(checked)]="marketing" />
        </label>
        <label scSwitchField>
          <p scInlineLabel>Security emails</p>
          <p scFieldDescription>Receive emails about your account security.</p>
          <input type="checkbox" scSwitch [(checked)]="security" />
        </label>
        <label scSwitchField>
          <p scInlineLabel>Product updates</p>
          <p scFieldDescription>
            Receive emails about product updates and tips.
          </p>
          <input type="checkbox" scSwitch [(checked)]="updates" />
        </label>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputLastSwitchDemo {
  readonly marketing = signal(false);
  readonly security = signal(true);
  readonly updates = signal(false);
}
