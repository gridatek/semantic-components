import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FieldLabelDemo } from './field-label-demo';

@Component({
  selector: 'app-field-label-demo-container',
  imports: [DemoContainer, FieldLabelDemo],
  template: `
    <app-demo-container
      title="With Field Context"
      demoUrl="/demos/label/field-label-demo"
      [code]="code"
    >
      <app-field-label-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldLabelDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScField, ScFieldDescription, ScLabel } from '@semantic-components/ui';
import { ScInput } from '@semantic-components/ui';

@Component({
  selector: 'app-field-label-demo',
  imports: [ScField, ScInput, ScLabel, ScFieldDescription],
  template: \`
    <div scField>
      <label scLabel>Email</label>
      <input scInput type="email" placeholder="Enter your email" />
      <p scFieldDescription>
        The label automatically links to the input via the field context.
      </p>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldLabelDemo {}`;
}
