import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TopPopoverDemo } from './top-popover-demo';

@Component({
  selector: 'app-top-popover-demo-container',
  imports: [DemoContainer, TopPopoverDemo],
  template: `
    <app-demo-container
      title="Top"
      demoUrl="/demos/popover/top-popover-demo"
      [code]="code"
    >
      <app-top-popover-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopPopoverDemoContainer {
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
  selector: 'app-top-popover-demo',
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
    <div sc-popover-provider side="top">
      <button sc-button sc-popover-trigger variant="outline">Top</button>
      <ng-template scPopoverPortal>
        <div sc-popover>
          <div sc-popover-header>
            <h4 sc-popover-title>Top</h4>
            <p sc-popover-description>This popover appears on top.</p>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopPopoverDemo {}`;
}
