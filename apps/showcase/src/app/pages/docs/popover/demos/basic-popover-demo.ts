import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScButton,
  ScField,
  ScFieldGroup,
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
    ScField,
    ScFieldGroup,
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
    <div scPopoverProvider>
      <button scButton scPopoverTrigger variant="outline">
        Open Popover
      </button>
      <ng-template scPopoverPortal>
        <div scPopover class="w-80">
          <div scPopoverHeader>
            <h4 scPopoverTitle>Dimensions</h4>
            <p scPopoverDescription>Set the dimensions for the layer.</p>
          </div>
          <div scFieldGroup class="gap-2">
            <div scField class="grid grid-cols-3 gap-4">
              <label scLabel>Width</label>
              <input scInput value="100%" class="col-span-2" />
            </div>
            <div scField class="grid grid-cols-3 gap-4">
              <label scLabel>Max. width</label>
              <input scInput value="300px" class="col-span-2" />
            </div>
            <div scField class="grid grid-cols-3 gap-4">
              <label scLabel>Height</label>
              <input scInput value="25px" class="col-span-2" />
            </div>
            <div scField class="grid grid-cols-3 gap-4">
              <label scLabel>Max. height</label>
              <input scInput value="none" class="col-span-2" />
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
