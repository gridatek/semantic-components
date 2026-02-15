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
    <app-demo-container title="In Buttons" [code]="code">
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
import { ScSpinner } from '@semantic-components/ui';
import { SiLoader2Icon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-button-spinner-demo',
  imports: [ScSpinner, SiLoader2Icon],
  template: \`
    <div class="flex items-center gap-4">
      <button
        class="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        disabled
      >
        <svg sc-spinner si-loader-2-icon></svg>
        Loading...
      </button>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonSpinnerDemo {}`;
}
