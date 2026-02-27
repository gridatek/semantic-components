import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSwitch, ScSwitchField } from '@semantic-components/ui';

@Component({
  selector: 'app-description-switch-demo',
  imports: [ScSwitch, ScSwitchField],
  template: `
    <label
      scSwitchField
      class="w-full flex-row-reverse justify-between rounded-lg border p-4"
    >
      <input type="checkbox" scSwitch />
      <div class="space-y-0.5">
        <p class="text-base font-medium">Dark Mode</p>
        <p class="text-muted-foreground text-sm">
          Enable dark mode for a better viewing experience in low light.
        </p>
      </div>
    </label>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionSwitchDemo {}
