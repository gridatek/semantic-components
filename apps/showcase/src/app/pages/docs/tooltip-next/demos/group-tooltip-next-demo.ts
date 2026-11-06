import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScTooltipNext,
  ScTooltipNextArrow,
  ScTooltipNextGroup,
  ScTooltipNextPortal,
  ScTooltipNextProvider,
  ScTooltipNextTrigger,
} from '@semantic-components/ui';
import {
  SiBoldIcon,
  SiItalicIcon,
  SiUnderlineIcon,
} from '@semantic-icons/lucide-icons';

/** A toolbar in a scTooltipNextGroup: once a tooltip has shown, its neighbours open at once. */
@Component({
  selector: 'app-group-tooltip-next-demo',
  imports: [
    ScButton,
    ScTooltipNext,
    ScTooltipNextArrow,
    ScTooltipNextGroup,
    ScTooltipNextPortal,
    ScTooltipNextProvider,
    ScTooltipNextTrigger,
    SiBoldIcon,
    SiItalicIcon,
    SiUnderlineIcon,
  ],
  template: `
    <div
      scTooltipNextGroup
      role="toolbar"
      aria-label="Formatting"
      class="flex gap-1"
    >
      <div scTooltipNextProvider>
        <button scButton scTooltipNextTrigger variant="ghost" size="icon">
          <svg siBoldIcon></svg>
          <span class="sr-only">Bold</span>
        </button>
        <ng-template scTooltipNextPortal>
          <div scTooltipNext>
            Bold
            <span scTooltipNextArrow></span>
          </div>
        </ng-template>
      </div>
      <div scTooltipNextProvider>
        <button scButton scTooltipNextTrigger variant="ghost" size="icon">
          <svg siItalicIcon></svg>
          <span class="sr-only">Italic</span>
        </button>
        <ng-template scTooltipNextPortal>
          <div scTooltipNext>
            Italic
            <span scTooltipNextArrow></span>
          </div>
        </ng-template>
      </div>
      <div scTooltipNextProvider>
        <button scButton scTooltipNextTrigger variant="ghost" size="icon">
          <svg siUnderlineIcon></svg>
          <span class="sr-only">Underline</span>
        </button>
        <ng-template scTooltipNextPortal>
          <div scTooltipNext>
            Underline
            <span scTooltipNextArrow></span>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupTooltipNextDemo {}
