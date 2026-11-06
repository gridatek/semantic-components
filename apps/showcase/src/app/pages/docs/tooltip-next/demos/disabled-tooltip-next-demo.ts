import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScTooltipNext,
  ScTooltipNextArrow,
  ScTooltipNextPortal,
  ScTooltipNextProvider,
  ScTooltipNextTrigger,
} from '@semantic-components/ui';

/** Disabled but explained: aria-disabled, not disabled — the button keeps its focus and hover, so keyboard users get the tooltip too. */
@Component({
  selector: 'app-disabled-tooltip-next-demo',
  imports: [
    ScButton,
    ScTooltipNext,
    ScTooltipNextArrow,
    ScTooltipNextPortal,
    ScTooltipNextProvider,
    ScTooltipNextTrigger,
  ],
  template: `
    <div scTooltipNextProvider>
      <button
        scButton
        scTooltipNextTrigger
        variant="outline"
        aria-disabled="true"
      >
        Disabled
      </button>
      <ng-template scTooltipNextPortal>
        <div scTooltipNext>
          This feature is currently unavailable
          <span scTooltipNextArrow></span>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledTooltipNextDemo {}
