import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
} from '@semantic-components/ui';

/** align: start, center (default), end — logical: start is the reading start. */
@Component({
  selector: 'app-alignments-popover-demo',
  imports: [
    ScButton,
    ScPopover,
    ScPopoverPortal,
    ScPopoverProvider,
    ScPopoverTrigger,
  ],
  template: `
    <div class="flex gap-6">
      <div scPopoverProvider align="start">
        <button scButton scPopoverTrigger variant="outline" size="sm">
          Start
        </button>
        <ng-template scPopoverPortal>
          <div scPopover class="w-40">Aligned to start</div>
        </ng-template>
      </div>
      <div scPopoverProvider align="center">
        <button scButton scPopoverTrigger variant="outline" size="sm">
          Center
        </button>
        <ng-template scPopoverPortal>
          <div scPopover class="w-40">Aligned to center</div>
        </ng-template>
      </div>
      <div scPopoverProvider align="end">
        <button scButton scPopoverTrigger variant="outline" size="sm">
          End
        </button>
        <ng-template scPopoverPortal>
          <div scPopover class="w-40">Aligned to end</div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AlignmentsPopoverDemo {}
