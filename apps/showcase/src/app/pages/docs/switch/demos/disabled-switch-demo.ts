import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSwitch, ScSwitchField } from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-switch-demo',
  imports: [ScSwitch, ScSwitchField],
  template: `
    <div class="space-y-3">
      <label scSwitchField>
        <input type="checkbox" scSwitch disabled />
        <span class="text-muted-foreground text-sm leading-none font-medium">
          Disabled (Off)
        </span>
      </label>
      <label scSwitchField>
        <input type="checkbox" scSwitch [checked]="true" disabled />
        <span class="text-muted-foreground text-sm leading-none font-medium">
          Disabled (On)
        </span>
      </label>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledSwitchDemo {}
