import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScTooltipNext,
  ScTooltipNextArrow,
  ScTooltipNextPortal,
  ScTooltipNextProvider,
  ScTooltipNextTrigger,
} from '@semantic-components/ui';

@Component({
  selector: 'app-tooltip-next-usage-demo',
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
      <button scButton scTooltipNextTrigger variant="outline">Hover</button>
      <ng-template scTooltipNextPortal>
        <div scTooltipNext>
          Add to library
          <span scTooltipNextArrow></span>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TooltipNextUsageDemo {}
