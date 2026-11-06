import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScTooltip,
  ScTooltipArrow,
  ScTooltipPortal,
  ScTooltipProvider,
  ScTooltipTrigger,
} from '@semantic-components/ui';

/**
 * Disabled but explained: disabled with softDisabled — the button keeps its
 * focus and hover, so keyboard users get the tooltip too.
 */
@Component({
  selector: 'app-disabled-tooltip-demo',
  imports: [
    ScButton,
    ScTooltip,
    ScTooltipArrow,
    ScTooltipPortal,
    ScTooltipProvider,
    ScTooltipTrigger,
  ],
  template: `
    <div scTooltipProvider>
      <button scButton scTooltipTrigger variant="outline" disabled softDisabled>
        Disabled
      </button>
      <ng-template scTooltipPortal>
        <div scTooltip>
          This feature is currently unavailable
          <span scTooltipArrow></span>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledTooltipDemo {}
