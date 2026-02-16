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
    <div sc-popover-provider>
      <button sc-button sc-popover-trigger variant="outline">
        Open Popover
      </button>
      <ng-template scPopoverPortal>
        <div sc-popover>
          <div sc-popover-header>
            <h4 sc-popover-title>Dimensions</h4>
            <p sc-popover-description>Set the dimensions for the layer.</p>
          </div>
          <div sc-field-group>
            <div sc-field>
              <label sc-label>Width</label>
              <input sc-input value="100%" />
            </div>
            <div sc-field>
              <label sc-label>Max. width</label>
              <input sc-input value="300px" />
            </div>
            <div sc-field>
              <label sc-label>Height</label>
              <input sc-input value="25px" />
            </div>
            <div sc-field>
              <label sc-label>Max. height</label>
              <input sc-input value="none" />
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
