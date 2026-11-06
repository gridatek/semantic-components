import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScPopoverNext,
  ScPopoverNextDescription,
  ScPopoverNextHeader,
  ScPopoverNextPortal,
  ScPopoverNextProvider,
  ScPopoverNextTitle,
  ScPopoverNextTrigger,
} from '@semantic-components/ui';

/** A title and a description: they name and describe the popover. */
@Component({
  selector: 'app-basic-popover-next-demo',
  imports: [
    ScButton,
    ScPopoverNext,
    ScPopoverNextDescription,
    ScPopoverNextHeader,
    ScPopoverNextPortal,
    ScPopoverNextProvider,
    ScPopoverNextTitle,
    ScPopoverNextTrigger,
  ],
  template: `
    <div scPopoverNextProvider align="start">
      <button scButton scPopoverNextTrigger variant="outline">
        Open Popover
      </button>
      <ng-template scPopoverNextPortal>
        <div scPopoverNext>
          <div scPopoverNextHeader>
            <h2 scPopoverNextTitle>Dimensions</h2>
            <p scPopoverNextDescription>Set the dimensions for the layer.</p>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicPopoverNextDemo {}
