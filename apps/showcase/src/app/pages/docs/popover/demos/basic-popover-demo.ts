import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScButton,
  ScInput,
  ScLabel,
  ScPopover,
  ScPopoverDescription,
  ScPopoverHeader,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTitle,
  ScPopoverTrigger,
} from '@semantic-components/ui';

@Component({
  selector: 'app-basic-popover-demo',
  imports: [
    ScButton,
    ScInput,
    ScLabel,
    ScPopover,
    ScPopoverDescription,
    ScPopoverHeader,
    ScPopoverPortal,
    ScPopoverProvider,
    ScPopoverTitle,
    ScPopoverTrigger,
  ],
  template: `
    <div sc-popover-provider>
      <button sc-button sc-popover-trigger variant="outline">
        Open Popover
      </button>
      <ng-template scPopoverPortal>
        <div sc-popover class="w-80">
          <div sc-popover-header>
            <h4 sc-popover-title>Dimensions</h4>
            <p sc-popover-description>Set the dimensions for the layer.</p>
          </div>
          <div class="grid gap-2">
            <div class="grid grid-cols-3 items-center gap-4">
              <label sc-label for="width">Width</label>
              <input sc-input id="width" value="100%" class="col-span-2" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <label sc-label for="maxWidth">Max. width</label>
              <input sc-input id="maxWidth" value="300px" class="col-span-2" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <label sc-label for="height">Height</label>
              <input sc-input id="height" value="25px" class="col-span-2" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <label sc-label for="maxHeight">Max. height</label>
              <input sc-input id="maxHeight" value="none" class="col-span-2" />
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicPopoverDemo {}
