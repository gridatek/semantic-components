import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCard,
  ScCardBody,
  ScFieldDescription,
  ScFieldGroup,
  ScLabelText,
  ScSwitch,
  ScSwitchField,
} from '@semantic-components/ui';

/** The switch first, it is at the start; last, at the end — a settings list. */
@Component({
  selector: 'app-placement-switch-demo',
  imports: [
    ScCard,
    ScCardBody,
    ScFieldDescription,
    ScFieldGroup,
    ScLabelText,
    ScSwitch,
    ScSwitchField,
  ],
  template: `
    <div scCard class="w-full max-w-md">
      <div scCardBody>
        <div scFieldGroup>
          <label scSwitchField>
            <p scLabelText>Marketing emails</p>
            <p scFieldDescription>
              Receive emails about new products and features.
            </p>
            <input scSwitch [(checked)]="marketing" />
          </label>
          <label scSwitchField>
            <p scLabelText>Security emails</p>
            <p scFieldDescription>
              Receive emails about your account security.
            </p>
            <input scSwitch [(checked)]="security" />
          </label>
          <label scSwitchField>
            <input scSwitch [(checked)]="updates" />
            <p scLabelText>Product updates</p>
            <p scFieldDescription>
              Receive emails about product updates and tips.
            </p>
          </label>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PlacementSwitchDemo {
  protected readonly marketing = signal(false);
  protected readonly security = signal(true);
  protected readonly updates = signal(false);
}
