import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSwitch } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-switch-demo',
  imports: [ScSwitch],
  template: `
    <div class="flex items-center space-x-2">
      <button scSwitch id="airplane-mode"></button>
      <label for="airplane-mode" class="text-sm font-medium leading-none">
        Airplane Mode
      </label>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSwitchDemo {}
