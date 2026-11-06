import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScPopoverNext,
  ScPopoverNextPortal,
  ScPopoverNextProvider,
  ScPopoverNextTrigger,
} from '@semantic-components/ui';

/** side: bottom (default), top, left, right — or inline-start, inline-end, which follow the direction. It flips when there is no room. */
@Component({
  selector: 'app-sides-popover-next-demo',
  imports: [
    ScButton,
    ScPopoverNext,
    ScPopoverNextPortal,
    ScPopoverNextProvider,
    ScPopoverNextTrigger,
  ],
  template: `
    <div class="flex flex-wrap gap-2">
      <div scPopoverNextProvider side="top">
        <button
          scButton
          scPopoverNextTrigger
          variant="outline"
          class="capitalize"
        >
          top
        </button>
        <ng-template scPopoverNextPortal>
          <div scPopoverNext class="w-40">On the top</div>
        </ng-template>
      </div>
      <div scPopoverNextProvider side="bottom">
        <button
          scButton
          scPopoverNextTrigger
          variant="outline"
          class="capitalize"
        >
          bottom
        </button>
        <ng-template scPopoverNextPortal>
          <div scPopoverNext class="w-40">On the bottom</div>
        </ng-template>
      </div>
      <div scPopoverNextProvider side="left">
        <button
          scButton
          scPopoverNextTrigger
          variant="outline"
          class="capitalize"
        >
          left
        </button>
        <ng-template scPopoverNextPortal>
          <div scPopoverNext class="w-40">On the left</div>
        </ng-template>
      </div>
      <div scPopoverNextProvider side="right">
        <button
          scButton
          scPopoverNextTrigger
          variant="outline"
          class="capitalize"
        >
          right
        </button>
        <ng-template scPopoverNextPortal>
          <div scPopoverNext class="w-40">On the right</div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SidesPopoverNextDemo {}
