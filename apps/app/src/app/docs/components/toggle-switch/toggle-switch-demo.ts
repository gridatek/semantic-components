import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScToggleSwitch } from '@semantic-components/ui';

@Component({
  selector: 'app-toggle-switch-demo',
  imports: [ScToggleSwitch],
  template: `
    <button sc-toggle-switch aria-label="Enable notifications"></button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleSwitchDemo {}
