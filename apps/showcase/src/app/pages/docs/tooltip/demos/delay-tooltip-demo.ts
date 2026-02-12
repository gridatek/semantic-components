import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScTooltipTrigger } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-delay-tooltip-demo',
  imports: [ScTooltipTrigger],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <button
        scTooltipTrigger="Instant tooltip (no delay)"
        [tooltipDelay]="0"
        class="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        No delay
      </button>
      <button
        scTooltipTrigger="Default delay (200ms)"
        class="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Default (200ms)
      </button>
      <button
        scTooltipTrigger="Slow tooltip (500ms)"
        [tooltipDelay]="500"
        class="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Slow (500ms)
      </button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DelayTooltipDemo {}
