import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton, ScTooltipTrigger } from '@semantic-components/ui';

@Component({
  selector: 'app-delay-tooltip-demo',
  imports: [ScButton, ScTooltipTrigger],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <button
        sc-button
        variant="outline"
        scTooltipTrigger="Instant tooltip (no delay)"
        [tooltipDelay]="0"
      >
        No delay
      </button>
      <button
        sc-button
        variant="outline"
        scTooltipTrigger="Default delay (200ms)"
      >
        Default (200ms)
      </button>
      <button
        sc-button
        variant="outline"
        scTooltipTrigger="Slow tooltip (500ms)"
        [tooltipDelay]="500"
      >
        Slow (500ms)
      </button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DelayTooltipDemo {}
