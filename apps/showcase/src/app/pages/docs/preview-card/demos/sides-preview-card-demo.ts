import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScPreviewCard,
  ScPreviewCardPortal,
  ScPreviewCardProvider,
  ScPreviewCardTrigger,
} from '@semantic-components/ui';

/** side: bottom (default), top, left, right — it flips when there is no room. */
@Component({
  selector: 'app-sides-preview-card-demo',
  imports: [
    ScButton,
    ScPreviewCard,
    ScPreviewCardPortal,
    ScPreviewCardProvider,
    ScPreviewCardTrigger,
  ],
  template: `
    <div class="flex flex-wrap justify-center gap-2">
      <div scPreviewCardProvider side="left">
        <button
          scButton
          variant="outline"
          scPreviewCardTrigger
          [delay]="100"
          [closeDelay]="100"
          class="capitalize"
        >
          left
        </button>
        <ng-template scPreviewCardPortal>
          <div scPreviewCard>
            <div class="flex flex-col gap-1">
              <h4 class="font-medium">Preview Card</h4>
              <p>This preview card appears on the left side of the trigger.</p>
            </div>
          </div>
        </ng-template>
      </div>
      <div scPreviewCardProvider side="top">
        <button
          scButton
          variant="outline"
          scPreviewCardTrigger
          [delay]="100"
          [closeDelay]="100"
          class="capitalize"
        >
          top
        </button>
        <ng-template scPreviewCardPortal>
          <div scPreviewCard>
            <div class="flex flex-col gap-1">
              <h4 class="font-medium">Preview Card</h4>
              <p>This preview card appears on the top side of the trigger.</p>
            </div>
          </div>
        </ng-template>
      </div>
      <div scPreviewCardProvider side="bottom">
        <button
          scButton
          variant="outline"
          scPreviewCardTrigger
          [delay]="100"
          [closeDelay]="100"
          class="capitalize"
        >
          bottom
        </button>
        <ng-template scPreviewCardPortal>
          <div scPreviewCard>
            <div class="flex flex-col gap-1">
              <h4 class="font-medium">Preview Card</h4>
              <p>
                This preview card appears on the bottom side of the trigger.
              </p>
            </div>
          </div>
        </ng-template>
      </div>
      <div scPreviewCardProvider side="right">
        <button
          scButton
          variant="outline"
          scPreviewCardTrigger
          [delay]="100"
          [closeDelay]="100"
          class="capitalize"
        >
          right
        </button>
        <ng-template scPreviewCardPortal>
          <div scPreviewCard>
            <div class="flex flex-col gap-1">
              <h4 class="font-medium">Preview Card</h4>
              <p>This preview card appears on the right side of the trigger.</p>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SidesPreviewCardDemo {}
