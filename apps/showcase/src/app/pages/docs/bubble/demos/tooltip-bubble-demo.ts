import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBubble,
  ScBubbleContent,
  ScBubbleReactions,
  ScButton,
  ScTooltip,
  ScTooltipArrow,
  ScTooltipPortal,
  ScTooltipProvider,
  ScTooltipTrigger,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** A reaction button with a tooltip, for the message’s metadata (when it was read). */
@Component({
  selector: 'app-tooltip-bubble-demo',
  imports: [
    ScBubble,
    ScBubbleContent,
    ScBubbleReactions,
    ScButton,
    ScTooltipProvider,
    ScTooltipTrigger,
    ScTooltipPortal,
    ScTooltip,
    ScTooltipArrow,
    SiCheckIcon,
  ],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-8 py-6">
      <div scBubble variant="secondary">
        <div scBubbleContent>Did you remove the stale route?</div>
      </div>
      <div scBubble align="end">
        <div scBubbleContent>Yes, removed it from the registry.</div>
        <div scBubbleReactions>
          <div scTooltipProvider>
            <button scButton variant="ghost" size="icon-xs" scTooltipTrigger>
              <svg siCheckIcon></svg>
              <span class="sr-only">Read</span>
            </button>
            <ng-template scTooltipPortal>
              <div scTooltip>
                Read on Jan 5, 2026 at 4:32 PM<span scTooltipArrow></span>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TooltipBubbleDemo {}
