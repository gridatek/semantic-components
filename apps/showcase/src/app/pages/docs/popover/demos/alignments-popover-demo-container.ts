import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AlignmentsPopoverDemo } from './alignments-popover-demo';

@Component({
  selector: 'app-alignments-popover-demo-container',
  imports: [DemoContainer, AlignmentsPopoverDemo],
  template: `
    <app-demo-container
      title="Alignments"
      demoUrl="/demos/popover/alignments-popover-demo"
      [code]="code"
    >
      <app-alignments-popover-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AlignmentsPopoverDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
} from '@semantic-components/ui';

/** alignment: start, center (default), end — logical: start is the reading start. */
@Component({
  selector: 'app-alignments-popover-demo',
  imports: [
    ScButton,
    ScPopover,
    ScPopoverPortal,
    ScPopoverProvider,
    ScPopoverTrigger,
  ],
  template: \`
    <div class="flex gap-6">
      <div scPopoverProvider alignment="start">
        <button scButton scPopoverTrigger variant="outline" size="sm">
          Start
        </button>
        <ng-template scPopoverPortal>
          <div scPopover class="w-40">Aligned to start</div>
        </ng-template>
      </div>
      <div scPopoverProvider alignment="center">
        <button scButton scPopoverTrigger variant="outline" size="sm">
          Center
        </button>
        <ng-template scPopoverPortal>
          <div scPopover class="w-40">Aligned to center</div>
        </ng-template>
      </div>
      <div scPopoverProvider alignment="end">
        <button scButton scPopoverTrigger variant="outline" size="sm">
          End
        </button>
        <ng-template scPopoverPortal>
          <div scPopover class="w-40">Aligned to end</div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AlignmentsPopoverDemo {}`;
}
