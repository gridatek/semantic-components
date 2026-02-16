import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicLabelDemo } from './basic-label-demo';

@Component({
  selector: 'app-basic-label-demo-container',
  imports: [DemoContainer, BasicLabelDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/label/basic-label-demo"
      [code]="code"
    >
      <app-basic-label-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicLabelDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScField, ScLabel } from '@semantic-components/ui';
import { ScInput } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-label-demo',
  imports: [ScField, ScInput, ScLabel],
  template: \`
    <div scField>
      <label scLabel>Email</label>
      <input scInput type="email" placeholder="Enter your email" />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicLabelDemo {}`;
}
