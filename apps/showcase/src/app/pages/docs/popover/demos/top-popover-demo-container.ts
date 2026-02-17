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
    <div scPopoverProvider side="top">
      <button scButton scPopoverTrigger variant="outline">Top</button>
      <ng-template scPopoverPortal>
        <div scPopover>
          <div scPopoverHeader>
            <h4 scPopoverTitle>Top</h4>
            <p scPopoverDescription>This popover appears on top.</p>
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
