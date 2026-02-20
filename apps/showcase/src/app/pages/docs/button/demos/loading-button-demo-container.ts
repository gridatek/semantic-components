import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LoadingButtonDemo } from './loading-button-demo';

@Component({
  selector: 'app-loading-button-demo-container',
  imports: [DemoContainer, LoadingButtonDemo],
  template: `
    <app-demo-container
      title="Loading State"
      demoUrl="/demos/button/loading-button-demo"
      [code]="code"
    >
      <app-loading-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingButtonDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScSpinner } from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-loading-button-demo',
  imports: [ScButton, ScSpinner, SiLoaderCircleIcon],
  template: \`
    <button scButton disabled>
      <svg scSpinner siLoaderCircleIcon></svg>
      Please wait
    </button>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingButtonDemo {}`;
}
