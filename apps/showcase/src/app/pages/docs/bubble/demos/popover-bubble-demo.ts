import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBubble,
  ScBubbleContent,
  ScBubbleReactions,
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

/** A reaction button opening a popover: the full error of a failed command. */
@Component({
  selector: 'app-popover-bubble-demo',
  imports: [
    ScBubble,
    ScBubbleContent,
    ScBubbleReactions,
    ScButton,
    ScPopoverProvider,
    ScPopoverTrigger,
    ScPopoverPortal,
    ScPopover,
    ScPopoverHeader,
    ScPopoverTitle,
    ScPopoverDescription,
    SiInfoIcon,
  ],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-8 py-6">
      <div scBubble align="end">
        <div scBubbleContent>Run the build script.</div>
      </div>
      <div scBubble variant="destructive">
        <div scBubbleContent>Failed to run the command.</div>
        <div scBubbleReactions>
          <div scPopoverProvider>
            <button scButton scPopoverTrigger variant="ghost" size="icon-xs">
              <svg siInfoIcon></svg>
              <span class="sr-only">Show error details</span>
            </button>
            <ng-template scPopoverPortal>
              <div scPopover>
                <div scPopoverHeader>
                  <h4 scPopoverTitle>Command failed with exit code 1</h4>
                  <p scPopoverDescription>
                    ENOENT: no such file or directory, open pnpm-lock.yaml
                  </p>
                </div>
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
export class PopoverBubbleDemo {}
