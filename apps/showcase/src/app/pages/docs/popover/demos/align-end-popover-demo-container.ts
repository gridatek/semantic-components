import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AlignEndPopoverDemo } from './align-end-popover-demo';

@Component({
  selector: 'app-align-end-popover-demo-container',
  imports: [DemoContainer, AlignEndPopoverDemo],
  template: `
    <app-demo-container
      title="Align End"
      demoUrl="/demos/popover/align-end-popover-demo"
      [code]="code"
    >
      <app-align-end-popover-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlignEndPopoverDemoContainer {
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
  selector: 'app-align-end-popover-demo',
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
    <div scPopoverProvider align="end">
      <button scButton scPopoverTrigger variant="outline">Align End</button>
      <ng-template scPopoverPortal>
        <div scPopover>
          <div scPopoverHeader>
            <h4 scPopoverTitle>Align End</h4>
            <p scPopoverDescription>This popover is aligned to the end.</p>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlignEndPopoverDemo {}`;
}
