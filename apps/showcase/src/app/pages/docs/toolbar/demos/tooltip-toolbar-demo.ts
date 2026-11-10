import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScToolbar,
  ScToolbarWidget,
  ScTooltip,
  ScTooltipArrow,
  ScTooltipPortal,
  ScTooltipProvider,
  ScTooltipTrigger,
} from '@semantic-components/ui';
import { SiRedoIcon, SiUndoIcon } from '@semantic-icons/lucide-icons';

/** A tooltip's trigger as a widget: its tooltip shows on focus too, as the arrows move. */
@Component({
  selector: 'app-tooltip-toolbar-demo',
  imports: [
    ScButton,
    ScToolbar,
    ScToolbarWidget,
    ScTooltip,
    ScTooltipArrow,
    ScTooltipPortal,
    ScTooltipProvider,
    ScTooltipTrigger,
    SiRedoIcon,
    SiUndoIcon,
  ],
  template: `
    <div scToolbar aria-label="History">
      <div scTooltipProvider>
        <button
          scToolbarWidget
          scButton
          scTooltipTrigger
          variant="ghost"
          size="icon-sm"
        >
          <svg siUndoIcon></svg>
          <span class="sr-only">Undo</span>
        </button>
        <ng-template scTooltipPortal>
          <div scTooltip>
            Undo
            <span scTooltipArrow></span>
          </div>
        </ng-template>
      </div>
      <div scTooltipProvider>
        <button
          scToolbarWidget
          scButton
          scTooltipTrigger
          variant="ghost"
          size="icon-sm"
        >
          <svg siRedoIcon></svg>
          <span class="sr-only">Redo</span>
        </button>
        <ng-template scTooltipPortal>
          <div scTooltip>
            Redo
            <span scTooltipArrow></span>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TooltipToolbarDemo {}
