import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScKbd,
  ScTooltip,
  ScTooltipArrow,
  ScTooltipPortal,
  ScTooltipProvider,
  ScTooltipTrigger,
} from '@semantic-components/ui';
import { SiSaveIcon } from '@semantic-icons/lucide-icons';

/** Content is yours, a kbd too; the button says its shortcut to screen readers with aria-keyshortcuts. */
@Component({
  selector: 'app-keyboard-tooltip-demo',
  imports: [
    ScButton,
    ScKbd,
    ScTooltip,
    ScTooltipArrow,
    ScTooltipPortal,
    ScTooltipProvider,
    ScTooltipTrigger,
    SiSaveIcon,
  ],
  template: `
    <div scTooltipProvider>
      <button
        scButton
        scTooltipTrigger
        variant="outline"
        size="icon"
        aria-keyshortcuts="S"
      >
        <svg siSaveIcon></svg>
        <span class="sr-only">Save</span>
      </button>
      <ng-template scTooltipPortal>
        <div scTooltip>
          Save Changes <kbd scKbd>S</kbd>
          <span scTooltipArrow></span>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class KeyboardTooltipDemo {}
