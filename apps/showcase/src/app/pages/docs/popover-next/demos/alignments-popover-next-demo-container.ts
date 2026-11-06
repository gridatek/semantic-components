import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AlignmentsPopoverNextDemo } from './alignments-popover-next-demo';

@Component({
  selector: 'app-alignments-popover-next-demo-container',
  imports: [DemoContainer, AlignmentsPopoverNextDemo],
  template: `
    <app-demo-container
      title="Alignments"
      demoUrl="/demos/popover-next/alignments-popover-next-demo"
      [code]="code"
    >
      <app-alignments-popover-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AlignmentsPopoverNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScPopoverNext,
  ScPopoverNextPortal,
  ScPopoverNextProvider,
  ScPopoverNextTrigger,
} from '@semantic-components/ui';

/** align: start, center (default), end — logical: start is the reading start. */
@Component({
  selector: 'app-alignments-popover-next-demo',
  imports: [
    ScButton,
    ScPopoverNext,
    ScPopoverNextPortal,
    ScPopoverNextProvider,
    ScPopoverNextTrigger,
  ],
  template: \`
    <div class="flex gap-6">
      <div scPopoverNextProvider align="start">
        <button scButton scPopoverNextTrigger variant="outline" size="sm">
          Start
        </button>
        <ng-template scPopoverNextPortal>
          <div scPopoverNext class="w-40">Aligned to start</div>
        </ng-template>
      </div>
      <div scPopoverNextProvider align="center">
        <button scButton scPopoverNextTrigger variant="outline" size="sm">
          Center
        </button>
        <ng-template scPopoverNextPortal>
          <div scPopoverNext class="w-40">Aligned to center</div>
        </ng-template>
      </div>
      <div scPopoverNextProvider align="end">
        <button scButton scPopoverNextTrigger variant="outline" size="sm">
          End
        </button>
        <ng-template scPopoverNextPortal>
          <div scPopoverNext class="w-40">Aligned to end</div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AlignmentsPopoverNextDemo {}`;
}
