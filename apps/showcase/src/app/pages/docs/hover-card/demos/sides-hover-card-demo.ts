import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScHoverCard,
  ScHoverCardPortal,
  ScHoverCardProvider,
  ScHoverCardTrigger,
} from '@semantic-components/ui';

/** side: bottom (default), top, left, right — it flips when there is no room. */
@Component({
  selector: 'app-sides-hover-card-demo',
  imports: [
    ScButton,
    ScHoverCard,
    ScHoverCardPortal,
    ScHoverCardProvider,
    ScHoverCardTrigger,
  ],
  template: `
    <div class="flex flex-wrap justify-center gap-2">
      <div scHoverCardProvider side="left">
        <button
          scButton
          variant="outline"
          scHoverCardTrigger
          [delay]="100"
          [closeDelay]="100"
          class="capitalize"
        >
          left
        </button>
        <ng-template scHoverCardPortal>
          <div scHoverCard>
            <div class="flex flex-col gap-1">
              <h4 class="font-medium">Hover Card</h4>
              <p>This hover card appears on the left side of the trigger.</p>
            </div>
          </div>
        </ng-template>
      </div>
      <div scHoverCardProvider side="top">
        <button
          scButton
          variant="outline"
          scHoverCardTrigger
          [delay]="100"
          [closeDelay]="100"
          class="capitalize"
        >
          top
        </button>
        <ng-template scHoverCardPortal>
          <div scHoverCard>
            <div class="flex flex-col gap-1">
              <h4 class="font-medium">Hover Card</h4>
              <p>This hover card appears on the top side of the trigger.</p>
            </div>
          </div>
        </ng-template>
      </div>
      <div scHoverCardProvider side="bottom">
        <button
          scButton
          variant="outline"
          scHoverCardTrigger
          [delay]="100"
          [closeDelay]="100"
          class="capitalize"
        >
          bottom
        </button>
        <ng-template scHoverCardPortal>
          <div scHoverCard>
            <div class="flex flex-col gap-1">
              <h4 class="font-medium">Hover Card</h4>
              <p>This hover card appears on the bottom side of the trigger.</p>
            </div>
          </div>
        </ng-template>
      </div>
      <div scHoverCardProvider side="right">
        <button
          scButton
          variant="outline"
          scHoverCardTrigger
          [delay]="100"
          [closeDelay]="100"
          class="capitalize"
        >
          right
        </button>
        <ng-template scHoverCardPortal>
          <div scHoverCard>
            <div class="flex flex-col gap-1">
              <h4 class="font-medium">Hover Card</h4>
              <p>This hover card appears on the right side of the trigger.</p>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SidesHoverCardDemo {}
