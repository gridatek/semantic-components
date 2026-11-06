import { Component, ViewEncapsulation } from '@angular/core';
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
  template: `
    <div scPopoverProvider align="start">
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicPopoverDemo {}
