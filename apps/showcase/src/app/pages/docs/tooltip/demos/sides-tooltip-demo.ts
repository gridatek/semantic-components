import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScTooltip,
  ScTooltipArrow,
  ScTooltipPortal,
  ScTooltipProvider,
  ScTooltipTrigger,
} from '@semantic-components/ui';

/** side: top (default), bottom, left, right — or inline-start, inline-end, which follow the direction. It flips when there is no room. */
@Component({
  selector: 'app-sides-tooltip-demo',
  imports: [
    ScButton,
    ScTooltip,
    ScTooltipArrow,
    ScTooltipPortal,
    ScTooltipProvider,
    ScTooltipTrigger,
  ],
  template: `
    <div class="flex flex-wrap gap-2">
      <div scTooltipProvider side="left">
        <button scButton scTooltipTrigger variant="outline" class="capitalize">
          left
        </button>
        <ng-template scTooltipPortal>
          <div scTooltip>
            Add to library
            <span scTooltipArrow></span>
          </div>
        </ng-template>
      </div>
      <div scTooltipProvider side="top">
        <button scButton scTooltipTrigger variant="outline" class="capitalize">
          top
        </button>
        <ng-template scTooltipPortal>
          <div scTooltip>
            Add to library
            <span scTooltipArrow></span>
          </div>
        </ng-template>
      </div>
      <div scTooltipProvider side="bottom">
        <button scButton scTooltipTrigger variant="outline" class="capitalize">
          bottom
        </button>
        <ng-template scTooltipPortal>
          <div scTooltip>
            Add to library
            <span scTooltipArrow></span>
          </div>
        </ng-template>
      </div>
      <div scTooltipProvider side="right">
        <button scButton scTooltipTrigger variant="outline" class="capitalize">
          right
        </button>
        <ng-template scTooltipPortal>
          <div scTooltip>
            Add to library
            <span scTooltipArrow></span>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SidesTooltipDemo {}
