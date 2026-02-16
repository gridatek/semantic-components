import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
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

@Component({
  selector: 'app-align-end-popover-demo',
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
    <div sc-popover-provider align="end">
      <button sc-button sc-popover-trigger variant="outline">Align End</button>
      <ng-template scPopoverPortal>
        <div sc-popover>
          <div sc-popover-header>
            <h4 sc-popover-title>Align End</h4>
            <p sc-popover-description>This popover is aligned to the end.</p>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlignEndPopoverDemo {}
