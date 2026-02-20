import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ButtonSpinnerDemo } from './button-spinner-demo';

@Component({
  selector: 'app-button-spinner-demo-container',
  imports: [DemoContainer, ButtonSpinnerDemo],
  template: `
    <app-demo-container
      title="In Buttons"
      demoUrl="/demos/spinner/button-spinner-demo"
      [code]="code"
    >
      <app-button-spinner-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonSpinnerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton, ScSpinner } from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-button-spinner-demo',
  imports: [ScButton, ScSpinner, SiLoaderCircleIcon],
  template: \`
    <button scButton disabled>
      <svg scSpinner siLoaderCircleIcon></svg>
      Loading...
    </button>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonSpinnerDemo {}`;
}
