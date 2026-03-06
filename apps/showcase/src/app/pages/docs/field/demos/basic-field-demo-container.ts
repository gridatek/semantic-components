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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicFieldDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScField, ScFieldDescription, ScLabel } from '@semantic-components/ui';
import { ScInput } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-field-demo',
  imports: [ScField, ScLabel, ScFieldDescription, ScInput],
  template: \`
    <div scField>
      <label scLabel>Email</label>
      <input scInput type="email" placeholder="Enter your email" />
      <p scFieldDescription>We'll never share your email with anyone else.</p>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicFieldDemo {}`;
}
