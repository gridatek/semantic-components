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
    <app-demo-container title="Basic" [code]="code">
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
import { ScField, ScInput, ScLabel } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-label-demo',
  imports: [ScField, ScInput, ScLabel],
  template: \`
    <div sc-field>
      <label sc-label>Email</label>
      <input sc-input type="email" placeholder="Enter your email" />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicLabelDemo {}`;
}
