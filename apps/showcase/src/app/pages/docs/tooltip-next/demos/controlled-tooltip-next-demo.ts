import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScTooltipNext,
  ScTooltipNextArrow,
  ScTooltipNextPortal,
  ScTooltipNextProvider,
  ScTooltipNextTrigger,
} from '@semantic-components/ui';

/** [(open)]: the tooltip opened and closed by the page too. */
@Component({
  selector: 'app-controlled-tooltip-next-demo',
  imports: [
    ScButton,
    ScTooltipNext,
    ScTooltipNextArrow,
    ScTooltipNextPortal,
    ScTooltipNextProvider,
    ScTooltipNextTrigger,
  ],
  template: `
    <div class="flex items-center gap-4">
      <div scTooltipNextProvider [(open)]="open">
        <button scButton scTooltipNextTrigger variant="outline">Trigger</button>
        <ng-template scTooltipNextPortal>
          <div scTooltipNext>
            Opened from outside
            <span scTooltipNextArrow></span>
          </div>
        </ng-template>
      </div>
      <button scButton variant="ghost" (click)="open.set(!open())">
        {{ open() ? 'Hide' : 'Show' }} the tooltip
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledTooltipNextDemo {
  protected readonly open = signal(false);
}
