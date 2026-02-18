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
    <div
      class="flex flex-row items-center justify-between rounded-lg border p-4"
    >
      <div class="space-y-0.5">
        <p class="text-base font-medium">Dark Mode</p>
        <p class="text-sm text-muted-foreground">
          Enable dark mode for a better viewing experience in low light.
        </p>
      </div>
      <label scSwitchField aria-label="Dark Mode">
        <input type="checkbox" scSwitch />
      </label>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionSwitchDemo {}
