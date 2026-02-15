import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DefaultSpinnerDemo } from './default-spinner-demo';

@Component({
  selector: 'app-default-spinner-demo-container',
  imports: [DemoContainer, DefaultSpinnerDemo],
  template: `
    <app-demo-container title="Default" [code]="code">
      <app-default-spinner-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultSpinnerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSpinner } from '@semantic-components/ui';
import { SiLoader2Icon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-default-spinner-demo',
  imports: [ScSpinner, SiLoader2Icon],
  template: \`
    <svg sc-spinner si-loader-2-icon></svg>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultSpinnerDemo {}`;
}
