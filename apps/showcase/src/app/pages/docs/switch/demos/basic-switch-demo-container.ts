import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicSwitchDemo } from './basic-switch-demo';

@Component({
  selector: 'app-basic-switch-demo-container',
  imports: [DemoContainer, BasicSwitchDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-switch-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSwitchDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSwitch, ScSwitchField } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-switch-demo',
  imports: [ScSwitch, ScSwitchField],
  template: \`
    <label scSwitchField>
      <input type="checkbox" scSwitch />
      Airplane Mode
    </label>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSwitchDemo {}`;
}
