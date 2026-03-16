import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScFieldDescription,
  ScLabelText,
  ScSwitch,
  ScSwitchField,
} from '@semantic-components/ui';

@Component({
  selector: 'app-description-switch-demo',
  imports: [ScSwitch, ScSwitchField, ScLabelText, ScFieldDescription],
  template: `
    <label scSwitchField class="rounded-lg border p-4">
      <p scLabelText>Dark Mode</p>
      <p scFieldDescription>
        Enable dark mode for a better viewing experience in low light.
      </p>
      <input type="checkbox" scSwitch />
    </label>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionSwitchDemo {}
