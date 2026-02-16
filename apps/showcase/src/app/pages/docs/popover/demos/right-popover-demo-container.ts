import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RightPopoverDemo } from './right-popover-demo';

@Component({
  selector: 'app-right-popover-demo-container',
  imports: [DemoContainer, RightPopoverDemo],
  template: `
    <app-demo-container
      title="Right"
      demoUrl="/demos/popover/right-popover-demo"
      [code]="code"
    >
      <app-right-popover-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightPopoverDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScButton,
  ScPopover,
  ScPopoverDescription,
  ScPopoverHeader,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTitle,
  ScPopoverTrigger,
} from '@semantic-components/ui';

@Component({
  selector: 'app-right-popover-demo',
  imports: [
    ScButton,
    ScPopover,
    ScPopoverDescription,
    ScPopoverHeader,
    ScPopoverPortal,
    ScPopoverProvider,
    ScPopoverTitle,
    ScPopoverTrigger,
  ],
  template: \`
    <div sc-popover-provider side="right">
      <button sc-button sc-popover-trigger variant="outline">Right</button>
      <ng-template scPopoverPortal>
        <div sc-popover>
          <div sc-popover-header>
            <h4 sc-popover-title>Right</h4>
            <p sc-popover-description>This popover appears on the right.</p>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightPopoverDemo {}`;
}
