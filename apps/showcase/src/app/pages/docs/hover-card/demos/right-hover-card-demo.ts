import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScHoverCard,
  ScHoverCardPortal,
  ScHoverCardProvider,
  ScHoverCardTrigger,
} from '@semantic-components/ui';
import { SiInfoIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-right-hover-card-demo',
  imports: [
    ScButton,
    ScHoverCardProvider,
    ScHoverCardPortal,
    ScHoverCard,
    ScHoverCardTrigger,
    SiInfoIcon,
  ],
  template: `
    <div scHoverCardProvider side="right">
      <button scButton scHoverCardTrigger variant="outline">
        <svg siInfoIcon></svg>
        More Info
      </button>
      <ng-template scHoverCardPortal>
        <div scHoverCard>
          <div class="space-y-2">
            <h4 class="text-sm font-semibold">Information</h4>
            <p class="text-muted-foreground text-sm">
              Hover cards display supplementary information when hovering over a
              trigger element. They're useful for showing previews or additional
              context.
            </p>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RightHoverCardDemo {}
