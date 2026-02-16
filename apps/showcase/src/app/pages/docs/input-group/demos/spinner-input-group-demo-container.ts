import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SpinnerInputGroupDemo } from './spinner-input-group-demo';

@Component({
  selector: 'app-spinner-input-group-demo-container',
  imports: [DemoContainer, SpinnerInputGroupDemo],
  template: `
    <app-demo-container
      title="Spinner"
      demoUrl="/demos/input-group/spinner-input-group-demo"
      [code]="code"
    >
      <app-spinner-input-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerInputGroupDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupInput,
  ScSpinner,
} from '@semantic-components/ui';

@Component({
  selector: 'app-spinner-input-group-demo',
  imports: [ScInputGroup, ScInputGroupAddon, ScInputGroupInput, ScSpinner],
  template: \`
    <div sc-input-group>
      <div sc-input-group-addon>
        <svg sc-spinner class="size-4"></svg>
      </div>
      <input sc-input-group-input placeholder="Loading..." disabled />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerInputGroupDemo {}`;
}
