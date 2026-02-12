import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicFieldDemo } from './basic-field-demo';

@Component({
  selector: 'app-basic-field-demo-container',
  imports: [DemoContainer, BasicFieldDemo],
  template: `
    <app-demo-container
      title="Basic"
      [code]="code"
      demoUrl="/demos/field/basic-field-demo"
    >
      <app-basic-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicFieldDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScField,
  ScLabel,
  ScFieldDescription,
  ScInput,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-field-demo',
  imports: [ScField, ScLabel, ScFieldDescription, ScInput],
  template: \`
    <div sc-field>
      <label sc-label for="email">Email</label>
      <input sc-input id="email" type="email" placeholder="Enter your email" />
      <p sc-field-description>We'll never share your email with anyone else.</p>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicFieldDemo {}`;
}
