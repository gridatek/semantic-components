import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScHoverCard,
  ScHoverCardPortal,
  ScHoverCardProvider,
  ScHoverCardTrigger,
} from '@semantic-components/ui';

/** side: inline-start, inline-end — the reading start and end, which swap in right to left. */
@Component({
  selector: 'app-logical-sides-hover-card-demo',
  imports: [
    ScButton,
    ScHoverCard,
    ScHoverCardPortal,
    ScHoverCardProvider,
    ScHoverCardTrigger,
  ],
  template: `
    <div class="flex flex-wrap justify-center gap-2">
      <div scHoverCardProvider side="inline-start">
        <button
          scButton
          variant="outline"
          scHoverCardTrigger
          [delay]="100"
          [closeDelay]="100"
        >
          inline-start
        </button>
        <ng-template scHoverCardPortal>
          <div scHoverCard>
            <div class="flex flex-col gap-1">
              <h4 class="font-medium">Hover Card</h4>
              <p>
                This hover card appears on the inline-start side of the trigger.
              </p>
            </div>
          </div>
        </ng-template>
      </div>
      <div scHoverCardProvider side="inline-end">
        <button
          scButton
          variant="outline"
          scHoverCardTrigger
          [delay]="100"
          [closeDelay]="100"
        >
          inline-end
        </button>
        <ng-template scHoverCardPortal>
          <div scHoverCard>
            <div class="flex flex-col gap-1">
              <h4 class="font-medium">Hover Card</h4>
              <p>
                This hover card appears on the inline-end side of the trigger.
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
export class LogicalSidesHoverCardDemo {}
