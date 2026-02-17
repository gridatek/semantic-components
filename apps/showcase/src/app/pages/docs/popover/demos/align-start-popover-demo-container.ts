import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AlignStartPopoverDemo } from './align-start-popover-demo';

@Component({
  selector: 'app-align-start-popover-demo-container',
  imports: [DemoContainer, AlignStartPopoverDemo],
  template: `
    <app-demo-container
      title="Align Start"
      demoUrl="/demos/popover/align-start-popover-demo"
      [code]="code"
    >
      <app-align-start-popover-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlignStartPopoverDemoContainer {
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
  selector: 'app-align-start-popover-demo',
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
    <div scPopoverProvider align="start">
      <button scButton scPopoverTrigger variant="outline">Align Start</button>
      <ng-template scPopoverPortal>
        <div scPopover>
          <div scPopoverHeader>
            <h4 scPopoverTitle>Align Start</h4>
            <p scPopoverDescription>This popover is aligned to the start.</p>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlignStartPopoverDemo {}`;
}
