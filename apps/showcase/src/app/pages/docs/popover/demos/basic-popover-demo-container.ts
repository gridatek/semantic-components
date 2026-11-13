import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicPopoverDemo } from './basic-popover-demo';

@Component({
  selector: 'app-basic-popover-demo-container',
  imports: [DemoContainer, BasicPopoverDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/popover/basic-popover-demo"
      [code]="code"
    >
      <app-basic-popover-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicPopoverDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
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

/** A title and a description: they name and describe the popover. */
@Component({
  selector: 'app-basic-popover-demo',
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
    <div scPopoverProvider alignment="start">
      <button scButton scPopoverTrigger variant="outline">Open Popover</button>
      <ng-template scPopoverPortal>
        <div scPopover>
          <div scPopoverHeader>
            <h2 scPopoverTitle>Dimensions</h2>
            <p scPopoverDescription>Set the dimensions for the layer.</p>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicPopoverDemo {}`;
}
