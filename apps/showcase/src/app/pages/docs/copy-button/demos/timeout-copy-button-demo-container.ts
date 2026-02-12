import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TimeoutCopyButtonDemo } from './timeout-copy-button-demo';

@Component({
  selector: 'app-timeout-copy-button-demo-container',
  imports: [DemoContainer, TimeoutCopyButtonDemo],
  template: `
    <app-demo-container title="Custom Timeout (5 seconds)" [code]="code">
      <app-timeout-copy-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeoutCopyButtonDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCopyButton } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-timeout-copy-button-demo',
  imports: [ScCopyButton],
  template: \`
    <div class="flex items-center gap-4">
      <button
        sc-copy-button
        [value]="'Long feedback'"
        [timeout]="5000"
        variant="outline"
        size="default"
      >
        Copy (5s feedback)
      </button>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeoutCopyButtonDemo {}`;
}
