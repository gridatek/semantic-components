import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScTooltip,
  ScTooltipArrow,
  ScTooltipPortal,
  ScTooltipProvider,
  ScTooltipTrigger,
} from '@semantic-components/ui';

@Component({
  selector: 'app-tooltip-usage-demo',
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
      <button scButton scTooltipTrigger variant="outline">Hover</button>
      <ng-template scTooltipPortal>
        <div scTooltip>
          Add to library
          <span scTooltipArrow></span>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TooltipUsageDemo {}
