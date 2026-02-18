import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledSwitchDemo } from './disabled-switch-demo';

@Component({
  selector: 'app-disabled-switch-demo-container',
  imports: [DemoContainer, DisabledSwitchDemo],
  template: `
    <app-demo-container title="Disabled" [code]="code">
      <app-disabled-switch-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledSwitchDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSwitch, ScSwitchField } from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-switch-demo',
  imports: [ScSwitch, ScSwitchField],
  template: \`
    <div class="space-y-3">
      <label scSwitchField>
        <input type="checkbox" scSwitch disabled />
        <span class="text-sm font-medium leading-none text-muted-foreground">
          Disabled (Off)
        </span>
      </label>
      <label scSwitchField>
        <input type="checkbox" scSwitch [checked]="true" disabled />
        <span class="text-sm font-medium leading-none text-muted-foreground">
          Disabled (On)
        </span>
      </label>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledSwitchDemo {}`;
}
