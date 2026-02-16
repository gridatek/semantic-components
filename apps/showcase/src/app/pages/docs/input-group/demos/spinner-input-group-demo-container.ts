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
  ScInput,
  ScSpinner,
} from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-spinner-input-group-demo',
  imports: [ScInputGroup, ScInputGroupAddon, ScInput, ScSpinner, SiLoaderCircleIcon],
  template: \`
    <div scInputGroup>
      <div scInputGroupAddon>
        <svg scSpinner si-loader-circle-icon class="size-4"></svg>
      </div>
      <input scInput variant="group" placeholder="Loading..." disabled />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerInputGroupDemo {}`;
}
