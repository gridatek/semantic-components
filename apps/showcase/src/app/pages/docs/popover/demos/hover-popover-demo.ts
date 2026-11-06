import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScPopover,
  ScPopoverDescription,
  ScPopoverHeader,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTitle,
  ScPopoverTrigger,
} from '@semantic-components/ui';
import { SiInfoIcon } from '@semantic-icons/lucide-icons';

/** openOnHover: an infotip — the pointer’s hover opens it after delay, a click still does (touch, the keyboard). Unlike a tooltip, everyone can reach it. */
@Component({
  selector: 'app-hover-popover-demo',
  imports: [
    ScButton,
    ScPopover,
    ScPopoverDescription,
    ScPopoverHeader,
    ScPopoverPortal,
    ScPopoverProvider,
    ScPopoverTitle,
    ScPopoverTrigger,
    SiInfoIcon,
  ],
  template: `
    <div class="flex items-center gap-1 text-sm">
      Storage used: 12.4 GB
      <div scPopoverProvider side="top">
        <button
          scButton
          scPopoverTrigger
          variant="ghost"
          size="icon-xs"
          openOnHover
        >
          <svg siInfoIcon></svg>
          <span class="sr-only">About storage</span>
        </button>
        <ng-template scPopoverPortal>
          <div scPopover class="w-64">
            <div scPopoverHeader>
              <h2 scPopoverTitle>Storage</h2>
              <p scPopoverDescription>
                Files, photos and backups count; shared files count for their
                owner.
              </p>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HoverPopoverDemo {}
