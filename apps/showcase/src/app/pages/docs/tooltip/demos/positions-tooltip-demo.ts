import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton, ScTooltipTrigger } from '@semantic-components/ui';

@Component({
  selector: 'app-positions-tooltip-demo',
  imports: [ScButton, ScTooltipTrigger],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <button
        scButton
        variant="outline"
        scTooltipTrigger="Tooltip on top"
        tooltipPosition="top"
      >
        Top
      </button>
      <button
        scButton
        variant="outline"
        scTooltipTrigger="Tooltip on right"
        tooltipPosition="right"
      >
        Right
      </button>
      <button
        scButton
        variant="outline"
        scTooltipTrigger="Tooltip on bottom"
        tooltipPosition="bottom"
      >
        Bottom
      </button>
      <button
        scButton
        variant="outline"
        scTooltipTrigger="Tooltip on left"
        tooltipPosition="left"
      >
        Left
      </button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionsTooltipDemo {}
