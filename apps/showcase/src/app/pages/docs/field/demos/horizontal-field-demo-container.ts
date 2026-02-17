import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HorizontalFieldDemo } from './horizontal-field-demo';

@Component({
  selector: 'app-horizontal-field-demo-container',
  imports: [DemoContainer, HorizontalFieldDemo],
  template: `
    <app-demo-container
      title="Horizontal Layout"
      [code]="code"
      demoUrl="/demos/field/horizontal-field-demo"
    >
      <app-horizontal-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalFieldDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScField, ScLabel } from "@semantic-components/ui";
import { ScInput } from "@semantic-components/ui-lab";

@Component({
  selector: 'app-horizontal-field-demo',
  imports: [ScField, ScLabel, ScInput],
  template: \`
    <div scField [orientation]="'horizontal'">
      <label scLabel for="username">Username</label>
      <input scInput id="username" type="text" placeholder="Enter username" />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalFieldDemo {}`;
}
