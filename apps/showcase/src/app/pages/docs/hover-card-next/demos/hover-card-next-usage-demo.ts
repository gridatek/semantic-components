import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScHoverCardNext,
  ScHoverCardNextPortal,
  ScHoverCardNextProvider,
  ScHoverCardNextTrigger,
  ScLink,
} from '@semantic-components/ui';

@Component({
  selector: 'app-hover-card-next-usage-demo',
  imports: [
    ScHoverCardNext,
    ScHoverCardNextPortal,
    ScHoverCardNextProvider,
    ScHoverCardNextTrigger,
    ScLink,
  ],
  template: `
    <div scHoverCardNextProvider>
      <a
        scLink
        variant="link"
        href="https://nextjs.org"
        scHoverCardNextTrigger
        [delay]="10"
        [closeDelay]="100"
      >
        Hover Here
      </a>
      <ng-template scHoverCardNextPortal>
        <div scHoverCardNext class="flex w-64 flex-col gap-0.5">
          <div class="font-semibold">@nextjs</div>
          <div>The React Framework – created and maintained by @vercel.</div>
          <div class="text-muted-foreground mt-1 text-xs">
            Joined December 2021
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HoverCardNextUsageDemo {}
