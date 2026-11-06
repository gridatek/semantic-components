import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScKbd,
  ScTooltipNext,
  ScTooltipNextArrow,
  ScTooltipNextPortal,
  ScTooltipNextProvider,
  ScTooltipNextTrigger,
} from '@semantic-components/ui';
import { SiSaveIcon } from '@semantic-icons/lucide-icons';

/** Content is yours, a kbd too; the button says its shortcut to screen readers with aria-keyshortcuts. */
@Component({
  selector: 'app-keyboard-tooltip-next-demo',
  imports: [
    ScButton,
    ScKbd,
    ScTooltipNext,
    ScTooltipNextArrow,
    ScTooltipNextPortal,
    ScTooltipNextProvider,
    ScTooltipNextTrigger,
    SiSaveIcon,
  ],
  template: `
    <div scTooltipNextProvider>
      <button
        scButton
        scTooltipNextTrigger
        variant="outline"
        size="icon"
        aria-keyshortcuts="S"
      >
        <svg siSaveIcon></svg>
        <span class="sr-only">Save</span>
      </button>
      <ng-template scTooltipNextPortal>
        <div scTooltipNext>
          Save Changes <kbd scKbd>S</kbd>
          <span scTooltipNextArrow></span>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class KeyboardTooltipNextDemo {}
