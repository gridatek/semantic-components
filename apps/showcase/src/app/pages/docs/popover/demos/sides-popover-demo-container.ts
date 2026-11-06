import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SidesPopoverDemo } from './sides-popover-demo';

@Component({
  selector: 'app-sides-popover-demo-container',
  imports: [DemoContainer, SidesPopoverDemo],
  template: `
    <app-demo-container
      title="Sides"
      demoUrl="/demos/popover/sides-popover-demo"
      [code]="code"
    >
      <app-sides-popover-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SidesPopoverDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
} from '@semantic-components/ui';

/** side: bottom (default), top, left, right — or inline-start, inline-end, which follow the direction. It flips when there is no room. */
@Component({
  selector: 'app-sides-popover-demo',
  imports: [
    ScButton,
    ScPopover,
    ScPopoverPortal,
    ScPopoverProvider,
    ScPopoverTrigger,
  ],
  template: \`
    <div class="flex flex-wrap gap-2">
      <div scPopoverProvider side="top">
        <button scButton scPopoverTrigger variant="outline" class="capitalize">
          top
        </button>
        <ng-template scPopoverPortal>
          <div scPopover class="w-40">On the top</div>
        </ng-template>
      </div>
      <div scPopoverProvider side="bottom">
        <button scButton scPopoverTrigger variant="outline" class="capitalize">
          bottom
        </button>
        <ng-template scPopoverPortal>
          <div scPopover class="w-40">On the bottom</div>
        </ng-template>
      </div>
      <div scPopoverProvider side="left">
        <button scButton scPopoverTrigger variant="outline" class="capitalize">
          left
        </button>
        <ng-template scPopoverPortal>
          <div scPopover class="w-40">On the left</div>
        </ng-template>
      </div>
      <div scPopoverProvider side="right">
        <button scButton scPopoverTrigger variant="outline" class="capitalize">
          right
        </button>
        <ng-template scPopoverPortal>
          <div scPopover class="w-40">On the right</div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SidesPopoverDemo {}`;
}
